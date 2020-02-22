import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import { useSelector } from "react-redux";

const fetch = window.fetch;

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
    btn: {
      textAlign: "center"
    },
    btnColor: {
      backgroundColor: "#48BB35",
      color: "#FFFFFF"
    }
  })
);

export const CreateTeam: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleNameFormChange = (e: any) => {
    setName(e.target.value);
  };

  const handleTeamProfileChange = (e: any) => {
    setBio(e.target.value);
  };

  const api_url = useSelector((state: { APIURL: string }) => state.APIURL);

  const onSubmit = async () => {
    if (name !== "" && api_url !== undefined) {
      const data = {
        name: name,
        bio: bio
      };

      await fetch(`${api_url}/team/create`, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          "X-2222AccessToken": "X-2222AccessToken"
        }
      })
        .then((res: any) => {
          console.log({ res });
          if (res.status === 200) window.location.href = "team";
        })
        .catch(console.error);
    }
  };

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
                      placeholder="TeamName"
                    InputProps={{
                      className: classes.input
                    }}
                  />
                  <TextField
                      placeholder="TeamUserName"
                    InputProps={{
                      className: classes.input
                    }}
                    onChange={handleNameFormChange}
                  />
                  <TextField
                      placeholder="TeamProfile"
                    multiline
                    rows="6"
                    InputProps={{
                      className: classes.input
                    }}
                    onChange={handleTeamProfileChange}
                  />
                </form>
              </Grid>
              <Typography className={classes.btn}>
                <Button
                  variant="contained"
                  className={classes.btnColor}
                  onClick={() => onSubmit()}
                >
                  作成
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
