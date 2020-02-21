const initState = {
  isLogin: false
};

const reducer = (state = initState, action: { type: string }) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: state.isLogin = true };
    case "LOGOUT":
      return { ...state, isLogin: state.isLogin = false };
    default:
      return state;
  };
};

export default reducer;