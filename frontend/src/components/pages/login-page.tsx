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

export const LoginPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            login
        </div>
    )
}