import React from "react";
import { Button, createStyles, TextField, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

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
      width: 367,
      position: "relative",
      backgroundColor: "rgba(58, 58, 58, 1)",
      textAlign: "center"
    },
    confirm: {
      color: "#FFFFFF",
      textAlign: "center",
      margin: 42,
      paddingTop: 10,
    }
  })
);

export const Confirm: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Typography variant="h6" className={classes.confirm}>
          メールに送付されたリンクから認証を行ってください
        </Typography>
      </div>
    </div>
  );
};
