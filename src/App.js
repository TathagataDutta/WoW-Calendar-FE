import './App.css';
import AuthComponent from "./components/AuthComponent/AuthComponent";
import {Switch, Route, Redirect, useHistory} from "react-router-dom";
import Home from "./components/HomeComponent/Home";
import {useUserContext} from "./context/userContext/UserContext";
import LoadingComponent from "./components/LoadingComponent/LoadingComponent";
import {AUTH_ROUTE, DASHBOARD_ROUTE, SETTINGS_ROUTE} from "./util/StringUtil";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from "@material-ui/core/AppBar";
import React, {useState} from "react";
import BackdropComponent from "./components/BackdropComponent/BackdropComponent";
import {makeStyles} from "@material-ui/core/styles";
import SettingsComponent from "./components/settingsComponent/SettingsComponent";
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const App = () => {
    const classes = useStyles();

    const {user, logout} = useUserContext();
    const history = useHistory();

    const [openLoaderBackdrop, setOpenLoaderBackDrop] = useState(false);

    const handleLogout = () => {
        setOpenLoaderBackDrop(true);
        setTimeout(() => {
            logout().then(res => {

            }).finally(() => {
                setOpenLoaderBackDrop(false);
                history.push('/');
            });
        }, 1000);
    }

  return (
    <div>
        <BackdropComponent isOpen={openLoaderBackdrop} />
        {!!user ? <AppBar position="fixed">
            <Toolbar>
                <Typography variant="subtitle1" className={classes.title}>
                    <Button color="inherit" size="small" aria-label="logout" onClick={() => history.push(DASHBOARD_ROUTE)}>
                        <img src="/wowicon.svg" alt="none" style={{width: '2.7rem', height: '2.7rem'}}/> <span style={{marginLeft: '0.8rem'}}>{user.user_id.split('.')[0]}</span>
                    </Button>
                </Typography>
                <Button color="inherit" size="small" aria-label="settings" onClick={() => history.push(SETTINGS_ROUTE)}>
                    <SettingsIcon fontSize="small" /> <span style={{marginLeft: '0.2rem'}}>Settings</span>
                </Button>
                <Button style={{marginLeft: "1rem"}} color="inherit" size="small" aria-label="logout" onClick={handleLogout}>
                    <ExitToAppIcon fontSize="small" /> <span style={{marginLeft: '0.2rem'}}>Logout</span>
                </Button>
            </Toolbar>
        </AppBar> : ''}
        <Switch>
            <Route exact path='/' component={LoadingComponent} />
            <Route path={AUTH_ROUTE} component={AuthComponent} />
            <Route path={DASHBOARD_ROUTE} >
                {!user ? <Redirect to='/' /> : <Home />}
            </Route>
            <Route path={SETTINGS_ROUTE} >
                {!user ? <Redirect to='/' /> : <SettingsComponent />}
            </Route>
            <Route><Redirect to='/' /></Route>
        </Switch>
    </div>
  );
}

export default App;
