import { shade } from 'polished';
import styled, { css } from 'styled-components';
import {
  $black,
  $blue,
  $darkBlue,
  $lightestGray,
  $lightGray,
  $medBlue,
  $white,
  $whiteCultured,
} from '../../styles/colors';

interface ICellProps {
  day: number;
  isToday: boolean;
  isWeekend: boolean;
  isWithinCurrentMonth: boolean;
}

interface IDayProps {
  isToday: boolean;
}

interface IReminderProps {
  color: string;
}

export const Container = styled.div`
  border: 1px solid;
  min-width: 850px;
  width: 100%;
`;

export const CalendarHeader = styled.div`
  border-bottom: 1px solid;
  display: flex;
  height: 80px;
  justify-content: center;
`;

export const MonthSelectorLeft = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: flex-end;
`;

export const CurrentMonth = styled.time`
  align-items: center;
  display: flex;
  font-size: 24px;
  font-weight: 500;
  justify-content: center;
  margin: 0 120px;
  width: 200px;
`;

export const MonthSelectorRight = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: flex-start;
`;

export const WeekDays = styled.div`
  align-items: center;
  border-bottom: 1px solid;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  width: 100%;
  background: ${$darkBlue};
  color: ${$whiteCultured};
  border: transparent;
`;

export const WeekDay = styled.div`
  border-right: 1px solid ${$black};
  flex-basis: 0;
  flex-grow: 1;
  justify-content: center;
  max-width: 100%;
  padding: 5px;
  text-align: center;

  &:last-child {
    border-right: none;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  &:last-child {
    border-right: none;
  }
`;

export const CalendarCell = styled.div<ICellProps>`
  border: 1px solid #716f6c;
  cursor: pointer;
  background: ${$white};
  outline: none;
  display: flex;
  height: 8em;
  flex-direction: column;

  time {
    margin: 10px 0 10px 10px;
  }

  ${props =>
    props.isWeekend &&
    css`
      background-color: ${$lightestGray};
    `}

  ${props =>
    !props.isWithinCurrentMonth &&
    css`
      color: ${$lightGray};
    `}

  &:last-child {
    border-right: none;
  }

  &:hover {
    border: 2px solid ${$blue};
  }
`;

export const Day = styled.div<IDayProps>`
  height: 60px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  max-height: 60px;
  min-width: 60px;

  ${props =>
    props.isToday &&
    css`
      time {
        align-items: center;
        background-color: ${$medBlue};
        border-radius: 50%;
        color: #ffffff;
        display: flex;
        height: 25px;
        justify-content: center;
        width: 25px;
      }
    `}
`;
export const DeleteAllReminders = styled.button`
  margin-right: 10px;
  border: none;
  background: transparent;
  color: #999;
  opacity: 0;
  transition: opacity 0.5s;

  &:hover {
    opacity: 1;
  }
`;

export const RemindersList = styled.ul`
  height: 100px;
  overflow: scroll;
`;

export const ReminderItem = styled.li`
  padding: 0 3px;
`;

export const Reminder = styled.button<IReminderProps>`
  align-items: center;
  border-radius: 5px;
  border: none;
  display: flex;
  height: 20px;
  justify-content: space-between;
  margin-bottom: 2px;
  overflow: hidden;
  padding: 0 10px;
  width: 100%;

  time {
    margin: 0px;
  }

  ${props => css`
    background-color: ${props.color};
  `}

  &:hover {
    ${props => css`
      background-color: ${shade(0.1, props.color)};
    `}
  }
`;
