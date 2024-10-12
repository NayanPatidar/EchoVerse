"use client";
import { useAuthProvider } from "@/context/AuthContext";
import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";

const Notifications = () => {
  const { token, tokenDetails } = useAuthProvider();
  const [Notifications, SetNotifications] = useState<
    undefined | Notification[]
  >(undefined);

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
    console.log(data);

    SetNotifications(data.notifications);
  };

  useEffect(() => {
    FetchNotification();
  }, []);

  return (
    <div className=" w-full h-full flex flex-col">
      <div className=" text-xl text-center font-semibold mt-2">
        Notifications
      </div>
      <div className="font-medium mt-2">
        {Notifications &&
          Object.entries(Notifications).map(([key, val]) => {
            return <div key={key} className=" bg-[#121212] p-4">{val.content}</div>;
          })}
      </div>
    </div>
  );
};

export default Notifications;
