import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {Button, Card, CardContent, CardMedia, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            background: "#E1E1E1",
            textAlign: "left",
            height: 220,
        },
        media: {
            height: 140,
        },
        title: {
            fontSize: 14,
        },
        btn:{
            textAlign: "center",
            marginTop: 20,
        }
    })
);

export const TournamentListCard: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6">開催中の大会</Typography>
                <Typography variant="subtitle2">2020/02/22 10:00 ~ </Typography>
                <CardMedia
                    className={classes.media}
                    image="icon"
                />
            </CardContent>
        </Card>
    );
};
