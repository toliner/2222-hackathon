import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, ButtonBase, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: "rgba(226, 226, 226, 1)",
      width: "100vw",
      height: "100vh"
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 400,
      height: 400,
      top: 200,
      position: "relative",
      backgroundColor: "rgba(58, 58, 58, 1)"
    },
    item: {
      textAlign: "center",
      width: "100%",
      height: "100px"
    },
    img: {
      margin: "auto",
      display: "block",
      width: 60,
      height: 60
    }
  })
);

export const User: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.item}>
            <Avatar className={classes.img} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="subtitle1">UserID</Typography>
                <Typography variant="subtitle1">UserName</Typography>
                <Typography variant="subtitle1">UserProfile</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
