const sessionReducer = (state, action) => {
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

export default sessionReducer;