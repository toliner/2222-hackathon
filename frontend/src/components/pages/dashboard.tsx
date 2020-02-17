import React, { useState } from "react";
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
      position: "relative",
      marginTop: 80
    },
    timeLineBg: {
      background: "#4B4B4B"
    },
    bottom: {
      marginBottom: 25
    }
  })
);

export const Dashboard: React.FC = () => {
  const classes = useStyles();

  // とりあえずローカルステート
  // 後でreduxにする
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.timeLineBg} />
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
        <Grid item xs={3} className={classes.timeLineBg} />
      </Grid>
      {!isLogin && <LoginModal />}
    </div>
  );
};
