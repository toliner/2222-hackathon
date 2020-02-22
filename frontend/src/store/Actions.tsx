import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useUpdateToken = () => {
  const dispatch = useDispatch();
  const updateToken = useCallback(
    (param: string) => {
      dispatch({ type: `${param}` });
    },
    [dispatch]
  );
  return updateToken;
};

export const useUpdateIsLogin = () => {
  const dispatch = useDispatch();
  const updateIsLogin = useCallback(
    (params: "login" | "logout") => {
      switch (params) {
        case "login":
          dispatch({ type: "LOGIN" });
          break;
        case "logout":
          dispatch({ type: "LOGOUT" });
          break;
        default:
          dispatch({ type: "" });
      }
    },
    [dispatch]
  );
  return updateIsLogin;
};
