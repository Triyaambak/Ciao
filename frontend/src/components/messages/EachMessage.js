import extractTime from "../../utils/extractTime";
import useConversations from "../../zustand/useConversations";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import { useState, useEffect } from "react";

const EachMessage = ({ message }) => {
	const { userDetails } = useGetUserDetails();
	const { selectedConversation } = useConversations();
	const [fromMe, setFromMe] = useState(false);

	useEffect(() => {
        if (userDetails && userDetails._id && message.senderId === userDetails._id) {
            setFromMe(true);
        } else {
            setFromMe(false);
        }
	}, [userDetails, message.senderId]);
	
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const profilePic = fromMe ? userDetails.picture : selectedConversation?.picture;
	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

	return (
		<div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
	);
};

export default EachMessage;