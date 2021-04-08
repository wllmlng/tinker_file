// //!not using right now since we're not prop drilling

// import React, { useReducer, createContext, useContext, useEffect } from "react";
// import sessionReducer from '../reducers/session_reducer';
// import {MainContext} from './main-context';

// export const SessionContext = createContext();

// // const initialState = { isAuthenticated: false, user: {} };

// const SessionContextProvider = ({children}) => {
//   const {jwt, setJwt} = useContext(MainContext);
//   const [state, dispatch] = useReducer(sessionReducer, jwt);

//   useEffect(() => {


//   },[jwt])

//   return (
//     <SessionContext.Provider value={[state, dispatch]}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export default SessionContextProvider;
