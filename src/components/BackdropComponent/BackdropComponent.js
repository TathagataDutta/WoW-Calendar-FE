import {Backdrop, CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const BackdropComponent = ({isOpen}) => {
    const classes = useStyles();

    return <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
    </Backdrop>
}

export default BackdropComponent