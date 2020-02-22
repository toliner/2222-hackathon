const token = localStorage.getItem("userToken") || new URL(window.location.href).searchParams.get("token");
if (token !== null) {
  localStorage.setItem("userToken", token);
}

const initState = {
  APIURL: "https://api.2222.reiwa.app/api",
  isLogin: false,
  token: token
};

const reducer = (state = initState, action: { type: string, payload: string }) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLogin: state.isLogin = true };
    case "LOGOUT":
      return { ...state, isLogin: state.isLogin = false };
    default:
      return state;
  }
};

export default reducer;
