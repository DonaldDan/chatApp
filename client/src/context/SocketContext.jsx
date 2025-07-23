// src/context/SocketContext.jsx

import { createContext, useContext } from 'react';
import { socket } from '../socket/socket';

const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
