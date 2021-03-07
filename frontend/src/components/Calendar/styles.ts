import styled, { css } from 'styled-components';
import {
  $black,
  $blue,
  $darkBlue,
  $lightestGray,
  $lightGray,
  $medBlue,
  $white,
} from '../../styles/colors';

interface ICellProps {
  day: number;
  isToday: boolean;
  isWeekend: boolean;
  isWithinCurrentMonth: boolean;
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
  color: ${$white};
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
  border: 1px solid ${$black};
  cursor: pointer;
  background: #ffffff;
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

  &:last-child {
    border-right: none;
  }

  &:hover {
    border: 2px solid ${$blue};
  }
`;

export const ReminderItem = styled.button<IReminderProps>`
  display: flex;
  width: 100%;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
  border: none;

  ${props => css`
    background-color: ${props.color};
  `}
`;
