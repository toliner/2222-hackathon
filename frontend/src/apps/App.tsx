import React from "react";
import { Router } from "../components/router";
import { MenuAppBar } from "../components/common/menu-app-bar";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginModal } from "../components/partials/login-modal";

import "./App.css";

const App = () => {
  // 認証済みかどうかのロジック
  // 認証されていたら /dashboard にリダイレクト
  // されていなかったらこのまま

  // ログインされていない場合loginへ
  // use login state
  const isLogin = useSelector(
    (state: { isLogin: boolean }) => state.isLogin);
  const RequireLoginModal = () => {
    const location = useLocation();
    const path = location.pathname;
    if (!isLogin && ((path !== "/") && (path !== "/login") && (path !== "/confirm") && !path.match("/api/user/"))) {
      return <LoginModal />;
    } else {
      return null;
    }
  }

  // メニューバー出すかどうか
  const MenuBar = () => {
    const location = useLocation();
    const path = location.pathname;
    if (path === "/" || path === "/login" || path === "/confirm" || path.match("/api/user/")) {
      return null;
    } else {
      return <MenuAppBar />;
    }
  };
  return (
    <BrowserRouter>
      <RequireLoginModal />
      <MenuBar />
      <Router />
    </BrowserRouter>
  );
};

export default App;
