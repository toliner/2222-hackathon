import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./pages/home";
import { User } from "./pages/user";
import { Team } from "./pages/team";
import { Tournament } from "./pages/tournament";
import { CreateTournament } from "./pages/create-tournament";
import { TournamentDetail } from "./pages/tournament-detail";
import { Login } from "./pages/login";
import { TeamDetail } from "./pages/team-detail";
import { SignInPage } from "./pages/sign-in-page";
import { CreateTeam } from "./pages/create-team";

export const Router: React.SFC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/sign-in" component={SignInPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Home} />
        <Route exact path="/user" component={User} />
        <Route exact path="/tournament" component={Tournament} />
        <Route exact path="/tournament/:id" component={TournamentDetail} />
        <Route exact path="/team" component={Team} />
        <Route exact path="/team/:id" component={TeamDetail} />
        <Route exact path="/create-tournament" component={CreateTournament} />
        <Route exact path="/create-team" component={CreateTeam} />
      </Switch>
    </BrowserRouter>
  );
};
