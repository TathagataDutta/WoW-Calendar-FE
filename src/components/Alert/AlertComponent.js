import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import BackdropComponent from "../BackdropComponent/BackdropComponent";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertComponent = ({open, setOpen, msg, handleAction, openBackDrop, setOpenBackDrop}) => {

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Alert</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleAction(true)} color="primary">Yes</Button>
                    <Button onClick={() => handleAction(false)} color="secondary">No</Button>
                </DialogActions>
                <BackdropComponent isOpen={openBackDrop} />
            </Dialog>
        </div>
    );
}

export default AlertComponent