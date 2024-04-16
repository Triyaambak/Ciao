import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
	const [userDetails, setUserDetails] = useState({
		userName: "",
		password: "",
	});
	const [error, setError] = useState('');

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserDetails(prevUserDetails => ({
			...prevUserDetails,
			[name]:value,
		}))
	}
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = await axios.post('http://localhost:3001/api/auth/login', { ...userDetails }, {
				withCredentials: true
			});

			window.location.href = '/';
		} catch (error) {
			setError(error.response.data);
			setTimeout(() => {
				setError('');
			}, 3000);
		}
	};
	
	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
				<h1 className='text-3xl font-semibold text-center text-gray-300'>
					Login
					<span className='text-blue-500'> CIAO</span>
				</h1>

				<form onSubmit={handleSubmit} >
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='Enter username'
							className='w-full input input-bordered h-10'
							name='userName'
							value={userDetails.userName}
							onChange={handleChange}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							name='password'
							value={userDetails.password}
							onChange={handleChange}
						/>
					</div>
				  
					<Link to='/signup' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2'>
							Login
						</button>
					</div>
					<label className='flex items-center justify-center w-full mt-4'>
						<span className='text-base text-red-600 font-bold'>{error}</span>
					</label>
				</form>
			</div>
		</div>
	);
}

export default Login;
