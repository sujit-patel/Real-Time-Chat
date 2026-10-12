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
    const userId = authUser?.user?._id || authUser?._id;
    if (userId) {
      const socketUrl = import.meta.env.VITE_BACKEND_URL;
      const newSocket = io(socketUrl, {
        query: {
          userId,
        },
      });
      setSocket(newSocket);

      newSocket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("Received Online Users:", users);
      });

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
