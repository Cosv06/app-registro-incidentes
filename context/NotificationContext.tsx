// context/NotificationContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface NotificationContextType {
  hasNotifications: boolean;
  markAsRead: () => void;
  setHasNotifications: (value: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  hasNotifications: true,
  markAsRead: () => {},
  setHasNotifications: () => {},
});

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasNotifications, setHasNotifications] = useState(true);

  const markAsRead = () => setHasNotifications(false);

  return (
    <NotificationContext.Provider value={{ hasNotifications, markAsRead, setHasNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
