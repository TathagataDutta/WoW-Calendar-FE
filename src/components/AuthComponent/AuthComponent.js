import {useState} from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './AuthComponent.css';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useHistory} from "react-router-dom";
import {useUserContext} from "../../context/userContext/UserContext";

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AuthComponent = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [color] = useState('primary');
    const [value, setValue] = useState(0);
    const history = useHistory();
    const {login, user, signup} = useUserContext();

    const [open, setOpen] = useState(false);

    const [isLoading, setLoading] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleAuthentication = (e) => {
        e.preventDefault();
        value === 0 ? handleLogin() : handleSignup()

    }

    const handleLogin = () => {
        setLoading(true);
        if (!!userName && !!password && userName !== '' && password !== '') {
            login({userName, password}).then(res => {
                setLoading(false)
                if (!!res) {
                    history.push('/home');
                } else {
                    setOpen(true);
                }
            });
        }
    }

    const handleSignup = () => {
        setLoading(true);
        if (!!userName && !!password && userName !== '' && password !== '') {
            signup({userName, password}).then(res => {
                setLoading(false)
                history.push('/home');

            });
        }
    }



    return (

            <div className="App">
                <Paper elevation={3} >
                    <div className="form-container">

                        <form className='signin-form' onSubmit={handleAuthentication}>
                            <div className="tab-container">
                                <Tabs
                                    value={value}
                                    indicatorColor={color}
                                    textColor={color}
                                    onChange={handleChange}
                                    aria-label="disabled tabs example"
                                >
                                    <Tab label="Login"/>
                                    <Tab label="Signup"/>
                                </Tabs>
                            </div>
                            <TextField
                                className='text-field'
                                id="standard-basic"
                                label="Username"
                                color={color}
                                value={userName}
                                onChange={e => setUserName(e.target.value)}/>
                            <TextField
                                className='text-field'
                                id="standard-basic"
                                label="Password"
                                type="password"
                                color={color}
                                value={password}
                                onChange={e => setPassword(e.target.value)} />

                            <div className="btn-container">
                                <Button className='btn' variant="contained" color={color} type="submit">
                                    {value === 0 ?
                                        (!!isLoading ? <><i className="fa fa-spinner fa-spin"/> <span style={{marginLeft: '5px'}}>Logging in...</span></> : 'Log in') :
                                        (!!isLoading ? <><i className="fa fa-spinner fa-spin"/> <span style={{marginLeft: '5px'}}>Signing up...</span></> : 'Sign up')
                                    }
                                </Button>
                            </div>

                        </form>
                    </div>
                </Paper>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning">
                        Wrong Credentials!!
                    </Alert>
                </Snackbar>
            </div>
    );
}

export default AuthComponent