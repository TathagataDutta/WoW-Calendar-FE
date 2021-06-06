import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import {getRaids} from "../../util/CommonUtil";
import {RAID_NAME} from "../../util/StringUtil";
import BackdropComponent from "../BackdropComponent/BackdropComponent";

const AddRaid = ({open, setOpen, user, submitRaid, loading = false, setLoading}) => {


    const [char_name, setCharName] = useState('');
    const [raid_name, setRaidName] = useState(RAID_NAME);
    const [guild_name, setGuildName] = useState('');
    const [start_date_and_time, setStartTime] = useState('');
    const [durationHour, setDurationHour] = useState(-1);
    const [durationMin, setDurationMin] = useState(-1);

    const handleSubmitRaid = () => {
        const reqBody = {
            user_id: user.user_id,
            char_name,
            raid_name,
            guild_or_discord_name: guild_name,
            start_date_and_time,
            approx_duration: `${durationHour}:${durationMin}:00`
        }
        console.log(reqBody);
        submitRaid(reqBody)
        setLoading(true)
    }

    const isButtonDisabled = () => {
        return !!loading
            || !!(durationHour === -1 || durationMin === -1 )
            || raid_name === RAID_NAME
            || !char_name
            || !guild_name
            || !start_date_and_time
    }

    const resetFields = () => {
        setCharName('')
        setRaidName(RAID_NAME)
        setGuildName('')
        setStartTime('')
        setDurationHour(-1)
        setDurationMin(-1)
    }

    const handleModalClose = () => {
        resetFields()
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{'Add Raid'.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <TextField
                        className='text-field'
                        autoFocus
                        margin="dense"
                        id="char_name"
                        label="Character Name"
                        fullWidth
                        onChange={(e) => setCharName(e.target.value)}
                    />
                    <Select
                        labelId="raid_name"
                        id="raid_name"
                        value={raid_name}
                        onChange={(e) => setRaidName(e.target.value)}
                        fullWidth
                    >
                        <MenuItem key={-1} value={RAID_NAME} disabled>{RAID_NAME}</MenuItem>
                        {getRaids().map((raid, i) => <MenuItem key={i} value={raid}>{raid}</MenuItem>)}


                    </Select>

                    <TextField
                        className='text-field'
                        autoFocus
                        margin="dense"
                        id="guild_name"
                        label="Guild or Discord Name"
                        fullWidth
                        onChange={e => setGuildName(e.target.value)}
                    />
                    <TextField
                        className='text-field'
                        id="datetime-local"
                        label="Raid Start Time"
                        type="datetime-local"
                        defaultValue={new Date().toISOString()}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setStartTime(e.target.value)}
                    />
                    <InputLabel id="demo-simple-select-label">Raid Duration</InputLabel>
                    <Select
                        labelId="duration-hr-label"
                        id="duration-hr-label"
                        value={durationHour}
                        label='Hr'
                        onChange={(e) => {
                            setDurationHour(e.target.value)
                            if (durationMin === -1) setDurationMin(0);
                        }}
                    >
                        <MenuItem key='-1' value={-1}>Hr</MenuItem>
                        {Array(13).fill(0).map((el, i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}

                    </Select>
                     <span style={{marginLeft: '10px', marginRight: '10px'}}>:</span>
                    <Select
                        labelId="duration-min-label"
                        id="duration-min-label"
                        value={durationMin}
                        label='Min'
                        onChange={(e) => {
                            setDurationMin(e.target.value)
                            if (durationHour === -1) setDurationHour(0)
                        }}
                    >
                        <MenuItem key='-1' value={-1}>Min</MenuItem>
                        {Array(60).fill(0).map((el, i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}

                    </Select>
                    <DialogActions>
                        <Button onClick={handleSubmitRaid} color="primary" variant='contained' disabled={isButtonDisabled()}>
                            {!!loading ? <><i className="fa fa-spinner fa-spin"/> <span style={{marginLeft: '5px'}}>Submitting...</span></> : 'Submit'}
                        </Button>
                    </DialogActions>
                </DialogContent>
                <BackdropComponent isOpen={loading} />
            </Dialog>
        </div>
    );
}

export default AddRaid