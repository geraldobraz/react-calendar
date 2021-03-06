import { DialogContent } from '@material-ui/core';
import styled, { css } from 'styled-components';
import { $black, $blue, $red, $whiteCultured } from '../../styles/colors';

interface IDialogButtonProps {
  isCancel?: boolean;
  isSave?: boolean;
}

export const ReminderDialogContent = styled(DialogContent)`
  background-color: ${$whiteCultured};
  color: ${$black};
  display: flex;
  flex-direction: column;
  height: 418px;
  width: 457px;
`;

export const ReminderDialogHeader = styled.div`
  align-items: center;
  display: flex;
  font-size: 36px;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const ReminderTitle = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 36px;
  width: 90%;

  input {
    margin: 0;
  }
`;

export const ErrorMessage = styled.p`
  color: ${$red};
  font-size: 15px;
  border-top: 1px solid;
`;

export const ReminderDialogDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 36px;
  border-bottom: 1px solid;
`;

export const InputElement = styled.input`
  background: transparent;
  border: none;
  color: ${$black};
  display: flex;
  font-size: 24px;
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: flex-start;

  &::-webkit-calendar-picker-indicator {
    margin-right: 16px;
    margin-left: 0;
    padding: 0;
    height: 30px;
    width: 30px;
  }
`;

export const ColorInput = styled.input`
  -webkit-appearance: none;
  border: none;
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
`;

export const ActionSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const DialogButton = styled.button<IDialogButtonProps>`
  border-radius: 10px;
  border: none;
  margin: 5px;
  height: 42px;
  width: 100px;

  &:hover {
    opacity: 0.8;
  }

  ${props =>
    css`
      background-color: ${$blue};
    `}
`;
