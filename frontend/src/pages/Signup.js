import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender:"",
  });
  const [error, setError] = useState('');
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserDetails(prevUserDetails => ({
      ...prevUserDetails,
      [name]: value,
    }))
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/api/auth/signup', { ...userDetails }, {
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
					Sign Up <span className='text-blue-500'> CIAO</span>
        </h1>
        <form onSubmit={handleClick}>
          <div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
              className='w-full input input-bordered  h-10'
              value={userDetails.fullName}
              name='fullName'
              onChange={handleChange}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Username</span>
						</label>
						<input
							type='text'
							placeholder='johndoe'
              className='w-full input input-bordered h-10'
              value={userDetails.userName}
              name='userName'
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
              value={userDetails.password}
              name='password'
              onChange={handleChange}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={userDetails.confirmPassword}
              name='confirmPassword'
              onChange={handleChange}
						/>
          </div>

          <div>
						<label className='label'>
							<span className='text-base label-text'>Gender</span>
            </label>
            <div className='mb-2 flex'>
              <input
                type='checkbox'
                className='checkbox border-slate-900 mr-2'
                value='male'
                checked={userDetails.gender==='male'}
                name='gender'
                onChange={handleChange}
              />Male
            </div>
            <div className='mt-2 flex'>
              <input
                type='checkbox'
                className='checkbox border-slate-900 mr-2'
                value='female'
                checked={userDetails.gender==='female'}
                name='gender'
                onChange={handleChange}
              />Female
            </div>
          </div>

          <Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700'>
							Sign Up
						</button>
          </div>
          <label className='flex items-center justify-center w-full mt-4'>
						<span className='text-base text-red-600 font-bold'>{error}</span>
					</label>
        </form>
			</div>
		</div>
  )
}

export default Signup;
