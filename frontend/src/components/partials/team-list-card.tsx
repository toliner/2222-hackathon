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
      textAlign: "left",
      height: 300
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

type teamProps = {
  data: any;
};

export const TeamListCard: React.FC<teamProps> = ({ data }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h6">{data.teamName}</Typography>
        <CardMedia className={classes.media} image="icon" />
        <Typography variant="body2">{data.teamDescription}</Typography>
        <Typography className={classes.btn}>
          <Button variant="contained" color="primary">
            加入する
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
};
