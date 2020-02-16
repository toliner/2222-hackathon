import React from "react";
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
      color: "#5D5D5D",
      borderRadius: 30,
      width: 238,
      height: 64
    }
  })
);

export const SignInPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} className={classes.paper}>フレーズ</Grid>
        <Grid item xs={6} className={classes.paper}>
          <Typography>
            <Button variant="contained" className={classes.btn}>
              新規登録
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
