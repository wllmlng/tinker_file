import React, { useReducer, createContext } from "react";

export const SessionContext = createContext();


const reducer = (state, action) => {
  switch (action.type) {
    case "RECEIVE_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case "RECEIVE_USER_SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        isAuthenticated: !!action.currentUser,
        user: action.currentUser
      };
    case "RECEIVE_USER_LOGOUT":
      return {
        isAuthenticated: false,
        user: undefined
      };
    default:
      return state;
  }
};

const initialState = { isAuthenticated: false, user: {} };

const SessionContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SessionContext.Provider value={[state, dispatch]}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
