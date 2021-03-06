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
  setItem(key: string, reminders: IReminder): void;
}

const StorageContext = createContext<StorageContextData>(
  {} as StorageContextData,
);

const StorageProvider: React.FC = ({ children }) => {
  const [hash, setHash] = useState<IHash>({});

  const getStorage = (): IHash => {
    return hash;
  };

  const getStorageByKey = (key: string): IReminder[] => {
    return hash[key];
  };

  const setItem = (key: string, reminder: IReminder): void => {
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
    setHash({ ...hash, ...newData });
  };

  return (
    <StorageContext.Provider
      value={{
        storage: hash,
        getStorage,
        getStorageByKey,
        setItem,
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