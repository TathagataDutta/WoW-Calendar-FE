import {useHistory} from 'react-router-dom';
import {useUserContext} from "../../context/userContext/UserContext";
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EnhancedTable from "../TableComponent/EnhancedTable";
import AddRaid from "../RaidModalComponent/AddRaid";
import axios from "axios";
import {WOW_EDIT_RAID_URL, WOW_GET_RAIDS_URL, WOW_RAID_ADD_URL} from "../../util/StringUtil";
import BackdropComponent from "../BackdropComponent/BackdropComponent";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import InfoModal from "../InfoModal/InfoModal";
import {Fab} from "@material-ui/core";

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

const Home = () => {
    const classes = useStyles();

    const {user, logout} = useUserContext();
    const history = useHistory();
    const [rows, setRows] = useState([]);

    //modal variables
    const [openModal, setOpenModal] = useState(false);
    const [raidSubmitLoading, setRaidSubmitLoading] = useState(false);
    const [openLoaderBackdrop, setOpenLoaderBackDrop] = useState(false);

    //snackbar variables
    const [isSnackOpen, setSnackOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState('Nothing');
    const [severity, setSeverity] = React.useState('success');
    const [initValues, setInitValues] = useState(null);

    const [openInfoModal, setOpenInfoModal] = useState(false);





    const handleOpenAddRaidModal = () => {
        setInitValues(null)
        setOpenModal(true);
    };


    const openSnackbar = (isOpen, msg, severity) => {
        setSnackOpen(isOpen)
        setSnackMsg(msg)
        setSeverity(severity)
    }

    const callSubmitRaidApi = async (reqBody) => {
        if (!!initValues) {
            console.log('updating raid!!!', reqBody._id)
            return await axios.put(WOW_EDIT_RAID_URL+reqBody._id, reqBody);
        } else {
            return await axios.post(WOW_RAID_ADD_URL, reqBody)
        }
    }

    const handleSubmitRaid = (reqBody) => {
        setRaidSubmitLoading(true)
        callSubmitRaidApi(reqBody).then(res => {
        }).finally(() => {
            const snackMsg = `Raid ${!!initValues ? 'Updated' : 'Added'} Successfully`
            setOpenModal(false)
            setRaidSubmitLoading(false)
            setInitValues(null)
            openSnackbar(true, snackMsg, 'success')
        })
    }

    useEffect(() => {
        fetchRaids()
    }, [raidSubmitLoading]);

    const fetchRaids = () => {
        setOpenLoaderBackDrop(true)
        axios.get(WOW_GET_RAIDS_URL + user.user_id).then(res => {
            setRows(res.data);
        }).finally(() => {
            setOpenLoaderBackDrop(false)
        })
    }

    return (
        <div>
            <BackdropComponent isOpen={openLoaderBackdrop} />
            <div style={{padding: '100px'}}>
                <div style={{display: "flex", justifyContent: "flex-end", marginBottom: '20px'}}>
                    <Fab  size="medium" color="secondary" variant="extended" style={{marginRight: '10px'}} onClick={() => setOpenInfoModal(true)}>
                        <InfoIcon /> <span style={{marginLeft: '0.5rem'}}>Info</span>
                    </Fab>
                    <Fab size="medium" color="primary" variant='extended' onClick={handleOpenAddRaidModal}>
                        <AddIcon /> <span style={{marginLeft: '0.5rem'}}>Add Raid</span>
                    </Fab>
                </div>
                <EnhancedTable
                    user={user}
                    rows={rows}
                    setRows={setRows}
                    onRowSelect={(row) => {
                        setInitValues(row)
                        setOpenModal(true)
                    }}
                   onDeleteRow={() => fetchRaids()}/>
            </div>

            <AddRaid
                open={openModal}
                setOpen={setOpenModal}
                user={user}
                submitRaid={handleSubmitRaid}
                initValues={initValues}
                setInitValues={setInitValues}
                loading={raidSubmitLoading}
                setLoading={setRaidSubmitLoading} />
            <InfoModal
                open={openInfoModal}
                setOpen={setOpenInfoModal}
                />
            <SnackbarComponent open={isSnackOpen} snackMsg={snackMsg} setOpen={setSnackOpen} severity={severity} />
        </div>
    )
}

export default Home