import React, { useCallback, useEffect, useState } from 'react';
import { Dialog } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { closestTo, isEqual, isSameDay } from 'date-fns';
import {
  ActionSection,
  ColorInput,
  DialogButton,
  ErrorMessage,
  InputElement,
  LocationInput,
  ReminderDialogContent,
  ReminderDialogDetails,
  ReminderDialogHeader,
  ReminderTitle,
  Temperature,
  TemperatureContainer,
  TemperatureDetails,
  Weather,
  WeatherForecastArea,
  WeatherForecastTitle,
} from './styles';
import { useStorage } from '../../hooks/storage';
import weatherApi from '../../services/weatherApiClient';
import useDebounce from '../../hooks/debounce';
import { WEATHER_API_KEY } from '../../utils/constants';

interface IReminder {
  city: string;
  fullDate: Date;
  date: string;
  title: string;
  id: string;
  time: string;
  color: string;
}

interface IReminderDialogProps {
  open: boolean;
  selectedReminder: IReminder;
  onClose: () => void;
}

interface IForecast {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface IWeather {
  city: {
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: IForecast[];
}

const ReminderDialog: React.FC<IReminderDialogProps> = ({
  open,
  onClose,
  selectedReminder,
}) => {
  const schema = Yup.object().shape({
    title: Yup.string().max(
      30,
      'The maximum length for this field is 30 characters.',
    ),
  });
  const { register, handleSubmit, errors } = useForm<IReminder>({
    resolver: yupResolver(schema),
  });
  const { setItem } = useStorage();
  const [weather, setWeather] = useState<IForecast>();
  const [dateInput, setDateInput] = useState<string>(selectedReminder.date);
  const [timeInput, setTimeInput] = useState<string>(selectedReminder.time);
  const [cityInput, setCityInput] = useState<string>(selectedReminder.city);

  const debouncedDateInput = useDebounce(dateInput);
  const debouncedTimeInput = useDebounce(timeInput);
  const debouncedCityInput = useDebounce(cityInput);

  const onSubmitNewReminder = useCallback(
    ({
      title,
      city,
      fullDate,
      time,
      date,
      color,
      id = selectedReminder.id,
    }: IReminder) => {
      const [year, month, day] = date.split('-');
      const formattedDate = `${day}${month}${year}`;

      const newReminder: IReminder = {
        title: title || 'New event',
        city,
        fullDate,
        color,
        time,
        date,
        id: id || uuid(),
      };
      setItem(formattedDate, newReminder);
      onClose();
    },
    [onClose, selectedReminder.id, setItem],
  );

  const findForecastWeather = useCallback(
    (data: IWeather): void => {
      const formattedDateTime = new Date(
        `${debouncedDateInput} ${debouncedTimeInput}`,
      );
      const closestDate = closestTo(
        formattedDateTime,
        data.list.map(m => new Date(m.dt_txt)),
      );

      if (isSameDay(closestDate, formattedDateTime)) {
        const [forecast] = data.list.filter(f =>
          isEqual(new Date(f.dt_txt), closestDate),
        );

        setWeather(forecast);
      }
    },
    [debouncedDateInput, debouncedTimeInput],
  );

  useEffect(() => {
    if (debouncedCityInput && debouncedDateInput && debouncedTimeInput) {
      weatherApi
        .get<IWeather>(
          `/forecast?q=${debouncedCityInput}&units=metric&APPID=${WEATHER_API_KEY}`,
        )
        .then(res => {
          findForecastWeather(res.data);
        })
        .catch(err => setWeather(undefined));
    } else {
      setWeather(undefined);
    }
  }, [
    debouncedCityInput,
    debouncedDateInput,
    debouncedTimeInput,
    findForecastWeather,
  ]);

  return (
    <Dialog onClose={onClose} aria-labelledby="reminder-dialog" open={open}>
      <ReminderDialogContent>
        <form onSubmit={handleSubmit(onSubmitNewReminder)}>
          <ReminderDialogHeader>
            <ReminderTitle>
              <InputElement
                name="title"
                placeholder="New Event"
                defaultValue={selectedReminder.title}
                ref={register}
              />
              <ErrorMessage>{errors.title?.message}</ErrorMessage>
            </ReminderTitle>
            <ColorInput
              name="color"
              type="color"
              defaultValue={selectedReminder.color}
              ref={register}
            />
          </ReminderDialogHeader>
          <ReminderDialogDetails>
            <InputElement
              type="date"
              name="date"
              placeholder=""
              defaultValue={dateInput}
              onChange={e => setDateInput(e.target.value)}
              ref={register}
            />
            <InputElement
              type="time"
              name="time"
              defaultValue={timeInput}
              onChange={e => setTimeInput(e.target.value)}
              ref={register}
            />
            <LocationInput>
              <FiMapPin size={30} />
              <InputElement
                name="city"
                placeholder="Eg. New York City"
                defaultValue={cityInput}
                onChange={e => setCityInput(e.target.value)}
                ref={register}
              />
            </LocationInput>
          </ReminderDialogDetails>
          {weather && (
            <WeatherForecastArea>
              <WeatherForecastTitle>
                Weather Forecast for the day
              </WeatherForecastTitle>
              <Weather>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="sunny"
                />
                <TemperatureContainer>
                  <Temperature>{weather.main.temp}˚C</Temperature>
                  <TemperatureDetails>
                    {weather.weather[0].description}
                  </TemperatureDetails>
                </TemperatureContainer>
              </Weather>
            </WeatherForecastArea>
          )}
          <ActionSection>
            <DialogButton type="submit" isSave>
              Save
            </DialogButton>
          </ActionSection>
        </form>
      </ReminderDialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
