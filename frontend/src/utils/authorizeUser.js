import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const authorizeUser = () => {
    const [cookie, setCookie] = useCookies();
    useEffect(() => {
        setCookie('jwt', cookie.jwt);
    }, [cookie.jwt])
    if (cookie.jwt === "undefined")
        return null;
    if (cookie.jwt) {        
        const jwt = jwtDecode(cookie.jwt);
        return jwt.userId;
    } 
};

export default authorizeUser;