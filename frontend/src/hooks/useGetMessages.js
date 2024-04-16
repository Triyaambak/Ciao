import { useEffect, useState } from "react";
import useConversations from "../zustand/useConversations";
import axios from 'axios';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversations();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const result = await axios.get(
                    `http://localhost:3001/api/messages/${selectedConversation._id}`,
                    {
                        withCredentials:true,
                    }
                )
                setMessages(result.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        if (selectedConversation?._id)
            getMessages();
    }, [selectedConversation?._id, setMessages]);
    return { loading, messages };
}

export default useGetMessages;