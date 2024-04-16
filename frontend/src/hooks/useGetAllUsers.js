import axios from 'axios';
import { useEffect, useState } from 'react';

const useGetAllUsers = () => {
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState();
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchAllUsers = await axios.get('http://localhost:3001/api/users', {
                    withCredentials: true,
                });
                setAllUsers(fetchAllUsers.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    return { loading, allUsers };
};

export default useGetAllUsers;