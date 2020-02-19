import React, { useState, useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography, Box } from "@material-ui/core";
import logo from "../../static/logo.png";
import demo from "../../static/demo.jpg";
import { VFXProvider, VFXImg } from "react-vfx";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: "#4B4B4B",
      margin: 0,
      padding: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden"
    },
    wrap: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap"
    },
    paper: {
      width: 400,
      background: "#4B4B4B",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      margin: "2vw" // これだいぶゴリってるのでたまたま
    },
    bottom: {
      display: "flex"
    },
    btn: {
      textAlign: "center",
      backgroundColor: "#FFFFFF",
      borderRadius: 30,
      width: "80vw",
      maxWidth: 240,
      height: 64,
      marginTop: 16
    },
    link: {
      textDecoration: "none",
      color: "#5D5D5D"
    },
    imageWrap: {
      width: "90vw",
      maxWidth: 400,
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    logo: {
      width: "90vw",
      maxWidth: 400
    },
    demo: {
      width: "90vw",
      maxWidth: 400
    },
    description: {
      color: "#F2F2F2",
      fontSize: 20,
      textAlign: "center"
    },
    subDescription: {
      color: "#F2F2F2",
      textAlign: "center",
      fontSize: 14,
      marginBottom: 40,
      lineHeight: 1
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
        <div className={classes.wrap}>
          <div className={classes.paper}>
            <div className={classes.imageWrap}>
              <Box boxShadow={4}>
                <img src={demo} alt="logo" className={classes.demo} />
              </Box>
            </div>
            <div className={classes.wrap}>
              <p className={classes.description}>
                もっとe-Sportsを気軽に楽しめる！
              </p>
              <div className={classes.subDescription}>
                <p>チーム作成, 大会作成・参加</p>
                <p>大会トーナメント機能</p>
                <p>動向を追いやすいタイムライン</p>
              </div>
            </div>
          </div>
          <div className={classes.paper}>
            <div className={classes.imageWrap}>
              <VFXProvider>
                <VFXImg src={logo} alt="logo" shader="rgbShift" className={classes.logo} />
              </VFXProvider>
            </div>
            <Typography>
              <Button variant="contained" className={classes.btn}>
                <a href="./login" className={classes.link}>
                  新規登録
                </a>
              </Button>
            </Typography>
          </div>
        </div>
      </Grid>
    </div>
  );
};
