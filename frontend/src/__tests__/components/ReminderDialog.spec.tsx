import { render, fireEvent, wait } from '@testing-library/react';
import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import ReminderDialog from '../../components/ReminderDialog';
import weatherApi from '../../services/weatherApiClient';

interface IReminder {
  city: string;
  fullDate: Date;
  date: string;
  title: string;
  id: string;
  time: string;
  color: string;
}

const mockAddItem = jest.fn();
const mockEditItem = jest.fn();
const mockDeleteItem = jest.fn();
const weatherApiMock = new MockAdapter(weatherApi);
const handleReminderDialogClose = jest.fn();
const newReminder = { fullDate: new Date() } as IReminder;
const apiResponse = {
  list: [
    {
      dt: 1615129200,
      main: {
        temp: 29.21,
      },
      weather: [
        {
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      dt_txt: '2021-03-07 15:00:00',
    },
    {
      dt: 1615140000,
      main: {
        temp: 29.06,
      },
      weather: [
        {
          description: 'scattered clouds',
          icon: '03d',
        },
      ],
      dt_txt: '2021-03-07 18:00:00',
    },
  ],
};

jest.mock('../../hooks/storage', () => {
  return {
    useStorage: () => ({
      addReminder: mockAddItem,
      editReminder: mockEditItem,
      deleteReminderById: mockDeleteItem,
    }),
  };
});

jest.mock('uuid', () => {
  return {
    v4: () => 'guid-id',
  };
});

describe('ReminderDialog Component', () => {
  beforeEach(() => {
    mockAddItem.mockClear();
    mockEditItem.mockClear();
    mockDeleteItem.mockClear();
  });

  it('should able to render', async () => {
    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={newReminder}
      />,
    );

    const titleInput = getByLabelText('title');
    const dateInput = getByLabelText('date');
    const timeInput = getByLabelText('time');
    const cityInput = getByLabelText('city');
    const colorInput = getByLabelText('color');
    const saveButton = getByText('Save');

    expect(titleInput).toBeTruthy();
    expect(dateInput).toBeTruthy();
    expect(timeInput).toBeTruthy();
    expect(cityInput).toBeTruthy();
    expect(colorInput).toBeTruthy();
    expect(saveButton).toBeTruthy();
  });

  it('should create a new reminder', async () => {
    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={newReminder}
      />,
    );

    const reminder = {
      title: 'New Event',
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

    fireEvent.change(titleInput, { target: { value: 'New Event' } });
    fireEvent.change(dateInput, { target: { value: '2021-03-26' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(cityInput, { target: { value: 'Recife' } });
    fireEvent.change(colorInput, { target: { value: '#938274' } });

    fireEvent.click(saveButton);

    await wait(() => {
      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining(reminder),
      );
    });
  });

  it('should edit a new reminder', async () => {
    const selectedReminder: IReminder = {
      title: 'Jobsity Interview',
      city: 'Recife',
      fullDate: new Date(26, 2, 2021),
      color: '#938274',
      time: '15:00',
      date: '2021-03-26',
      id: 'guid-id',
    };

    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={selectedReminder}
      />,
    );

    const titleInput = getByLabelText('title');
    const dateInput = getByLabelText('date');
    const timeInput = getByLabelText('time');
    const cityInput = getByLabelText('city');
    const colorInput = getByLabelText('color');
    const saveButton = getByText('Save');

    expect(titleInput).toHaveValue(selectedReminder.title);
    expect(dateInput).toHaveValue(selectedReminder.date);
    expect(timeInput).toHaveValue(selectedReminder.time);
    expect(cityInput).toHaveValue(selectedReminder.city);
    expect(colorInput).toHaveValue(selectedReminder.color);

    const reminder = {
      title: 'New Event',
      city: 'Recife',
      color: '#4daa57',
      time: '14:00',
      date: '2021-03-30',
      id: 'guid-id',
    };

    fireEvent.change(titleInput, { target: { value: reminder.title } });
    fireEvent.change(dateInput, { target: { value: reminder.date } });
    fireEvent.change(timeInput, { target: { value: reminder.time } });
    fireEvent.change(cityInput, { target: { value: reminder.city } });
    fireEvent.change(colorInput, { target: { value: reminder.color } });

    fireEvent.click(saveButton);

    await wait(() => {
      expect(mockEditItem).toHaveBeenCalledWith(
        expect.objectContaining(reminder),
        expect.objectContaining(selectedReminder),
      );
    });
  });

  it('should delete a reminder', async () => {
    const selectedReminder: IReminder = {
      title: 'New Event',
      city: 'Recife',
      fullDate: new Date(26, 2, 2021),
      color: '#938274',
      time: '15:00',
      date: '2021-03-26',
      id: 'guid-id',
    };

    const { getByLabelText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={selectedReminder}
      />,
    );

    const deleteButton = getByLabelText('delete');

    expect(deleteButton).toBeTruthy();

    fireEvent.click(deleteButton);

    wait(() => {
      expect(mockDeleteItem).toHaveBeenCalledWith(
        selectedReminder.id,
        '2021-03-26',
      );
    });
  });

  it('should show an error message when title input exceeds 30 characters', async () => {
    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={newReminder}
      />,
    );

    const bigInput = 'Bacon ipsum dolor amet swine ham';

    const titleInput = getByLabelText('title');
    const saveButton = getByText('Save');

    fireEvent.change(titleInput, { target: { value: bigInput } });

    fireEvent.click(saveButton);

    wait(() => {
      expect(getByLabelText('error-message')).toBeTruthy();
      expect(mockEditItem).not.toHaveBeenCalled();
      expect(mockAddItem).not.toHaveBeenCalled();
    });
  });

  it('should call weather api', async () => {
    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={newReminder}
      />,
    );

    const titleInput = getByLabelText('title');
    const dateInput = getByLabelText('date');
    const timeInput = getByLabelText('time');
    const cityInput = getByLabelText('city');
    const colorInput = getByLabelText('color');
    const saveButton = getByText('Save');

    fireEvent.change(titleInput, { target: { value: 'New Event' } });
    fireEvent.change(dateInput, { target: { value: '2021-03-26' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(cityInput, { target: { value: 'Recife' } });
    fireEvent.change(colorInput, { target: { value: '#938274' } });

    weatherApiMock.onGet('/forecast').reply(200, apiResponse);

    fireEvent.click(saveButton);

    wait(() => {
      expect(getByLabelText('temperature')).toBeTruthy();
      expect(getByLabelText('temperature')).toBe('29.06˚C');
      expect(getByLabelText('weather-description')).toBeTruthy();
      expect(getByLabelText('temperature')).toBe('Scattered Clouds');
    });
  });

  it('should call weather api with a invalid city name', async () => {
    const { getByLabelText, getByText } = render(
      <ReminderDialog
        open
        onClose={handleReminderDialogClose}
        selectedReminder={newReminder}
      />,
    );

    const titleInput = getByLabelText('title');
    const dateInput = getByLabelText('date');
    const timeInput = getByLabelText('time');
    const cityInput = getByLabelText('city');
    const colorInput = getByLabelText('color');
    const saveButton = getByText('Save');

    fireEvent.change(titleInput, { target: { value: 'New Event' } });
    fireEvent.change(dateInput, { target: { value: '2021-03-26' } });
    fireEvent.change(timeInput, { target: { value: '15:00' } });
    fireEvent.change(cityInput, { target: { value: 'InvalidCity' } });
    fireEvent.change(colorInput, { target: { value: '#938274' } });

    weatherApiMock.onGet(`/forecast`).reply(404);

    fireEvent.click(saveButton);
    wait(() => {
      expect(getByLabelText('temperature')).toBeFalsy();
      expect(getByLabelText('weather-description')).toBeFalsy();
    });
  });
});
