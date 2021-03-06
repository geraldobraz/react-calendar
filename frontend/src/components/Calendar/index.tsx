import React, { useCallback, useEffect, useState } from 'react';
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isWeekend,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  CalendarCell,
  CalendarGrid,
  Container,
  CurrentMonth,
  WeekDay,
  CalendarHeader,
  MonthSelectorLeft,
  MonthSelectorRight,
  WeekDays,
  ReminderItem,
} from './styles';
import { weekDays } from '../../utils/constants';
import ReminderDialog from '../ReminderDialog';
import { useStorage } from '../../hooks/storage';

interface ICell {
  day: number;
  fullDate: Date;
  isToday: boolean;
  isWeekend: boolean;
  isWithinCurrentMonth: boolean;
  reminders?: IReminder[];
}

interface IReminder {
  city: string;
  color: string;
  date: string;
  fullDate: Date;
  id: string;
  time: string;
  title: string;
}

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthDays, setMonthDays] = useState<ICell[]>([]);
  const [isReminderDialogOpened, setIsReminderDialogOpened] = useState<boolean>(
    false,
  );
  const [selectedReminder, setSelectedReminder] = useState<IReminder>({
    fullDate: new Date(),
  } as IReminder);
  const { getStorageByKey } = useStorage();

  const handleCreateNewReminder = useCallback((cell: ICell): void => {
    const defaultNewReminder: IReminder = {
      fullDate: cell.fullDate,
      city: '',
      color: '#c8e9a0',
      title: '',
      time: format(cell.fullDate, 'HH:mm'),
      date: format(cell.fullDate, 'yyyy-MM-dd'),
      id: '',
    };

    setSelectedReminder(defaultNewReminder);
    setIsReminderDialogOpened(true);
  }, []);

  const handleReminderDialogClose = useCallback((): void => {
    setIsReminderDialogOpened(false);
  }, []);

  const createCalendarRows = useCallback(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: ICell[] = [];
    let currentDay = startDate;

    while (currentDay <= endDate) {
      const formattedDay = format(currentDay, 'ddMMyyyy');
      const remindersAtDay = getStorageByKey(formattedDay);

      const dateObj: ICell = {
        fullDate: currentDay,
        day: currentDay.getDate(),
        isWeekend: isWeekend(currentDay),
        isToday: formattedDay === format(new Date(), 'ddMMyyyy'),
        isWithinCurrentMonth: isWithinInterval(currentDay, {
          start: monthStart,
          end: monthEnd,
        }),
        reminders: remindersAtDay,
      };

      days.push(dateObj);

      currentDay = addDays(currentDay, 1);
    }

    return days;
  }, [currentMonth, getStorageByKey]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);

  const onReminderClick = useCallback((e: any, reminder: IReminder) => {
    e.stopPropagation();

    setSelectedReminder(reminder);
    setIsReminderDialogOpened(true);
  }, []);

  useEffect(() => {
    const rows = createCalendarRows();

    setMonthDays(rows);
  }, [createCalendarRows]);

  return (
    <Container>
      <ReminderDialog
        open={isReminderDialogOpened}
        onClose={handleReminderDialogClose}
        selectedReminder={selectedReminder}
      />
      <CalendarHeader>
        <MonthSelectorLeft onClick={handlePrevMonth}>
          <FiChevronLeft size={30} />
        </MonthSelectorLeft>
        <CurrentMonth>{format(currentMonth, 'MMMM yyyy')}</CurrentMonth>
        <MonthSelectorRight onClick={handleNextMonth}>
          <FiChevronRight size={30} />
        </MonthSelectorRight>
      </CalendarHeader>

      <WeekDays>
        {weekDays.map(day => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>

      <CalendarGrid>
        {monthDays.map(day => (
          <CalendarCell
            key={format(day.fullDate, 'ddMMyyyy')}
            isToday={day.isToday}
            day={day.day}
            isWeekend={day.isWeekend}
            isWithinCurrentMonth={day.isWithinCurrentMonth}
            onClick={() => handleCreateNewReminder(day)}
          >
            <time>{day.day}</time>

            {day?.reminders &&
              day.reminders.map(reminder => (
                <ReminderItem
                  color={reminder.color}
                  key={reminder.id}
                  onClick={e => onReminderClick(e, reminder)}
                >
                  {reminder.title} - {reminder.time}
                </ReminderItem>
              ))}
          </CalendarCell>
        ))}
      </CalendarGrid>
    </Container>
  );
};

export default Calendar;
