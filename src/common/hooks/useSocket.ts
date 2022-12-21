import React from 'react';
import SocketContext from '../providers/SocketProvider';
import type { SocketContextType } from '../providers/SocketProvider';

const useSocket = () => {
  const { socket, isConnected } = React.useContext<SocketContextType>(SocketContext);
  return { socket, isConnected };
};

export default useSocket;
