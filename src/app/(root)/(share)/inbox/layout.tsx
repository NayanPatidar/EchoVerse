"use client";
import AddFriendToChat from "@/components/chat/addFriendsToChat";
import ChatFriends from "@/components/chat/chatFriends";
import { Button } from "@/components/ui/button";
import { useGeneralContext } from "@/context/GeneralContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { NewMessage, SetNewMessage } = useGeneralContext();

  return (
    <div className=" w-full flex flex-row gap-2 p-2">
      <div className=" w-4/12 h-full flex flex-col gap-2">
        <div className=" p-3 bg-[#212121] rounded-md   flex justify-center font-semibold">
          Chats
        </div>

        <div
          className="bg-[#212121] rounded-md flex justify-center items-start text-sm gap-1  "
          style={{ height: "calc(100vh - 15rem)" }}
        >
          <ChatFriends />
        </div>
      </div>
      <div
        className=" w-8/12 h-full overflow-y-hidden p-3 bg-[#212121] rounded-md flex justify-center items-center text-sm gap-1  "
        style={{ height: "calc(100vh - 11.5rem)" }}
      >
        {children}
      </div>
      {NewMessage ? <AddFriendToChat /> : null}
    </div>
  );
}
