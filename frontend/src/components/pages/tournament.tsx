import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,
            },
        }
    )
)

export const Tournament: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            tournament
        </div>
    )
}