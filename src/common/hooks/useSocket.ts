import React from "react";
import SocketContext from "../providers/SocketProvider";
import type { SocketContextType } from "../providers/SocketProvider";

const useSocket = () => {
  const data = React.useContext<SocketContextType>(SocketContext);
  return data;
};

export default useSocket;
