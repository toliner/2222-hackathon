import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import { LoginModal } from "../partials/login-modal";
import information from "../../data/information.json";

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
    },
      card: {
          background: "#E1E1E1",
          textAlign: "left",
          margin: 10,
      },
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
              {information.information?.map(data => (
              <Card className={classes.card}>
                  <CardContent>
                      <Typography variant="h6">{data.informationName}</Typography>
                      <Typography variant="body2">{data.informationDescription}</Typography>
                  </CardContent>
              </Card>
              ))}
          </div>
        </Grid>
        <Grid item xs={3} className={classes.timeLineBg} />
      </Grid>
      {!isLogin && <LoginModal />}
    </div>
  );
};
