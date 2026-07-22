import { create } from "zustand";

export interface AppNotification {
  id: string;

  title: string;

  body: string;

  read: boolean;

  createdAt: string;
}

interface NotificationState {
  notifications: AppNotification[];

  unreadCount: number;

  setNotifications: (
    notifications: AppNotification[]
  ) => void;

  addNotification: (
    notification: AppNotification
  ) => void;

  markAsRead: (id: string) => void;

  clearNotifications: () => void;
}

export const useNotificationStore =
  create<NotificationState>((set, get) => ({
    notifications: [],

    unreadCount: 0,

    setNotifications: (notifications) =>
      set({
        notifications,
        unreadCount: notifications.filter(
          (item) => !item.read
        ).length,
      }),

    addNotification: (notification) =>
      set((state) => ({
        notifications: [
          notification,
          ...state.notifications,
        ],

        unreadCount: state.unreadCount + 1,
      })),

    markAsRead: (id) =>
      set((state) => {
        const notifications =
          state.notifications.map((item) =>
            item.id === id
              ? { ...item, read: true }
              : item
          );

        return {
          notifications,

          unreadCount: notifications.filter(
            (item) => !item.read
          ).length,
        };
      }),

    clearNotifications: () =>
      set({
        notifications: [],
        unreadCount: 0,
      }),
  }));