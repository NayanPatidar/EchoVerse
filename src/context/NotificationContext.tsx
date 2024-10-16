"use client";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { Notification } from "@/types/notification";
import { useAuthProvider } from "./AuthContext";
import { onValue, ref, remove } from "firebase/database";
import { database } from "@/lib/firebase";
import { error } from "console";

interface NotificationContextProps {
  OriginialNotifications: Notification[] | undefined;
  SetOriginalNotifications: Dispatch<SetStateAction<Notification[]>>;
}

const NotificationContext = createContext<undefined | NotificationContextProps>(
  undefined
);

interface NotificationProviderProps {
  children: ReactNode;
}

interface NotificationType {
  content: String;
  receiver: Object;
  recevierId: String;
  senderId: String;
  type: String;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [Notifications, SetNotications] = useState<Notification[]>([]);
  const [OriginialNotifications, SetOriginalNotifications] = useState<
    Notification[]
  >([]);
  const { tokenDetails, token } = useAuthProvider();

  const GetNotifications = () => {
    const NotificationRef = ref(
      database,
      `notifications/${tokenDetails.userId}`
    );

    remove(NotificationRef)
      .then(() => {
        console.log("Request removed successfully from sender's side");
      })
      .catch((error) => {
        console.error("Error removing request from sender's side:", error);
      });

    const unsubscribeFunction = onValue(NotificationRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const notificationsArray = Object.entries(data).map(
          ([id, notification]) => ({
            id,
            ...(notification as NotificationType),
          })
        );

        console.log(notificationsArray);
        SetOriginalNotifications((prevnotification) => [
          ...notificationsArray,
          ...prevnotification,
        ]);
      }
    });

    return () => unsubscribeFunction();
  };

  const FetchNotification = async () => {
    const res = await fetch(
      `/api/friends/notification?userId=${tokenDetails.userId}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    SetOriginalNotifications(data.notifications || []);
    GetNotifications();
  };

  useEffect(() => {
    if (!tokenDetails.userId) return;
    FetchNotification();
  }, [tokenDetails.userId]);

  return (
    <NotificationContext.Provider
      value={{ OriginialNotifications, SetOriginalNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = (): NotificationContextProps => {
  const myContext = useContext(NotificationContext);
  if (!myContext) {
    throw new Error("Notification Context not defined!");
  }
  return myContext;
};
