import type { NextApiRequest, NextApiResponse } from "next";

import type { ChatMessage } from "components/Chat";
import type { Server as HttpServer } from "http";
import type { Socket } from "Socket.IO";
import SocketEvents from "common/providers/SocketProvider/types";
import { Server as SocketServer } from "Socket.IO";
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

      // Socket User ID beállítása első csatlakozáskor
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
    });

    res.socket.server.io = io;
  }

  res.end();
};
export default SocketHandler;
