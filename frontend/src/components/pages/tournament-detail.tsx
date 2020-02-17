import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { TournamentListCard } from "../partials/tournament-list-card";


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
      textAlign: "center",
      background: "#F3F3F3",
      marignTop: 128,
      position: "relative"
    },
    bg: {
      background: "#4B4B4B"
    },
    bottom: {
      marginBottom: 10,
      display: "flex"
    },
    btn: {
      width: 48,
      height: 24,
      padding: 0,
      fontSize: 10,
    },
    tournament: {
      width: 752,
      height: 536
    },
    btnGroup8: {
      display: "grid",
        position: "absolute",
        left: "10%"
    },
    btnGroup4: {
      display: "grid",
        position: "absolute",
        left: "35%",
    },
    btnGroup2: {
      display: "grid",
        position: "absolute",
        left: "60%",
    },
    btnGroup1: {
      display: "grid",
        position: "absolute",
        left: "80%",
    },
      btn8:{
          marginTop: 40,
      },
      btn4:{
          marginTop: 90,
      },
      btn2:{
          marginTop: 170,
      },
      btn1:{
          marginTop: 270,
      },
      list: {
        position: "relative",
          top:570,
      },
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
        <Grid item xs={6} className={classes.paper}>
          <Grid item xs={12} className={classes.tournament}>
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
              <div className={classes.list}>
              <TournamentListCard tournamentType="now"  />
              </div>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
