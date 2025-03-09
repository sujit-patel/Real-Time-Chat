import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";
const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket);
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("Received Online Users:", users);
      });
      return () => socket.disconnect();
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
