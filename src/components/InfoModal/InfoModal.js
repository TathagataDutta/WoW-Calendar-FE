import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import DialogContentText from "@material-ui/core/DialogContentText";

const InfoModal = ({open, setOpen}) => {
    const handleModalClose = () => {
        setOpen(false)
    }

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    return (
        <div>
            <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="customized-dialog-title"  onClose={handleModalClose}>
                    <Typography style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Typography variant="h6">Read Me</Typography>
                        <IconButton aria-label="close" onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton></Typography>
                </DialogTitle>
                <DialogContent dividers="true">
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {[...new Array(50)]
                            .map(
                                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                            )
                            .join('\n')}
                    </DialogContentText>
                </DialogContent>
                    <DialogActions>
                        <Button onClick={handleModalClose} color="primary" variant='contained'>
                            Close
                        </Button>
                    </DialogActions>
            </Dialog>
        </div>
    )
}

export default InfoModal