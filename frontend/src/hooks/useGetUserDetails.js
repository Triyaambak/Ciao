import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetUserDetails = () => {
    const [userDetails, setUserDetails] = useState();
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const userDetails = await axios.get('http://localhost:3001/api/users/userDetails', {
                    withCredentials: true,
                });
                setUserDetails(userDetails.data)
            } catch (error) {
                console.log(error);
            } 
        };
        getUserDetails();
    }, [])
    return { userDetails };
};

export default useGetUserDetails;