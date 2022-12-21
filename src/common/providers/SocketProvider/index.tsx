import React from "react";
import type { Socket } from "socket.io-client";
import io from "socket.io-client";

export type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = React.createContext<SocketContextType>(
  {} as SocketContextType
);

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  const socket = React.useRef<Socket | null>(null);

  // React.useEffect(() => {
  //   if (!socket.current) {
  //     socket.current = io(process.env.BACKEND_URL, {
  //       path: "/chat",
  //       transports: ["websocket"],
  //     });
  //   }

  //   socket.current.once(SocketEvents.CONNECT, () => {
  //     console.debug("Csatlakozva a szerverhez.");
  //     setIsConnected(true);
  //   });

  //   socket.current.once(SocketEvents.DISCONNECT, () => {
  //     socket.current?.removeAllListeners();
  //     console.error("Szerver kapcsolat megszakadt.");
  //     setIsConnected(false);
  //   });
  // }, [socket]);

  return (
    <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
export { SocketContextProvider };
