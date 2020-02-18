import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import axios from "../common/axios-setup";

const login_url = process.env.REACT_APP_API_URL;

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
  const [mail, setMail] = useState("");

  const handleMailFormChange = (e: any) => {
    setMail(e.target.value);
  }

  const loginWithMail = () => {
    if (mail !== "" && login_url !== undefined) {
      axios.post(`${login_url}/user/login`, {
        mail: mail
      })
      .then((res:any) => {
        console.log(res);
      })
      .catch((e) => {
        throw e;
      })
      // window.location.href = "dashboard";
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <form noValidate className={classes.form}>
          <TextField
            InputProps={{
              className: classes.input
            }}
            onChange={handleMailFormChange}
          />
          <Button className={classes.btn}>
            <p className={classes.login} onClick={loginWithMail}>ログイン</p>
          </Button>
        </form>
      </div>
    </div>
  );
};
