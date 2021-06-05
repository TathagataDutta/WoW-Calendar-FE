import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect} from "react";
import {useUserContext} from "../../context/userContext/UserContext";
import {USER_DATA} from "../../util/StringUtil";
import {useHistory} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const LoadingComponent = () => {

    const classes = useStyles();
    const {user, addUser} = useUserContext();
    const history = useHistory();

    useEffect(() => {
        const userDataString = localStorage.getItem(USER_DATA);
        if (!!userDataString) {
            const userData = JSON.parse(userDataString);
            addUser(userData).then(res => {
                history.push('/home')
            })
        } else {
            console.log('else part');
            history.push('/auth');
        }
    }, [])

    return <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
    </Backdrop>
}

export default LoadingComponent