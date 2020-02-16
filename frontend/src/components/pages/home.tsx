import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { LoginModal } from "../partials/login-modal";
import { ListCard } from "../partials/list-card";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      textAlign: "center",
      background: "#F3F3F3",
      height: "100vh",
      top: 68,
      position: "relative"
    },
    bg: {
      background: "#4B4B4B"
    },
    bottom: {
      marginBottom: 25
    }
  })
);

export const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid item xs={6} className={classes.paper}>
          <div className={classes.bottom}>
            <ListCard />
          </div>
          <div className={classes.bottom}>
            <ListCard />
          </div>
          <div className={classes.bottom}>
            <ListCard />
          </div>
          <div className={classes.bottom}>
            <ListCard />
          </div>
          <div className={classes.bottom}>
            <ListCard />
          </div>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
      <LoginModal />
    </div>
  );
};
