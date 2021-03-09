import { DialogContent, Dialog as MaterialDialog } from '@material-ui/core';
import { shade } from 'polished';
import styled from 'styled-components';
import { $black, $gray, $red, $white, $primaryBlue } from '../../styles/colors';

export const Dialog = styled(MaterialDialog)`
  div.MuiPaper-root {
    background-color: ${$gray};
    color: ${$black};
    border-radius: 10px;
  }
`;

export const ReminderDialogContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  height: 470px;
  width: 457px;
`;

export const CloseDialogButton = styled.button`
  background-color: transparent;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const DeleteReminderButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0 20px;

  svg {
    opacity: 0.7;
  }

  &:hover {
    opacity: 0.6;
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

export const ReminderDialogHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`;

export const ReminderTitle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 83%;

  input {
    margin: 0;
  }
`;

export const ErrorMessage = styled.p`
  border-top: 1px solid;
  color: ${$red};
  font-size: 15px;
  transition: border-top 0.5s;
  width: 100%;
`;

export const ReminderDialogDetails = styled.div`
  border-bottom: 1px solid;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  span {
    margin-bottom: 0;
  }
`;

export const InputElement = styled.input`
  align-items: flex-start;
  background: transparent;
  border: none;
  color: ${$black};
  display: flex;
  display: flex;
  flex-direction: row-reverse;
  font-size: 24px;
  margin-bottom: 20px;
  width: 100%;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    height: 30px;
    margin-left: 0;
    margin-right: 16px;
    padding: 0;
    width: 30px;
  }
`;

export const ColorPicker = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;

  svg {
    margin-right: 16px;
  }
`;

export const ColorInput = styled.input`
  -webkit-appearance: none;
  border: none;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background-color: transparent;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }
`;

export const LocationInput = styled.span`
  display: flex;
  margin-bottom: 16px;

  svg {
    margin-right: 16px;
  }

  input {
    text-transform: capitalize;
  }
`;

export const WeatherForecastArea = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const WeatherForecastTitle = styled.div`
  font-size: 18px;
`;

export const Weather = styled.div`
  display: flex;
  margin-right: 18px;

  img {
    margin-right: 5px;
  }
`;

export const TemperatureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Temperature = styled.div`
  font-size: 35px;
`;

export const TemperatureDetails = styled.div`
  font-size: 16px;
  text-transform: capitalize;
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 5px;
`;

export const DialogButton = styled.button`
  background-color: ${$primaryBlue};
  border-radius: 10px;
  border: none;
  color: ${$white};
  height: 42px;
  margin: 5px;
  width: 100px;

  &:hover {
    background-color: ${shade(0.1, $primaryBlue)};
  }
`;
