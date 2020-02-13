import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Card, CardContent, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            background: '#E1E1E1',
            textAlign: 'left',
        },
        title: {
            fontSize: 14,
        },
    })
)

export const ListCard: React.FC = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h6">タイトル</Typography>
                <Typography variant="body2">内容内容内容</Typography>
            </CardContent>
        </Card>
    )
}