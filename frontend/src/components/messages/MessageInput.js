import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
	const [message, setMessage] = useState("");
	useSendMessage();
	const { loading, sendMessage } = useSendMessage();

	const handleChange = (event) => {
		setMessage(event.target.value);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!message)
			return
		sendMessage(message);
		setMessage("");
	}

	return (
		<form
			className='px-4 my-3'
			onSubmit={handleSubmit}
		>
			<div className='flex'>
				<input
					type='text'
					className='border-none rounded-l-lg flex-1 py-2 px-4 bg-gray-700 text-white placeholder-gray-400
					focus:outline-none focus:border-blue-500'
					placeholder='Send a message'
					onChange={handleChange}
					value={message}
				/>
				<button
					type='submit'
					className='bg-gray-700 text-white rounded-r-lg p-2'
					disabled={!message || loading}>
					{loading ? <div className='loading loading-spinner'></div> : <BsSend />}
				</button>
			</div>
		</form>
	);
};

export default MessageInput;