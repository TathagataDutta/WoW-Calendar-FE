import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarComponent = ({snackMsg, severity='success', open,  setOpen}) => {
    return <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}>
        <Alert severity={severity} onClose={() => setOpen(false)}>
            {snackMsg}
        </Alert>
    </Snackbar>
}

export default SnackbarComponent