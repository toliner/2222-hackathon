import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import tournamentData from "../../data/tournament-data.json";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignContent: "center"
    },
    paper: {
      background: "#F3F3F3",
      position: "relative"
    },
    bg: {
      background: "#4B4B4B",
      height: 900
    },
    bottom: {
      marginBottom: 10,
      display: "flex"
    },
    list: {
      position: "relative",
      background: "#F3F3F3",
      height: 232,
      top: 80
    },
    media: {
      padding: 0
    }
  })
);

export const TournamentDetail = () => {
  const classes = useStyles();
  const location = useLocation();

  const path = location.pathname;
  const page = path.split("/")[2];
  const pageNumber = parseInt(page, 10);

  const TournamentCard = () => {
    let displayTournamentTitle = "";
    let displayTournamentDate = "";
    let displayTournamentImage = "";
    let displayTournamentDescription = "";

    tournamentData.tournament.map((data: any) => {
      if (pageNumber === parseInt(data.tournamentId)) {
        displayTournamentTitle = data.tournamentTitle;
        displayTournamentDate = data.tournamentDate;
        displayTournamentImage = data.tournamentImage;
        displayTournamentDescription = data.tournamentDescription;
      }
    });
    return (
      <CardContent>
        <Typography variant="h6">{displayTournamentTitle}</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {displayTournamentDate}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {displayTournamentDescription}
        </Typography>
        <CardMedia className={classes.media} image={displayTournamentImage} />
      </CardContent>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid item xs={6} className={classes.paper}>
          <div className={classes.list}>
            <TournamentCard />
          </div>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
