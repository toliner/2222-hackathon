import React from "react";
import { Router } from "../components/router";
import { MenuAppBar } from "../components/common/menu-app-bar";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoginModal } from "../components/partials/login-modal";

import "./App.css";

const RequireLoginModal: React.FC<{ path: string, isLogin: boolean }> = ({ path, isLogin }) => {
  if (
    !isLogin &&
    path !== "/" &&
    path !== "/login" &&
    path !== "/confirm" &&
    !path.match("/api/user/")
  ) {
    return <LoginModal />;
  } else {
    return null;
  }
};

// メニューバー出すかどうか
const MenuBar: React.FC<{ path: string }> = ({ path }) => {
  console.log(path);
  if (
    path === "/" ||
    path === "/login" ||
    path === "/confirm" ||
    path.match("/api/user/")
  ) {
    return null;
  } else if (path.match("dashboard")) {
    return <MenuAppBar />;
  } else {
    return <MenuAppBar />;
  }
};

const App = () => {
  // use login state
  const isLogin = useSelector((state: { isLogin: boolean }) => state.isLogin);

  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      <RequireLoginModal path={path} isLogin={isLogin} />
        <MenuBar path={path} />
      <Router />
    </div>
  );
};

export default App;
