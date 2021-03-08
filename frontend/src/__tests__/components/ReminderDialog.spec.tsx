import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import ReminderDialog from '../../components/ReminderDialog';

interface IReminder {
  city: string;
  fullDate: Date;
  date: string;
  title: string;
  id: string;
  time: string;
  color: string;
}

const mockUseStorage = jest.fn();

jest.mock('../../hooks/storage', () => {
  return {
    useStorage: () => ({
      setItem: mockUseStorage,
    }),
  };
});

jest.mock('uuid', () => {
  return {
    v4: () => 'guid-id',
  };
});

const handleReminderDialogClose = jest.fn();
const selectedReminder = { fullDate: new Date() } as IReminder;

describe('ReminderDialog Component', () => {
  it('Should render component', async () => {
    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={selectedReminder}
      />,
    );

    const newReminder = {
      title: 'Jobsity Interview',
      city: 'Recife',
      color: '#938274',
      time: '15:00',
      date: '2021-03-26',
      id: 'guid-id',
    };

    const titleInput = getByLabelText('title');
    const dateInput = getByLabelText('date');
    const timeInput = getByLabelText('time');
    const cityInput = getByLabelText('city');
    const colorInput = getByLabelText('color');
    const saveButton = getByText('Save');

    fireEvent.change(titleInput, { target: { value: 'Jobsity Interview' } });
    fireEvent.change(dateInput, { target: { value: '2021-03-26' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(cityInput, { target: { value: 'Recife' } });
    fireEvent.change(colorInput, { target: { value: '#938274' } });

    fireEvent.click(saveButton);

    await wait(() => {
      expect(mockUseStorage).toHaveBeenCalledWith(
        '26032021',
        expect.objectContaining(newReminder),
      );
    });
  });
});
