import { createContext, useEffect, useState, useContext } from "react";
import authorizeUser from "./authorizeUser";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const token = authorizeUser();

	useEffect(() => {
		if (token) {
			const socket = io("http://localhost:3001", {
				query: {
					userId: token,
				},
			});
			
			setSocket(socket);

			// socket.on() is used to listen to the events. can be used both on client and server side
			socket.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});

			return () => {
				socket.close();
				setSocket(null);
			}
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [token]);

	return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};