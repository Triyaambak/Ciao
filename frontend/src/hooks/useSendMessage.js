import { useState } from "react";
import useConversations from "../zustand/useConversations";
import axios from 'axios';

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversations();
    
    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const result = await axios.post(
                `http://localhost:3001/api/messages/send/${selectedConversation._id}`,
                {
                    message,
                },
                {
                withCredentials: true,
                }
            );
            setMessages([...messages, result.data]);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, sendMessage };
}

export default useSendMessage;