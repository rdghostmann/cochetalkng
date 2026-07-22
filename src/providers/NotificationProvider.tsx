import { PropsWithChildren, useEffect } from "react";
import * as Notifications from "expo-notifications";

export function NotificationProvider({
  children,
}: PropsWithChildren) {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldSetBadge: true,
      }),
    });
  }, []);

  return children;
}