import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { UserPage } from "./pages/user-page";
import { Team } from "./pages/team";
import { Tournament } from "./pages/tournament";

export const Router: React.SFC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/user" component={UserPage} />
        <Route exact path="/tournament" component={Tournament} />
        <Route exact path="/team" component={Team} />
      </Switch>
    </BrowserRouter>
  );
};
