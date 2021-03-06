import React, { useCallback } from 'react';
import { Dialog } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { v4 as uuid } from 'uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
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
} from './styles';
import { useStorage } from '../../hooks/storage';

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
              defaultValue={selectedReminder.date}
              ref={register}
            />
            <InputElement
              type="time"
              name="time"
              defaultValue={selectedReminder.time}
              ref={register}
            />
            <LocationInput>
              <FiMapPin size={30} />
              <InputElement
                name="city"
                placeholder="Eg. New York City"
                defaultValue={selectedReminder.city}
                ref={register}
              />
            </LocationInput>
          </ReminderDialogDetails>

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
