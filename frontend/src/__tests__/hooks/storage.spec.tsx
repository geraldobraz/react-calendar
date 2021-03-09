import { act, renderHook } from '@testing-library/react-hooks';

import { useStorage, StorageProvider } from '../../hooks/storage';

interface IReminder {
  city: string;
  date: string;
  fullDate: Date;
  title: string;
  id: string;
  time: string;
  color: string;
}

const reminder: IReminder = {
  title: 'New Event',
  date: '2021-03-26',
  time: '15:00',
  color: '#938274',
  city: 'Recife',
  fullDate: new Date(2021, 2, 26),
  id: 'guid-id',
};
const reminderKey = '26032021';

describe('Storage hook', () => {
  it('should be able to create new reminder', async () => {
    const { result } = renderHook(() => useStorage(), {
      wrapper: StorageProvider,
    });

    act(() => {
      result.current.addReminder(reminder);
    });

    expect(result.current.storage).toHaveProperty(reminderKey);
    expect(result.current.storage[reminderKey]).toHaveLength(1);
    expect(result.current.storage[reminderKey][0]).toMatchObject(reminder);
  });

  it('should be able to edit an existing reminder without changing the date', async () => {
    const { result } = renderHook(() => useStorage(), {
      wrapper: StorageProvider,
    });

    const updatedReminder: IReminder = {
      title: 'Test Event',
      date: '2021-03-26',
      time: '19:00',
      color: '#b2dbbd',
      city: 'São Paulo',
      fullDate: new Date(2021, 2, 26),
      id: 'guid-id',
    };

    act(() => {
      result.current.addReminder(reminder);
      result.current.editReminder(updatedReminder, reminder);
    });

    expect(result.current.storage).toHaveProperty(reminderKey);
    expect(result.current.storage[reminderKey]).toHaveLength(1);
    expect(result.current.storage[reminderKey][0]).toMatchObject(updatedReminder);
  });

  it('should be able to edit an existing reminder to a different date', async () => {
    const { result } = renderHook(() => useStorage(), {
      wrapper: StorageProvider,
    });

    const updatedReminder: IReminder = {
      title: 'Test Event',
      date: '2021-03-27',
      time: '19:00',
      color: '#b2dbbd',
      city: 'São Paulo',
      fullDate: new Date(2021, 2, 27),
      id: 'guid-id',
    };
    const updatedReminderKey = '27032021';

    act(() => {
      result.current.addReminder(reminder);
      result.current.editReminder(updatedReminder, reminder);
    });

    expect(result.current.storage).not.toHaveProperty(reminderKey);
    expect(result.current.storage).toHaveProperty(updatedReminderKey);
    expect(result.current.storage[updatedReminderKey]).toHaveLength(1);
    expect(result.current.storage[updatedReminderKey][0]).toMatchObject(updatedReminder);
  });

  it('should be able to create delete an existing reminder', async () => {
    const { result } = renderHook(() => useStorage(), {
      wrapper: StorageProvider,
    });

    act(() => {
      result.current.addReminder(reminder);
      result.current.deleteReminderById(reminder.id, reminder.date);
    });

    expect(result.current.storage).not.toHaveProperty(reminderKey);
  });

  it('should be able to create delete all reminders of a given day', async () => {
    const { result } = renderHook(() => useStorage(), {
      wrapper: StorageProvider,
    });

    const reminderSameDay: IReminder = {
      ...reminder,
      id: 'guid-id2',
    };
    const reminderDifferentDay: IReminder = {
      ...reminder,
      date: '2021-03-27',
      id: 'guid-id3',
    };
    const reminderDifferentDayKey = '27032021';

    act(() => {
      result.current.addReminder(reminder);
      result.current.addReminder(reminderSameDay);
      result.current.addReminder(reminderDifferentDay);
      result.current.deleteRemindersByDate(reminder.fullDate);
    });

    expect(result.current.storage).not.toHaveProperty(reminderKey);
    expect(result.current.storage).toHaveProperty(reminderDifferentDayKey);
  });
});
