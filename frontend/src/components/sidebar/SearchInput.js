import { IoSearchSharp } from "react-icons/io5";
import { useState } from "react";

const searchInput = ({searchUser,handleChange,handleSubmit}) => {

    return (
        <form
            className='flex items-center gap-2'
            onSubmit={handleSubmit}
        >
            <input
                type='text'
                placeholder='Search…' className='input input-bordered rounded-full'
                value={searchUser}
                onChange={handleChange}
            />
            <button
                type='submit'
                className='btn btn-circle bg-sky-500 text-white'
            >
                <IoSearchSharp
                    className='w-6 h-6 outline-none' />
            </button>
        </form>
    )
};

export default searchInput;