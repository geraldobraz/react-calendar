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
  addReminder(reminder: IReminder): void;
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

  const addOrUpdate = (key: string, reminder: IReminder): IReminder[] => {
    let newArray = hash[key];

    if (newArray) {
      const filteredReminderIdx = newArray.findIndex(f => f.id === reminder.id);

      if (filteredReminderIdx !== -1) {
        newArray[filteredReminderIdx] = reminder;
      } else {
        newArray = newArray.concat(reminder);
      }
    } else {
      newArray = [reminder];
    }

    newArray.sort((d1, d2) => {
      if (d1.time < d2.time) return -1;
      if (d1.time > d2.time) return 1;
      return 0;
    });

    return newArray;
  };

  const deleteById = (key: string, id: string): IReminder[] => {
    return hash[key].filter(reminder => reminder.id !== id);
  };

  const addReminder = (reminder: IReminder): void => {
    const key = formatDate(reminder.date);

    const newHash = hash;
    newHash[key] = addOrUpdate(key, reminder);

    localStorage.setItem('@Calendar-Reminders', JSON.stringify(newHash));
    setHash({ ...hash, ...newHash });
  };

  const editReminder = (
    newReminder: IReminder,
    previousReminder: IReminder,
  ): void => {
    const newHash = hash;

    if (newReminder.date !== previousReminder.date) {
      const key = formatDate(previousReminder.date);
      const reminders = deleteById(key, previousReminder.id);
      if (reminders.length === 0) {
        delete newHash[key];
      } else {
        newHash[key] = reminders;
      }
    }

    const key = formatDate(newReminder.date);
    newHash[key] = addOrUpdate(key, newReminder);

    localStorage.setItem('@Calendar-Reminders', JSON.stringify(newHash));
    setHash({ ...hash, ...newHash });
  };

  const deleteReminderById = (id: string, date: string): void => {
    const key = formatDate(date);

    const newHash = hash;
    const reminders = deleteById(key, id);
    if (reminders.length === 0) {
      delete newHash[key];
    } else {
      newHash[key] = reminders;
    }

    localStorage.setItem('@Calendar-Reminders', JSON.stringify(newHash));
    setHash({ ...hash, ...newHash });
  };

  const deleteRemindersByDate = (date: Date): void => {
    const key = format(date, 'ddMMyyyy');

    const copyHash = hash;
    delete copyHash[key];

    localStorage.setItem('@Calendar-Reminders', JSON.stringify(copyHash));
    setHash({ ...hash, ...copyHash});
  };

  return (
    <StorageContext.Provider
      value={{
        storage: hash,
        getStorage,
        getStorageByKey,
        addReminder,
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
