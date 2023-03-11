import React from "react";
import type { Socket } from "socket.io-client";
import SocketEvents from "common/providers/SocketProvider/types";
import io from "socket.io-client";
import { useSession } from "next-auth/react";

export type SocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};

const SocketContext = React.createContext<SocketContextType>({} as SocketContextType);

const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useSession();
  const [isConnected, setIsConnected] = React.useState<boolean>(false);

  const socket = React.useRef<Socket | null>(null);

  const socketInitializer = async () => {
    await fetch("/api/v1/socket");

    socket.current = io({ forceNew: true });

    socket.current.once(SocketEvents.CONNECT, () => {
      console.debug("Csatlakozva a szerverhez.");
      setIsConnected(true);
      socket.current?.emit(SocketEvents.SOCKET_CONNECTED, data?.user?.id);
    });

    socket.current.once(SocketEvents.DISCONNECT, () => {
      console.error("Szerver kapcsolat megszakadt.");
      setIsConnected(false);
    });
  };

  React.useEffect(() => {
    const userId = data?.user?.id as string;
    if (userId) {
      socketInitializer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socket.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
export { SocketContextProvider };
