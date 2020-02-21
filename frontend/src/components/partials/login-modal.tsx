import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: "#FFFFFF",
      width: 366,
      height: 216
    },
    btn: {
      backgroundColor: "#5E5E5E",
      "&:hover": {
        backgroundColor: "#5E5E5E"
      },
      width: 242,
      height: 60,
      position: "relative",
      top: "36%",
      margin: "auto",
      display: "flex"
    },
    login: {
      color: "#FFFFFF",
      position: "relative",
      top: "30%"
    }
  })
);

export const LoginModal = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  const linkToLogin = () => {
    window.location.href = "login";
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Button className={classes.btn}>
              <p 
                className={classes.login}
                onClick={linkToLogin}
              >
                メールでログイン
              </p>
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
