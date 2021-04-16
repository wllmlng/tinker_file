import React, {useState, useEffect, useReducer} from "react";
import { setAuthToken } from "../util/session_api_util";
import jwt_decode from 'jwt-decode';
import sessionReducer from '../reducers/session_reducer';

export const MainContext = React.createContext();

const MainContextProvider = ({children}) => {
     const [jwt, setJwt] = useState('');
     const [isLoading, setLoading] = useState(true);
     const [state, dispatch] = useReducer(sessionReducer, jwt);


     useEffect(() => {
        if(localStorage.jwtToken){
            setAuthToken(localStorage.jwtToken);
            const decodedUser = jwt_decode(localStorage.jwtToken);
            const initialState = { isAuthenticated: true, user: decodedUser };
            setJwt(initialState);
            setLoading(false);

            //timer till auto logout
            const currentTime = Date.now() / 1000;
            if (decodedUser.exp < currentTime) {
                localStorage.removeItem('jwtToken')
                setAuthToken(false) 
                dispatch({
                    type: "RECEIVE_USER_LOGOUT"
                }); 
            }

        }else{
            const initialState = { isAuthenticated: false, user: {} };
            setJwt(initialState);   
            setLoading(false);

        }
     },[])

    return (
        <MainContext.Provider value={{jwt, setJwt, isLoading}}>
            {children} 
        </MainContext.Provider>
    ) 
}

export default MainContextProvider