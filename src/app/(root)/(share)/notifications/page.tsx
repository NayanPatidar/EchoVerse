"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { useNotificationContext } from "@/context/NotificationContext";
import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";

const Notifications = () => {
  const { OriginialNotifications } = useNotificationContext();

  useEffect(() => {
    console.log(OriginialNotifications);
  }, [OriginialNotifications]);

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
