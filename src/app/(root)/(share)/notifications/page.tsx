"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";
import { onValue, ref, remove } from "firebase/database";
import { database } from "@/lib/firebase";

interface NotificationType {
  content: String;
  receiver: Object;
  recevierId: String;
  senderId: String;
  type: String;
}

const Notifications = () => {
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
    <div
      className=" w-full flex flex-col"
      style={{ height: "calc(100vh - 11.5rem)" }}
    >
      <div className=" text-xl text-center font-semibold mt-2">
        Notifications
      </div>
      <div className="font-medium mt-2">
        {OriginialNotifications &&
          Object.entries(OriginialNotifications).map(([key, val]) => {
            return (
              <div key={key} className=" bg-[#121212] p-4">
                {val.content}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notifications;
