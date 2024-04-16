import { useEffect } from "react";
import { useSocketContext } from "../utils/socketContext";
import useConversations from "../zustand/useConversations";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversations();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        })
        return () => socket.off("newMessage");
    }, [socket, setMessages, messages]);
}

export default useListenMessages;