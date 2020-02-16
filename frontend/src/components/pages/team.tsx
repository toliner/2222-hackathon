import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { TeamListCard } from "../partials/team-list-card";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: 0,
      width: "100vw",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
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
      display: "flex"
    },
    space: {
      margin: 10
    }
  })
);

export const Team: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid item xs={6} className={classes.paper}>
          <div className={classes.bottom}>
            <Grid item xs={6} className={classes.space}>
              <TeamListCard />
            </Grid>
            <Grid item xs={6} className={classes.space}>
              <TeamListCard />
            </Grid>
          </div>
          <div className={classes.bottom}>
            <Grid item xs={6} className={classes.space}>
              <TeamListCard />
            </Grid>
            <Grid item xs={6} className={classes.space}>
              <TeamListCard />
            </Grid>
          </div>
          <div className={classes.bottom}>
            <Grid item xs={6} className={classes.space}>
              <TeamListCard />
            </Grid>
            <Grid item xs={6} className={classes.space}>
              <TeamListCard />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
