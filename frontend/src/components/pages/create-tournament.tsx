import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";

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
      top: 200,
      position: "relative",
      backgroundColor: "rgba(58, 58, 58, 1)",
      textAlign: "center"
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
    },
    input: {
      backgroundColor: "white",
      "&:hover": {
        backgroundColor: "white"
      },
      width: "100%",
      marginBottom: 10,
      padding: 0
    },
    form: {
      display: "grid"
    },
    btn: {
      textAlign: "center",
      marginTop: 20
    },
    btnColor: {
      backgroundColor: "#48BB35",
      color: "#FFFFFF"
    }
  })
);

export const CreateTournament: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.item}>
            <Avatar className={classes.img} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <Grid item xs>
                <form noValidate className={classes.form}>
                  <TextField
                    label="UserID"
                    defaultValue="UserID"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
                    label="UserName"
                    defaultValue="UserName"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
                    label="UserProfile"
                    defaultValue="UserProfile"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
                    label="UserTeam"
                    defaultValue="UserTeam"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
                    label="Profile"
                    defaultValue="Profile"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                </form>
              </Grid>
              <Typography className={classes.btn}>
                <Button variant="contained" className={classes.btnColor}>
                  更新
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
