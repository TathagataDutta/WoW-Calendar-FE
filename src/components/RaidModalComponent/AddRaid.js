import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import {WOW_RAID_ADD_URL} from "../../util/StringUtil";

const AddRaid = ({open, setOpen, user, submitRaid, loading = false, setLoading}) => {


    const [char_name, setCharName] = useState('');
    const [raid_name, setRaidName] = useState('');
    const [guild_name, setGuildName] = useState('');
    const [start_date_and_time, setStartTime] = useState('');
    const [approx_duration, setApproxDuration] = useState('');

    const handleSubmitRaid = () => {
        const reqBody = {
            user_id: user.user_id,
            char_name,
            raid_name,
            guild_or_discord_name: guild_name,
            start_date_and_time,
            approx_duration
        }
        submitRaid(reqBody)
        setLoading(true)
    }

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{'Add Raid'.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="char_name"
                        label="Character Name"
                        fullWidth
                        onChange={(e) => setCharName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="raid_name"
                        label="Raid Name"
                        fullWidth
                        onChange={e => setRaidName(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="guild_name"
                        label="Guild or Discord Name"
                        fullWidth
                        onChange={e => setGuildName(e.target.value)}
                    />
                    <TextField
                        id="datetime-local"
                        label="Next appointment"
                        type="datetime-local"
                        defaultValue={new Date().toISOString()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setStartTime(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="approx_duration"
                        label="Approx Duration (Mins)"
                        fullWidth
                        onChange={e => setApproxDuration(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmitRaid} color="primary" disabled={!!loading}>
                        {!!loading ? <><i className="fa fa-spinner fa-spin"/> <span style={{marginLeft: '5px'}}>Submitting...</span></> : 'Submit'}
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddRaid