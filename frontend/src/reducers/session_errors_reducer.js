const sessionErrorsReducer = (state, action) => {

  switch (action.type) {
    case "RECEIVE_SESSION_ERRORS":
      return Object.values(action.errors);
    // case "RECEIVE_CURRENT_USER":
    //   return state;
    //! not in store so no need for unmount
    // case "REMOVE_SESSION_ERRORS":
    //   return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;