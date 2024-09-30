import { Button } from "@/components/ui/button";
import { MessageCircleHeart, MessageCircleX } from "lucide-react";

const Inbox = () => {
  return (
    <div className=" w-full flex flex-row gap-2 p-2">
      <div className=" w-4/12 h-full flex flex-col gap-2">
        <div className=" p-3 bg-[#212121] rounded-md   flex justify-center font-semibold">
          Chats
        </div>
        <div
          className=" p-3 bg-[#212121] rounded-md  pt-5 flex justify-center items-start text-sm gap-1  "
          style={{ height: "calc(100vh - 15rem)" }}
        >
          <div className=" flex justify-center items-center gap-2 pt-4">
            <MessageCircleX />
            Add friends to chat with them !
          </div>
        </div>
      </div>
      <div
        className=" w-8/12 h-full overflow-y-hidden p-3 bg-[#212121] rounded-md flex justify-center items-center text-sm gap-1  "
        style={{ height: "calc(100vh - 11.5rem)" }}
      >
        <div className=" flex flex-col justify-center items-center gap-2">
          <MessageCircleHeart size={75} />
          Send a message to start a chat.
          <Button className=" bg-[#191919] hover:bg-black">Send Message</Button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
