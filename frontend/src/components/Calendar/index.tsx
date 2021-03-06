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
} from './styles';
import { weekDays } from '../../utils/constants';

interface ICell {
  day: number;
  fullDate: Date;
  isToday: boolean;
  isWeekend: boolean;
  isWithinCurrentMonth: boolean;
}

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthDays, setMonthDays] = useState<ICell[]>([]);

  const createCalendarRows = useCallback(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: ICell[] = [];
    let currentDay = startDate;

    while (currentDay <= endDate) {
      const formattedDay = format(currentDay, 'ddMMyyyy');

      const dateObj: ICell = {
        fullDate: currentDay,
        day: currentDay.getDate(),
        isWeekend: isWeekend(currentDay),
        isToday: formattedDay === format(new Date(), 'ddMMyyyy'),
        isWithinCurrentMonth: isWithinInterval(currentDay, {
          start: monthStart,
          end: monthEnd,
        }),
      };

      days.push(dateObj);

      currentDay = addDays(currentDay, 1);
    }

    return days;
  }, [currentMonth]);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(addMonths(currentMonth, 1));
  }, [currentMonth]);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(subMonths(currentMonth, 1));
  }, [currentMonth]);

  useEffect(() => {
    const rows = createCalendarRows();

    setMonthDays(rows);
  }, [createCalendarRows]);

  return (
    <Container>
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
        {monthDays.map(
          ({ day, fullDate, isToday, isWeekend, isWithinCurrentMonth }) => (
            <CalendarCell
              key={format(fullDate, 'ddMMyyyy')}
              isToday={isToday}
              day={day}
              isWeekend={isWeekend}
              isWithinCurrentMonth={isWithinCurrentMonth}
            >
              <time>{day}</time>
            </CalendarCell>
          ),
        )}
      </CalendarGrid>
    </Container>
  );
};

export default Calendar;
