import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Box} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                flexGrow: 1,
            },
            paper: {
                textAlign: 'center',
                background: 'rgba(226, 226, 226, 1)',
                height: '100vh',
            },
            bg: {
                background: 'rgba(75, 75, 75, 1)',
            }
        }
    )
)

export const UserPage: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={3} className={classes.bg}/>
                <Grid item xs={6} className={classes.paper}>
                    <Box>UserPage</Box>
                </Grid>
                <Grid item xs={3} className={classes.bg}/>
            </Grid>
        </div>
    )
}