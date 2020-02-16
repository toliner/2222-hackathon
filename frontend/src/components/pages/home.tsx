import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#4B4B4B",
      height: "100vh",
        margin: -10,
    },
    paper: {
      textAlign: "center",
      background: "#4B4B4B",
      height: "100%",
      top: "50%",
      position: "relative"
    },
    bottom: {
      marginBottom: 25,
      display: "flex"
    },
    btn: {
      top: 300,
      textAlign: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      width: 238,
      height: 64
    },
    link: {
      textDecoration: "none",
      color: "#5D5D5D",
    }
  })
);

export const Home = () => {
  const classes = useStyles();

  // とりあえずローカルステート、本番は return () のところをrenderさせたくないので別のところでやる
  // 後でreduxで書き換え
  const [isLogin, setIsLogin] = useState(false);

  // ログインしていたら dashboard へ
  useEffect(() => {
    if (isLogin) {
      window.location.href = "dashboard"
    }
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.paper}>フレーズ</Grid>
        <Grid item xs={6} className={classes.paper}>
          <Typography>
            <Button variant="contained" className={classes.btn}>
              <a href="./login" className={classes.link}>新規登録</a>
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
