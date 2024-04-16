import EachMessage from "./EachMessage";
import useGetMessages from "../../hooks/useGetMessages";
import MessageLoading from "../skeletons/MessageLoading";
import useListenMessages from "../../hooks/useListenMessages";
import { useEffect, useRef } from "react";

const AllMessages = () => {
	const { loading, messages } = useGetMessages();
	useListenMessages();
	const lastMessageRef = useRef();

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	return (
		<div className='px-4 flex-1 overflow-auto'>
			{loading && [...Array(3)].map((_, idx) => <MessageLoading key={idx} />)}
			{/* If loading then we will print the MessageLoading Skeleton three times*/}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
			{/* If loading is complete and there are no messages to display then we display the above statement */}
			{!loading && messages.length > 0 && messages.map((message) => (
				<div key={message._id}>
					<EachMessage message={message} />
				</div>
			))}
		</div>
	);
};

export default AllMessages;