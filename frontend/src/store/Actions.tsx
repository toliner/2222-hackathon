import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

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