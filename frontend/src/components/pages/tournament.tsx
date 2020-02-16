import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { TournamentListCard } from "../partials/tournament-list-card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      textAlign: "center",
      background: "#F3F3F3",
      height: "100%",
      marginTop: 80,
      position: "relative"
    },
    bg: {
      background: "#4B4B4B"
    },
    bottom: {
      marginBottom: 10,
      display: "flex"
    },
    space: {
      margin: 10
    },
    left: {
      marginLeft: 10
    }
  })
);

export const Tournament: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid item xs={6} className={classes.paper}>
          <Grid item xs={12} className={classes.space}>
            <Typography variant="h5" align="left">
              開催中の大会
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.space}>
            <TournamentListCard tournamentType="now" />
          </Grid>
          <Grid item xs={12} className={classes.left}>
            <Typography variant="subtitle1" align="left" color="textSecondary">
              開催前
            </Typography>
          </Grid>
          <div className={classes.bottom}>
            <Grid item xs={4} className={classes.space}>
              <TournamentListCard tournamentType="yet" />
            </Grid>
            <Grid item xs={4} className={classes.space}>
              <TournamentListCard tournamentType="yet" />
            </Grid>
            <Grid item xs={4} className={classes.space}>
              <TournamentListCard tournamentType="yet" />
            </Grid>
          </div>
          <div className={classes.bottom}>
            <Grid item xs={4} className={classes.space}>
              <TournamentListCard tournamentType="yet" />
            </Grid>
            <Grid item xs={4} className={classes.space}>
              <TournamentListCard tournamentType="yet" />
            </Grid>
            <Grid item xs={4} className={classes.space}>
              <TournamentListCard tournamentType="yet" />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
