import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Button, Card, CardContent, CardMedia, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import tournamentData from "../../data/tournament-data.json";

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
      marginBottom: 10,
      display: "flex"
    },
    space: {
      margin: 10
    },
    left: {
      marginLeft: 10
    },
    top: {
      background: "#E1E1E1",
      textAlign: "left",
      display: "inline-block",
      width: 688,
      height: 424
    },
    card: {
      background: "#E1E1E1",
      textAlign: "left",
      margin: 10,
      display: "inline-block",
      width: 208,
      height: 248
    },
    media: {
      width: 496,
      height: 312,
      margin: "auto",
      marginTop: 10,
      marginBottom: 10
    },
    btn: {
      textAlign: "center",
      marginTop: 20
    },
    cardMedia: {
      width: 176,
      height: 120,
      margin: "auto",
      marginTop: 10,
      marginBottom: 10
    },
    title: {
      fontSize: "0.9rem"
    },
    date: {
      fontSize: 1
    }
  })
);

export const Tournament: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3} className={classes.bg} />
        <Grid item xs={6} className={classes.paper}>
          <Grid item xs={12} className={classes.space}>
            <Typography variant="h5" align="left">
              開催中の大会
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.space}>
            {tournamentData.tournament?.map(data => (
              <Card className={classes.top}>
                <CardContent>
                  <Typography variant="h6">{data.tournamentTitle}</Typography>
                  <CardMedia
                    className={classes.media}
                    image={data.tournamentImage}
                  />
                  <Typography variant="subtitle2" color="textSecondary">
                    {data.tournamentDate}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid item xs={12} className={classes.space}>
            <Typography variant="h5" align="left">
              開催前の大会
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.space}>
            {tournamentData.tournament?.map(data => (
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h6" className={classes.title}>
                    {data.tournamentTitle.substr(0, 11)}...
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    className={classes.date}
                  >
                    {data.tournamentDate}
                  </Typography>
                  <CardMedia
                    className={classes.cardMedia}
                    image={data.tournamentImage}
                  />
                  <Typography className={classes.btn}>
                    <Button variant="contained" color="primary">
                      加入する
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.bg} />
      </Grid>
    </div>
  );
};
