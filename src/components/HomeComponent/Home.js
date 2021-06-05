import {useHistory} from 'react-router-dom';
import {useUserContext} from "../../context/userContext/UserContext";
import {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EnhancedTable from "../TableComponent/EnhancedTable";
import AddRaid from "../RaidModalComponent/AddRaid";
import axios from "axios";
import {WOW_GET_RAIDS_URL, WOW_RAID_ADD_URL} from "../../util/StringUtil";
import BackdropComponent from "../BackdropComponent/BackdropComponent";

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


    const handleLogout = () => {
        setOpenLoaderBackDrop(true);
        setTimeout(() => {
            logout().then(res => {

            }).finally(() => {
                setOpenLoaderBackDrop(false);
                history.push('/');
            });
        }, 1000);
    }

    const [openModal, setOpenModal] = useState(false);
    const [raidSubmitLoading, setRaidSubmitLoading] = useState(false);
    const [openLoaderBackdrop, setOpenLoaderBackDrop] = useState(false);


    const handleClickOpen = () => {
        setOpenModal(true);
    };


    const handleSubmitRaid = (reqBody) => {
        axios.post(WOW_RAID_ADD_URL, reqBody).then(res => {
            console.log(res);
            setRaidSubmitLoading(true)
            setOpenLoaderBackDrop(true)
        }).finally(() => {
            setOpenModal(false)
            setRaidSubmitLoading(false)
        })
    }

    useEffect(() => {
        setOpenLoaderBackDrop(true)
        axios.get(WOW_GET_RAIDS_URL + user.user_id).then(res => {
            setRows(res.data);
        }).finally(() => {
            setOpenLoaderBackDrop(false)
        })
    }, [raidSubmitLoading]);

    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {user.user_id}
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <BackdropComponent isOpen={openLoaderBackdrop} />
            <div style={{padding: '100px'}}>
                <Button color="primary" style={{marginBottom: '40px'}} variant='contained' onClick={handleClickOpen}>Add Raid</Button>
                <EnhancedTable user={user} rows={rows}/>
            </div>

            <AddRaid
                open={openModal}
                setOpen={setOpenModal}
                user={user}
                submitRaid={handleSubmitRaid}
                loading={raidSubmitLoading}
                setLoading={setRaidSubmitLoading} />
        </div>
    )
}

export default Home