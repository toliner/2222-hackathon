import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      background: "#E1E1E1",
      textAlign: "left"
    },
    media: {
      height: 140
    },
    title: {
      fontSize: 14
    },
    btn: {
      textAlign: "center",
      marginTop: 20
    }
  })
);

type tournamentProps = {
  tournamentType: string;
};

export const TournamentListCard: React.FC<tournamentProps> = ({
  tournamentType
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">大会名</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          2020/02/22 10:00 ~{" "}
        </Typography>
        <CardMedia className={classes.media} image="icon" />
        <Typography className={classes.btn}>
          {tournamentType === "yet" && (
            <Button variant="contained" color="primary">
              加入する
            </Button>
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
