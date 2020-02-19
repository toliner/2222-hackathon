import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Button,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";

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
      height: "100vw"
    },
    bottom: {
      marginBottom: 10,
      display: "flex"
    },
    btn: {
      width: 48,
      height: 24,
      padding: 0,
      fontSize: 10
    },
    tournament: {
      top: 50,
      position: "relative"
    },
    btnGroup8: {
      display: "grid",
      position: "absolute",
      left: "10%"
    },
    btnGroup4: {
      display: "grid",
      position: "absolute",
      left: "35%"
    },
    btnGroup2: {
      display: "grid",
      position: "absolute",
      left: "60%"
    },
    btnGroup1: {
      display: "grid",
      position: "absolute",
      left: "80%"
    },
    btn8: {
      marginTop: 35
    },
    btn4: {
      marginTop: 83
    },
    btn2: {
      marginTop: 155
    },
    btn1: {
      marginTop: 250
    },
    list: {
      position: "relative",
      top: 550,
      background: "#F3F3F3",
      height: 232
    },
    media: {
      padding: 0
    },
    vertical: {
      border: "solid #666666",
      borderWidth: "1px 1px 1px 0px",
      position: "absolute"
    },
    vertical1: {
      top: 50,
      width: 95,
      height: 50,
      left: 150
    },
    vertical2: {
      top: 170,
      width: 95,
      left: 150,
      height: 50
    },
    vertical3: {
      top: 285,
      width: 95,
      height: 50,
      left: 150
    },
    vertical4: {
      top: 405,
      width: 95,
      height: 50,
      left: 150
    },
    vertical5: {
      top: 100,
      width: 100,
      height: 100,
      left: 330
    },
    vertical6: {
      top: 310,
      width: 100,
      height: 100,
      left: 330
    },
    vertical7: {
      top: 170,
      width: 70,
      height: 170,
      right: 150
    }
  })
);

const buttonList8 = [
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  }
];

const buttonList4 = [
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  }
];

const buttonList2 = [
  {
    href: "#contained-buttons",
    name: "チーム名"
  },
  {
    href: "#contained-buttons",
    name: "チーム名"
  }
];

const buttonList1 = [
  {
    href: "#contained-buttons",
    name: "チーム名"
  }
];

export const TournamentDetail = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid xs={6} className={classes.paper}>
          <Grid item xs={12} className={classes.tournament}>
            <div className={classes.vertical1 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.vertical2 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.vertical3 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.vertical4 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.btnGroup8}>
              {buttonList8.map((text, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  href={text.href}
                  className={classes.btn8 + " " + classes.btn}
                >
                  {text.name}
                </Button>
              ))}
            </div>
            <div className={classes.vertical5 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.vertical6 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.btnGroup4}>
              {buttonList4.map((text, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  href={text.href}
                  className={classes.btn4 + " " + classes.btn}
                >
                  {text.name}
                </Button>
              ))}
            </div>
            <div className={classes.vertical7 + " " + classes.vertical}>
              <table />
            </div>
            <div className={classes.btnGroup2}>
              {buttonList2.map((text, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  href={text.href}
                  className={classes.btn2 + " " + classes.btn}
                >
                  {text.name}
                </Button>
              ))}
            </div>
            <div className={classes.btnGroup1}>
              {buttonList1.map((text, index) => (
                <Button
                  key={index}
                  variant="contained"
                  color="primary"
                  href={text.href}
                  className={classes.btn1 + " " + classes.btn}
                >
                  {text.name}
                </Button>
              ))}
            </div>
          </Grid>
          <div className={classes.list}>
            <CardContent>
              <Typography variant="h6">大会名</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                2020/02/22 10:00 ~
              </Typography>
              <CardMedia className={classes.media} image="icon" />
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
