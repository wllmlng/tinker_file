import React, {useState, useEffect} from "react";
import { setAuthToken } from "../util/session_api_util";
import jwt_decode from 'jwt-decode';

export const MainContext = React.createContext();

const MainContextProvider = ({children}) => {
     const [jwt, setJwt] = useState('');

     useEffect(() => {
        if(localStorage.jwtToken){
            setAuthToken(localStorage.jwtToken);
            const decodedUser = jwt_decode(localStorage.jwtToken);
            const initialState = { isAuthenticated: true, user: decodedUser };
            setJwt(initialState);

        }else{
            const initialState = { isAuthenticated: false, user: {} };
            setJwt(initialState);   

        }
     },[])

    return (
        <MainContext.Provider value={{jwt, setJwt}}>
            {children} 
        </MainContext.Provider>
    ) 
}

export default MainContextProvider