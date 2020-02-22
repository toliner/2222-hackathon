import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import logo from "../../static/logo.png";
import { useUpdateIsLogin } from "../../store/Actions";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    appBar: {
      backgroundColor: "#3A3A3A"
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center"
    },
    subtitle: {
      color: "#979797",
      marginLeft: 15
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "#3A3A3A",
      color: "#FFFFFF"
    },
    drawerItem: {
      display: "block"
    },
    closeBtn: {
      float: "right",
      color: "#FFFFFF"
    },
    link: {
      color: "#FFFFFF"
    },
    logoImg: {
      height: 32
    }
  })
);

const navListTop = [
  {
    name: " + TOURNAMENT",
    path: "/create-tournament"
  },
  {
    name: " + TEAM",
    path: "/create-team"
  }
];

const navListBottom = [
  {
    name: " # DASHBOARD",
    path: "/dashboard"
  },
  {
    name: " # TEAM",
    path: "/team"
  },
  {
    name: "# TOURNAMENT",
    path: "/tournament"
  }
];

const PopupMenu: React.FC<{ history: any }> = ({ history }) => {
  const linkTo = (path: string) => {
    history.push(path);
  };
  const logout = () => {
    // 状態更新してログアウト扱いにする
    // updateIsLogin("logout");
    // ログインページ送り
    linkTo("/login");
  };
  return (
    <div>
      <MenuItem onClick={() => linkTo("/user")}>Setting</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </div>
  );
};

export const MenuAppBar: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);
  const token = useSelector((state: { token: string }) => state.token);

  const history = useHistory();

  // use reducer
  const updateIsLogin = useUpdateIsLogin();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);

  const LinkLists: React.FC = () => {
    const linkToPath = (path: string) => {
      history.push(`${path}`);
    };
    return (
      <div>
        <Typography variant="subtitle2" className={classes.subtitle}>
          create
        </Typography>
        <List>
          {navListTop.map((text, index) => (
            <ListItem button key={index} className={classes.drawerItem}>
              <div
                onClick={() => linkToPath(text.path)}
                className={classes.link}
              >
                <ListItemText primary={text.name} />
              </div>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle2" className={classes.subtitle}>
          channel
        </Typography>
        <List>
          {navListBottom.map((text, index) => (
            <ListItem button key={index} className={classes.drawerItem}>
              <div
                onClick={() => linkToPath(text.path)}
                className={classes.link}
              >
                <ListItemText primary={text.name} />
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img src={logo} alt="logo" className={classes.logoImg} />
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <Router>
                <PopupMenu history={history} />
              </Router>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div>
          <IconButton onClick={handleDrawerClose} className={classes.closeBtn}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Router>
          <LinkLists />
        </Router>
      </Drawer>
    </div>
  );
};
