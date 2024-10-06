"use client";
import { useEffect } from "react";

const FriendChat = ({ params }: { params: { roomId: string } }) => {
  useEffect(() => {
    console.log(params.roomId);
  }, []);
  return <div></div>;
};

export default FriendChat;
