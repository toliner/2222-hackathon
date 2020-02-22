const initState = {
  APIURL: "https://api.2222.reiwa.app/api",
  isLogin: false,
  token: ""
};

const reducer = (state = initState, action: { type: string, payload: string }) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: state.isLogin = true };
    case "LOGOUT":
      return { ...state, isLogin: state.isLogin = false };
    case "UPDATE_TOKEN":
      return { ...state, token: state.token = action.payload };
    default:
      return state;
  }
};

export default reducer;
