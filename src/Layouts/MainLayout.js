import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Slide from "@material-ui/core/Slide";
import MenuBar from "../components/MenuBar/MenuBar";
import SearchBar from "../components/SearchBar/SearchBar";
import { makeStyles, useTheme } from "@material-ui/core";
import { NavLink, useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    minHeight: "100vh",
    position: "relative",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  navContent: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    backgroundColor: "#2f363d",
    borderBottom: "3px solid #e7315d",
  },
  main: {
    backgroundColor: "#ecebeb",
    marginTop: 90,
    padding: 10,
  },
  addBtn: {
    position: "fixed",
    top: "50%",
    right: 15,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function MainLayout(props) {
  const classes = useStyles();

  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <MenuBar />
            <div className={classes.navContent}>
              <Typography className={classes.logo} variant="h6">
                <NavLink
                  style={{ textDecoration: "none", color: "#fff" }}
                  to="/"
                >
                  TechnoStore
                </NavLink>
              </Typography>
              <SearchBar />
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <main className={classes.main}>
        {props.children}
        <Fab
          onClick={() => history.push("/products/create")}
          className={classes.addBtn}
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </main>
    </React.Fragment>
  );
}
