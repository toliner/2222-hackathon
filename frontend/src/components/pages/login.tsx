import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    paper: {
      margin: "auto",
      height: 168,
      width: 366,
      position: "relative",
      backgroundColor: "rgba(58, 58, 58, 1)",
      textAlign: "center"
    },
    btn: {
      backgroundColor: "#5E5E5E",
      width: 80,
      height: 32,
      "&:hover": {
        backgroundColor: "#5E5E5E"
      },
      position: "relative",
      top: "100%",
      margin: "auto",
      marginTop: 32
    },
    form: {
      position: "relative"
    },
    login: {
      color: "#FFFFFF",
      position: "relative",
      margin: 0
    },
    input: {
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "white"
      },
      width: 304,
      height: 32,
      margin: "auto",
      marginTop: 32
    }
  })
);

export const Login = () => {
  const classes = useStyles();

  const login = () => {
    window.location.href = "dashboard";
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <form noValidate className={classes.form}>
          <TextField
            defaultValue="mail"
            InputProps={{
              className: classes.input
            }}
          />
          <Button className={classes.btn}>
            <p className={classes.login} onClick={login}>ログイン</p>
          </Button>
        </form>
      </div>
    </div>
  );
};
