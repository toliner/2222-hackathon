import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { useSelector } from "react-redux";

const fetch = window.fetch;

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
      height: 224,
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

export const Login: React.FC = () => {
  const classes = useStyles();
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");

  // ues api_url state
  const api_url = useSelector((state: { APIURL: string }) => state.APIURL);

  const handleMailFormChange = (e: any) => {
    setMail(e.target.value);
  };

  const handleNameFormChange = (e: any) => {
    setName(e.target.value);
  };

  const loginWithMail = async () => {
    if (mail !== "" && api_url !== undefined) {
      console.log(mail);
      const data = {
        mail: mail,
        name: name
      };

      await fetch(`${api_url}/user/register`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
        .then((res: any) => {
          console.log({ res });
          if (res.status === 200) window.location.href = "confirm";
        })
        .catch(console.error);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <form noValidate className={classes.form}>
          <TextField
            InputProps={{
              className: classes.input
            }}
            defaultValue="name"
            onChange={handleNameFormChange}
          />
          <TextField
            InputProps={{
              className: classes.input
            }}
            defaultValue="mail"
            onChange={handleMailFormChange}
          />
          <Button className={classes.btn} onClick={loginWithMail}>
            <p className={classes.login}>ログイン</p>
          </Button>
        </form>
      </div>
    </div>
  );
};
