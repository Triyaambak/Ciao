import { useEffect, useState } from 'react'; 
import axios from 'axios';

const useGetSpecificUsers = (submittedSearch) => {
    const [loading, setLoading] = useState(false);
    const [specificUsers, setSpecificUsers] = useState("");

    useEffect(() => {
        const getSpecificUsers = async () => {
        setLoading(true);
        try {
            const result = await axios.get(`http://localhost:3001/api/users/${submittedSearch}`, {
                withCredentials: true
            });
            setSpecificUsers(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            }
        }
        getSpecificUsers();
    }, [])
    
    return { loading, specificUsers };
}

export default useGetSpecificUsers;