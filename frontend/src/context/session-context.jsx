//!not using right now since we're not prop drilling

import React, { useReducer, createContext } from "react";
import sessionReducer from '../reducers/session_reducer';

export const SessionContext = createContext();

const initialState = { isAuthenticated: false, user: {} };

const SessionContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  return (
    <SessionContext.Provider value={[state, dispatch]}>
      {children}
    </SessionContext.Provider>
  );
};

// export default SessionContextProvider;
