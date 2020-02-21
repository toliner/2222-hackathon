import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import teamData from "../../data/team-data.json";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      textAlign: "center",
      background: "#F3F3F3",
      height: "100%",
      marginTop: 80,
      position: "relative"
    },
    bg: {
      background: "#4B4B4B"
    },
    bottom: {
      display: "flex"
    },
    space: {
      margin: 10
    },
    card: {
      background: "#E1E1E1",
      height: 328,
      width: 328,
      margin: 10,
      display: "inline-block"
    },
    media: {
      height: 136,
      width: 136,
      margin: "auto"
    },
    title: {
      fontSize: 14
    },
    btn: {
      textAlign: "center",
      top: 30,
      position: "relative"
    }
  })
);

export const Team: React.FC<undefined> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid item xs={6} className={classes.paper}>
          <div className={classes.bottom}>
            <Grid item xs>
              {teamData.team?.map(data => (
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h6">{data.teamName}</Typography>
                    <CardMedia
                      className={classes.media}
                      image={data.teamImage}
                    />
                    <Typography variant="body2">
                      {data.teamDescription}
                    </Typography>
                    <Typography className={classes.btn}>
                      <Button variant="contained" color="primary">
                        加入する
                      </Button>
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </div>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
