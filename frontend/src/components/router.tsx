import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { User } from "./pages/user";
import { Team } from "./pages/team";
import { Tournament } from "./pages/tournament";
import { CreateTournament } from "./pages/create-tournament";
import { TournamentDetail } from "./pages/tournament-detail";
import { Login } from "./pages/login";
import { TeamDetail } from "./pages/team-detail";
import { CreateTeam } from "./pages/create-team";
import { Home } from "./pages/home";
import { Confirm } from "./pages/confirm";

export const Router: React.SFC = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/confirm" component={Confirm} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/user" component={User} />
          <Route exact path="/tournament" component={Tournament} />
          <Route path="/tournament/:id" component={TournamentDetail} />
          <Route exact path="/team" component={Team} />
          <Route path="/team/:id" component={TeamDetail} />
          <Route exact path="/create-tournament" component={CreateTournament} />
          <Route exact path="/create-team" component={CreateTeam} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};
