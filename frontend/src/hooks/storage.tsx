import { format } from 'date-fns';
import React, { createContext, useContext, useState } from 'react';

interface IReminder {
  city: string;
  date: string;
  fullDate: Date;
  title: string;
  id: string;
  time: string;
  color: string;
}

interface IHash {
  [date: string]: IReminder[];
}

interface StorageContextData {
  storage: IHash;
  getStorage(): IHash;
  getStorageByKey(key: string): IReminder[];
  setReminder(reminder: IReminder): void;
  editReminder(newReminder: IReminder, previousReminder: IReminder): void;
  deleteReminderById(id: string, date: string): void;
  deleteRemindersByDate(date: Date): void;
}

const formatDate = (date: string): string => {
  const [year, month, day] = date.split('-');
  return `${day}${month}${year}`;
};

const StorageContext = createContext<StorageContextData>(
  {} as StorageContextData,
);

const StorageProvider: React.FC = ({ children }) => {
  const [hash, setHash] = useState<IHash>(() => {
    const data = localStorage.getItem('@Calendar-Reminders');

    if (data) {
      return JSON.parse(data);
    }

    return {} as IHash;
  });

  const getStorage = (): IHash => {
    return hash || localStorage.getItem('@Calendar-Reminders');
  };

  const getStorageByKey = (key: string): IReminder[] => {
    return hash[key];
  };

  const editReminder = (
    newReminder: IReminder,
    previousReminder: IReminder,
  ): void => {
    const newData: IHash = {};

    if (newReminder.date !== previousReminder.date) {
      const key = formatDate(previousReminder.date);
      const reminders = hash[key].filter(
        reminder => reminder.id !== previousReminder.id,
      );
      newData[key] = reminders;
    }

    const key = formatDate(newReminder.date);

    let dataCopy = hash[key];

    if (dataCopy) {
      const filteredReminderIdx = dataCopy.findIndex(
        f => f.id === newReminder.id,
      );

      if (filteredReminderIdx !== -1) {
        dataCopy[filteredReminderIdx] = newReminder;
      } else {
        dataCopy = dataCopy.concat(newReminder);
      }
    } else {
      dataCopy = [newReminder];
    }

    dataCopy.sort((d1, d2) => {
      if (d1.time < d2.time) return -1;
      if (d1.time > d2.time) return 1;
      return 0;
    });

    newData[key] = dataCopy;

    localStorage.setItem(
      '@Calendar-Reminders',
      JSON.stringify({ ...hash, ...newData }),
    );
    setHash({ ...hash, ...newData });
  };

  const setReminder = (reminder: IReminder): void => {
    const key = formatDate(reminder.date);

    let dataCopy = hash[key];
    if (dataCopy) {
      const filteredReminderIdx = dataCopy.findIndex(f => f.id === reminder.id);

      if (filteredReminderIdx !== -1) {
        dataCopy[filteredReminderIdx] = reminder;
      } else {
        dataCopy = dataCopy.concat(reminder);
      }
    } else {
      dataCopy = [reminder];
    }

    dataCopy.sort((d1, d2) => {
      if (d1.time < d2.time) return -1;
      if (d1.time > d2.time) return 1;
      return 0;
    });

    const newData: IHash = {
      [key]: dataCopy,
    };
    localStorage.setItem(
      '@Calendar-Reminders',
      JSON.stringify({ ...hash, ...newData }),
    );
    setHash({ ...hash, ...newData });
  };

  const deleteReminderById = (id: string, date: string): void => {
    const key = formatDate(date);

    const reminders = hash[key].filter(reminder => reminder.id !== id);

    const newData: IHash = {
      [key]: reminders,
    };
    localStorage.setItem(
      '@Calendar-Reminders',
      JSON.stringify({ ...hash, ...newData }),
    );
    setHash({ ...hash, ...newData });
  };

  const deleteRemindersByDate = (date: Date): void => {
    const key = format(date, 'ddMMyyyy');
    const copyHash = hash;
    delete copyHash[key];

    localStorage.setItem(
      '@Calendar-Reminders',
      JSON.stringify({ ...hash, ...copyHash }),
    );
    setHash({ ...hash, ...copyHash });
  };

  return (
    <StorageContext.Provider
      value={{
        storage: hash,
        getStorage,
        getStorageByKey,
        setReminder,
        editReminder,
        deleteReminderById,
        deleteRemindersByDate,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};

function useStorage(): StorageContextData {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('useAuth must be used within a StorageProvider');
  }

  return context;
}

export { StorageProvider, useStorage };
