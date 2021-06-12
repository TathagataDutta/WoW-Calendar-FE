import React, {useEffect, useState} from 'react';
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

const AddRaid = ({open, setOpen, user, submitRaid, updateRaid, loading = false, setLoading, initValues, setInitValues}) => {


    const [char_name, setCharName] = useState('');
    const [raid_name, setRaidName] = useState(RAID_NAME);
    const [guild_name, setGuildName] = useState('');
    const [start_date_and_time, setStartTime] = useState('');
    const [durationHour, setDurationHour] = useState(-1);
    const [durationMin, setDurationMin] = useState(-1);

    useEffect(() => {

        if (!!initValues) {
            setCharName(initValues.char_name)
            setRaidName(initValues.raid_name)
            setGuildName(initValues.guild_or_discord_name)
            setStartTime(initValues.start_date_and_time)
            setDurationHour(Number(initValues.approx_duration.slice(0, 1)))
            setDurationMin(Number(initValues.approx_duration.slice(2, 4)))
        } else {
            resetFields()
        }
    }, [initValues])

    const handleSubmitRaid = () => {
        const reqBody = {
            _id: initValues?._id,
            user_id: user.user_id,
            char_name,
            raid_name,
            guild_or_discord_name: guild_name,
            start_date_and_time,
            approx_duration: `${durationHour}:${durationMin}:00`
        }
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

        setInitValues(null)
    }

    const handleModalClose = () => {
        resetFields()
        setOpen(false)
    }

    return (
        <div>
            <Dialog open={open} onClose={handleModalClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{(!!initValues ? 'Edit Raid' : 'Add Raid').toUpperCase()}</DialogTitle>
                <DialogContent>
                    <TextField
                        className='text-field'
                        autoFocus
                        margin="dense"
                        id="char_name"
                        label="Character Name"
                        fullWidth
                        value={char_name}
                        onChange={(e) => setCharName(e.target.value)}
                    />
                    <Select
                        labelId="raid_name"
                        id="raid_name"
                        className="text-field"
                        value={raid_name}
                        onChange={(e) => setRaidName(e.target.value)}
                        fullWidth
                    >
                        <MenuItem key={-1} value={RAID_NAME} disabled>{RAID_NAME}</MenuItem>
                        {getRaids().map((raid, i) => <MenuItem key={i} value={raid}>{raid}</MenuItem>)}


                    </Select>

                    <TextField
                        className='text-field'
                        margin="dense"
                        id="guild_name"
                        label="Guild or Discord Name"
                        fullWidth
                        value={guild_name}
                        onChange={e => setGuildName(e.target.value)}
                    />
                    <TextField
                        className='text-field'
                        id="datetime-local"
                        label="Raid Start Time"
                        type="datetime-local"
                        defaultValue={start_date_and_time}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={e => setStartTime(e.target.value)}
                    />
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <InputLabel id="demo-simple-select-label">Raid Duration</InputLabel>
                        <div className="select-container" style={{display: "flex", justifyContent: "flex-start", alignItems: "flex-start"}}>
                            <Select
                                labelId="duration-hr-label"
                                id="duration-hr-label"
                                className="text-field"
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
                            <span  style={{marginLeft: '10px', marginRight: '10px'}}>:</span>
                            <Select
                                labelId="duration-min-label"
                                id="duration-min-label"
                                className="text-field"
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
                        </div>
                    </div>
                    <DialogActions>
                        <Button onClick={handleSubmitRaid} color="primary" disabled={isButtonDisabled()}>
                            {!!loading ? <><i className="fa fa-spinner fa-spin"/> <span style={{marginLeft: '5px'}}>{!!initValues ? 'Updating' : 'Submitting...'}</span></> : (!!initValues ? 'Update' : 'Submit')}
                        </Button>
                    </DialogActions>
                </DialogContent>
                <BackdropComponent isOpen={loading} />
            </Dialog>
        </div>
    );
}

export default AddRaid