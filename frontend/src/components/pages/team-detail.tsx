import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Avatar, Grid, Paper, TextField } from "@material-ui/core";
import { useLocation } from "react-router";
import teamData from "../../data/team-data.json";

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
      maxWidth: 366,
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
      marginBottom: 20,
      padding: 0
    },
    form: {
      display: "grid"
    },
    btnColor: {
      backgroundColor: "#48BB35",
      color: "#FFFFFF"
    }
  })
);

export const TeamDetail: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();

  const path = location.pathname;
  const page = path.split("/")[2];
  const pageNumber = parseInt(page, 10);

  const Item = () => {
    let displayTeamImage = "";

    teamData.team.map((data: any) => {
      if (pageNumber === parseInt(data.teamId)) {
        displayTeamImage = data.teamImage;
      }
    });
    return <Avatar className={classes.img} src={displayTeamImage} />;
  };

  const TeamName = () => {
    let displayTeamName = "";

    teamData.team.map((data: any) => {
      if (pageNumber === parseInt(data.teamId)) {
        displayTeamName = data.teamName;
      }
    });
    return (
      <TextField
        defaultValue={displayTeamName}
        InputProps={{
          className: classes.input,
          readOnly: true
        }}
      />
    );
  };

  const TeamDescription = () => {
    let displayTeamDescription = "";

    teamData.team.map((data: any) => {
      if (pageNumber === parseInt(data.teamId)) {
        displayTeamDescription = data.teamDescription;
      }
    });
    return (
      <TextField
        defaultValue={displayTeamDescription}
        multiline
        rows="6"
        InputProps={{
          className: classes.input,
          readOnly: true
        }}
      />
    );
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item className={classes.item}>
            <Item />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column">
              <form noValidate className={classes.form}>
                <TeamName />
                <TeamDescription />
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
