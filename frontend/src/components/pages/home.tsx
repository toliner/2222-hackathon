import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography, Box } from "@material-ui/core";
import logo from "../../static/logo.png";
import demo from "../../static/demo.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#4B4B4B",
      margin: 0,
      padding: 0,
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },
    paper: {
      textAlign: "center",
      background: "#4B4B4B"
    },
    bottom: {
      marginBottom: 25,
      display: "flex"
    },
    btn: {
      textAlign: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      width: 238,
      height: 64
    },
    link: {
      textDecoration: "none",
      color: "#5D5D5D"
    },
    imageClip: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },
    image: {
      width: 520
    },
    demo: {
      width: 520
    },
    description: {
      color: "#F2F2F2"
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
      window.location.href = "dashboard";
    }
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.paper}>
          <div className={classes.imageClip}>
            <Box boxShadow={4}>
              <img src={demo} alt="logo" className={classes.demo} />
            </Box>
          </div>
          <div className={classes.description}>
            e-Sportsを気軽に楽しめる！
          </div>
        </Grid>
        <Grid item xs={6} className={classes.paper}>
          <div className={classes.imageClip}>
            <img src={logo} alt="logo" className={classes.image} />
          </div>
          <Typography>
            <Button variant="contained" className={classes.btn}>
              <a href="./login" className={classes.link}>
                新規登録
              </a>
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
