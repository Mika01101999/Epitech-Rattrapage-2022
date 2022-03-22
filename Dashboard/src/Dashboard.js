import React, { useState } from "react";
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import logo from '../src/assets/dashboard-2.svg';
import firebase from "firebase/compat/app"
import { app } from "./firebaseConfig";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, ThemeProvider, createMuiTheme } from "@material-ui/core";
import Content from "./Content";
import "./styles.css";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const logout = async () => {
    firebase.auth().signOut()
    window.location.href = "/login"
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light"
    }
  });

  app.auth().onAuthStateChanged(auth_user => {
    setUser(auth_user);
  });


  if (user) {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Container >
            <Navbar.Brand href="/" className="navbar">
              <img
                className="nav"
                src={logo}
                width="30"
                height="30"
                alt="Logo for the navbar"
              />{' '}
              Dashboard
            </Navbar.Brand>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <ThemeProvider theme={theme}>
          <div className={classes.root}>
            <CssBaseline />

            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open
              })}
            >
              <div className={classes.drawerHeader} />
              <Content />
            </main>
          </div>
        </ThemeProvider>
      </>
    )
  } else {
    return(
      <>
      <p>Pas connecté</p> 
      <div>
        <Button variant="outline-primary" href="login" >Login</Button>{' '}
      </div>
      </>
    )
  }
}