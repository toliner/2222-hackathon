import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateIsLogin } from "../../store/Actions";
import { useHistory } from "react-router-dom";

const fetch = window.fetch;

export const RedirectDashboard = () => {
  // use login state
  const isLogin = useSelector((state: { isLogin: boolean }) => state.isLogin);

  // ues api_url state
  const api_url = useSelector((state: { APIURL: string }) => state.APIURL);

  // get token
  const tokenPath = window.location.search.substring(1);
  const token = tokenPath.split("=")[1];

  // use reducer
  const updateIsLogin = useUpdateIsLogin();

  const history = useHistory();

  const sendToken = async () => {
    // login
    // send token
    if (!isLogin) {
      console.log(token);
      await fetch(`${api_url}/user/verification?token=${token}`)
        .then((res: any) => {
          console.log({ res });
          if (res.status === 200) {
            updateIsLogin("login");

            history.push(`/dashboard?token=${token}`);
          }
        })
        .catch(console.error);
    }
  };
  useEffect(() => {
    sendToken();
  }, []);
  return (
    <div>
      <p>processing...</p>
      <p>
        画面が切り替わらない場合は
        <a href="/login">こちら</a>
        で再度ログインしてください
      </p>
    </div>
  );
};
