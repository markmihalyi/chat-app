import type { NextApiRequest, NextApiResponse } from "next";

import type { ChatMessage } from "components/Chat";
import type { Server as HttpServer } from "http";
import type { Socket } from "socket.io";
import SocketEvents from "common/providers/SocketProvider/types";
import { Server as SocketServer } from "socket.io";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

type ServerWithSocket = HttpServer & {
  io?: SocketServer;
};

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: ServerWithSocket;
  };
};

const SocketHandler = async (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  // Session ellenőrzése
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).end();
    return;
  }

  // Socket kezelő létrehozása (ha még nincs)
  if (!res.socket.server.io) {
    const io = new SocketServer(res.socket.server);
    io.on("connection", (socket: Socket) => {
      // Alapértelmezett Socket User ID felülírása a sessionben tárolt User ID-re
      if (socket.rooms.has(socket.id)) {
        socket.leave(socket.id);
      }

      let ownUserId: string;

      socket.on(SocketEvents.SOCKET_CONNECTED, (userId: string) => {
        ownUserId = userId;
        socket.join(ownUserId);
        console.log(`Socket connected: ${ownUserId}`);
      });

      // Üzenet küldése
      socket.on(SocketEvents.SEND_MESSAGE, (text: string, contactId: string) => {
        console.log(`${ownUserId} -> ${contactId}: ${text}`);

        socket.to(ownUserId).emit(SocketEvents.NEW_MESSAGE, {
          text,
          date: new Date(),
          type: "own",
        } as ChatMessage);

        socket.to(contactId).emit(SocketEvents.NEW_MESSAGE, {
          text,
          date: new Date(),
          type: "contact",
        } as ChatMessage);
      });

      // Barát-kérelem küldése
      socket.on(SocketEvents.SEND_FRIEND_REQUEST, (targetUserId: string) => {
        console.log(`${ownUserId} -> ${targetUserId}: Add friend`);

        socket.to(targetUserId).emit(SocketEvents.NEW_FRIEND_REQUEST, ownUserId);
      });

      // Barát-kérelem elfogadása
      socket.on(SocketEvents.ACCEPT_FRIEND_REQUEST, (targetUserId: string) => {
        console.log(`${ownUserId} -> ${targetUserId}: Accept friend`);

        socket.to(targetUserId).emit(SocketEvents.FRIEND_REQUEST_ACCEPTED, ownUserId);
        socket.to(ownUserId).emit(SocketEvents.FRIEND_REQUEST_ACCEPTED, targetUserId);
      });

      // Barát-kérelem visszavonása
      socket.on(SocketEvents.UNSEND_FRIEND_REQUEST, (targetUserId: string) => {
        console.log(`${ownUserId} -> ${targetUserId}: Unsend friend`);

        socket.to(targetUserId).emit(SocketEvents.FRIEND_REQUEST_UNSENT, ownUserId);
        socket.to(ownUserId).emit(SocketEvents.FRIEND_REQUEST_UNSENT, targetUserId);
      });

      // Barát törlése
      socket.on(SocketEvents.REMOVE_FRIEND, (targetUserId: string) => {
        console.log(`${ownUserId} -> ${targetUserId}: Remove friend`);

        socket.to(targetUserId).emit(SocketEvents.FRIEND_REMOVED, ownUserId);
        socket.to(ownUserId).emit(SocketEvents.FRIEND_REMOVED, targetUserId);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};
export default SocketHandler;
