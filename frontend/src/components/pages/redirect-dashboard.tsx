import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const fetch = window.fetch;
const api_url = process.env.REACT_APP_API_URL;

export const RedirectDashboard = () => {
  // use login state
  const isLogin = useSelector(
    (state: { isLogin: boolean }) => state.isLogin);

  // get token
  const tokenPath = window.location.search.substring(1);
  const token = tokenPath.split("=")[1];

  const sendToken = async () => {
    // login
    // send token
    const data = {
      name: token
    };
    if (!isLogin) {
      console.log(token);
      await fetch(`${api_url}/user/verification?name=${token}`)
        .then((res: any) => {
          console.log({ res });
          if (res.status === 200) window.location.href = "dashboard";
        })
        .catch(console.error);
    }
  }
  useEffect(() => {
    sendToken();
  }, [])
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
}