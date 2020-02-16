import React from "react";
import { Router } from "../components/router";
import { MenuAppBar } from "../components/common/menu-app-bar";
import { BrowserRouter, useLocation } from "react-router-dom";

import "./App.css"

const App = () => {
  // 認証済みかどうかのロジック
  // 認証されていたら /dashboard にリダイレクト
  // されていなかったらこのまま

  // メニューバー出すかどうか
  const MenuBar = () => {
    const location = useLocation();
    const path = location.pathname;
    if (path === "/" || path === "/login") {
      return null;
    } else {
      return <MenuAppBar />;
    }
  }
  return (
    <BrowserRouter>
      <MenuBar />
      <Router />
    </BrowserRouter>
  );
};

export default App;
