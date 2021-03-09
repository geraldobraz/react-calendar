import { shade } from 'polished';
import styled, { css } from 'styled-components';
import {
  $blue,
  $darkBlue,
  $lightGray,
  $darkGray,
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
  margin-bottom: 50px;
  min-width: 850px;
  width: 100%;
`;

export const CalendarHeader = styled.div`
  display: flex;
  height: 80px;
  justify-content: center;
  border-radius: 10px 10px 0 0;
  box-shadow: 0 -5px 10px -5px #333;
  background-color: ${$darkBlue};
  color: ${$white};

  svg {
    color: ${$white};
  }
`;

export const MonthSelectorLeft = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: flex-end;

  svg:hover {
    color: ${shade(0.2, $white)};
  }
`;

export const CurrentMonth = styled.time`
  align-items: center;
  display: flex;
  font-size: 24px;
  font-weight: 500;
  justify-content: center;
  margin: 0 50px;
  width: 200px;
`;

export const MonthSelectorRight = styled.button`
  align-items: center;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: flex-start;

  svg:hover {
    color: ${shade(0.2, $white)};
  }
`;

export const WeekDays = styled.div`
  align-items: center;
  background: ${$darkBlue};
  opacity: 0.8;
  border: transparent;
  color: ${$whiteCultured};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 20px;
  font-weight: 500;
  height: 40px;
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const WeekDay = styled.div`
  color: ${$white};
  flex-basis: 0;
  flex-grow: 1;
  justify-content: center;
  max-width: 100%;
  padding: 5px;
  text-align: center;
`;

export const CalendarGrid = styled.div`
  border-right: 0.5px solid #716f6c;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  box-shadow: 11px 10px 5px 0 rgb(0 0 0 / 10%);
`;

export const CalendarCell = styled.div<ICellProps>`
  background: ${$white};
  border-bottom: 0.5px solid #716f6c;
  border-left: 0.5px solid #716f6c;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 8em;
  outline: none;
  overflow: hidden;

  time {
    margin: 10px 0 10px 10px;
  }

  ${props =>
    props.isWeekend &&
    css`
      background-color: ${$lightGray};
    `}

  ${props =>
    !props.isWithinCurrentMonth &&
    css`
      color: ${$darkGray};
    `}

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
        color: ${$white};
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
  color: ${$darkGray};
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

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

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
