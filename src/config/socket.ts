import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = (): Socket => {
  if (socket) {
    return socket;
  }

  socket = io(process.env.NEXTAUTH_URL as string, {
    autoConnect: false,
  });
  return socket;
};
