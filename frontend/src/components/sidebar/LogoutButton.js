import { BiLogOut } from "react-icons/bi";
import axios from "axios";

const LogoutButton = () => {
	const handleClick = async () => {
		try {
			const data = await axios.get('http://localhost:3001/api/auth/logout', {
			  withCredentials: true
		  });
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<div className='mt-auto'>
			<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={handleClick}/>
		</div>
	);
};

export default LogoutButton;