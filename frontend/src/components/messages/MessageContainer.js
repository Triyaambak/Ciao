import MessageInput from "./MessageInput";
import AllMessages from "./AllMessages";
import useConversation from "../../zustand/useConversations";
import { TiMessages } from "react-icons/ti";
import useGetUserDetails from "../../hooks/useGetUserDetails";
import { useEffect } from "react";

const MessageContainer = () => {
	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		return () => setSelectedConversation(null);	
	},[setSelectedConversation])
	return (
		<div className='md:min-w-[450px] flex flex-col'>
			{!selectedConversation ? (
				<NoChatSelected />
			) : (
				<>
					<div className='bg-slate-500 px-4 py-2 mb-2'>
						<span className='label-text'>To:</span>{" "}
						<span className='text-gray-900 font-bold'>{selectedConversation.userName}</span>
					</div>
					<AllMessages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

const NoChatSelected = () => {
	const { userDetails } = useGetUserDetails();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome {userDetails && (userDetails.userName)} 👋 ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};

export default MessageContainer;