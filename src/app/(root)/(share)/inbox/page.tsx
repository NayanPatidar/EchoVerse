"use client";
import AddFriendToChat from "@/components/chat/addFriendsToChat";
import ChatFriends from "@/components/chat/chatFriends";
import { Button } from "@/components/ui/button";
import { useGeneralContext } from "@/context/GeneralContext";
import { MessageCircleHeart } from "lucide-react";

const Inbox = () => {
  const { NewMessage, SetNewMessage } = useGeneralContext();

  return (
    <div
      className=" w-8/12 h-full overflow-y-hidden p-3 bg-[#212121] rounded-md flex justify-center items-center text-sm gap-1"
      style={{ height: "calc(100vh - 11.5rem)" }}
    >
      <div className=" flex flex-col justify-center items-center gap-2 md:text-sm">
        <MessageCircleHeart className=" md:size-20 size-10 xs" />
        Send a message to start a chat.
        <Button
          className=" bg-[#191919] hover:bg-black"
          onClick={() => SetNewMessage(true)}
        >
          Send Message
        </Button>
      </div>
      {NewMessage ? <AddFriendToChat /> : null}
    </div>
  );
};

export default Inbox;
