import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {displayTime} from "../../util/CommonUtil";
import {withStyles} from "@material-ui/core";
import AlertComponent from "../Alert/AlertComponent";
import axios from "axios";
import {WOW_DELETE_RAID_URL} from "../../util/StringUtil";
import SnackbarComponent from "../SnackbarComponent/SnackbarComponent";
import TableChartIcon from '@material-ui/icons/TableChart';

/*function createData(
    char_name,
    raid_name,
    guild_or_discord_name,
    start_date_and_time,
    approx_duration,
    approx_end) {
    return {
        char_name,
        raid_name,
        guild_or_discord_name,
        start_date_and_time,
        approx_duration,
        approx_end
    };
}*/

/*const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];*/

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'char_name', numeric: false, disablePadding: false, label: 'Character Name' },
    { id: 'raid_name', numeric: true, disablePadding: false, label: 'Raid Name' },
    { id: 'guild_or_discord_name', numeric: true, disablePadding: false, label: 'Guild / Discord Name' },
    { id: 'start_date_and_time', numeric: true, disablePadding: false, label: 'Raid Start Time' },
    { id: 'approx_duration', numeric: true, disablePadding: false, label: 'Duration (Approx) (Hr.)' },
    { id: 'approx_end', numeric: true, disablePadding: false, label: 'Raid End Time (Approx)' },
];

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function EnhancedTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/*<TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>*/}
                {headCells.map((headCell) => (
                    <TableCell
                        style={{fontWeight: "bold"}}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = ({ numSelected, rows, user }) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className="card-label"><TableChartIcon /></div>
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Raid Schedule
                </Typography>
            )}

            {/*{numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={() => console.log(rows)}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton aria-label="filter list">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}*/}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable({user, rows, setRows, onDeleteRow, onRowSelect}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('start_date_and_time');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [rowToBeSelected, setRowToBeSelected] = React.useState(null);
    const [alertBackDrop, setAlertBackDrop] = React.useState(false);

    const [isSnackOpen, setSnackOpen] = React.useState(false);
    const [snackMsg, setSnackMsg] = React.useState('Nothing');
    const [severity, setSeverity] = React.useState('success');



    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /*const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };*/

    const openSnackbar = (isOpen, msg, severity) => {
        setSnackOpen(isOpen)
        setSnackMsg(msg)
        setSeverity(severity)
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} rows={selected} user={user}  />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.char_name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            className={!!row.highlight ? 'red-color' : ''}
                                            hover
                                            onClick={(event) => {/*handleClick(event, row)*/}}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={index}
                                            selected={isItemSelected}
                                        >
                                            {/*<TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>*/}
                                            <TableCell align='left'>
                                                {row.char_name}
                                            </TableCell>
                                            <TableCell align="right">{row.raid_name}</TableCell>
                                            <TableCell align="right">{row.guild_or_discord_name}</TableCell>
                                            <TableCell align="right">{displayTime(row.start_date_and_time)}</TableCell>
                                            <TableCell align="right">{row.approx_duration.slice(0, -3)}</TableCell>
                                            <TableCell align="right">{displayTime(row.approx_end)}</TableCell>
                                            <TableCell align="right">
                                                <IconButton size='small' style={{marginRight: "10px"}} aria-label="delete" color='primary' onClick={() => {
                                                    setRowToBeSelected(row)
                                                    onRowSelect(row)
                                                }}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size='small' aria-label="delete" color='secondary' onClick={() => {
                                                    setRowToBeSelected(row)
                                                    setOpenAlert(true)
                                                }}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[8, 10, 20, 30]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <AlertComponent open={openAlert}
                            msg={`Do you want to delete the raid: ${rowToBeSelected?.raid_name} ?`}
                            openBackDrop={alertBackDrop}
                            setOpen={setOpenAlert} handleAction={(action) => {
                setAlertBackDrop(true)

                if (!!action) {
                    axios.delete(WOW_DELETE_RAID_URL+rowToBeSelected._id).then(res => {
                        if (!!res) {
                            setRows([...rows.filter(row => row._id !== rowToBeSelected._id)])
                            setOpenAlert(false)
                            setAlertBackDrop(false)
                            openSnackbar(true, 'Raid Deleted Successfully', 'success');
                            onDeleteRow(true)
                        }
                    }).catch(res => {
                        setAlertBackDrop(false)
                        openSnackbar(true, 'Raid Delete failed, Network Error!!!', 'error');
                    })
                } else {
                    setOpenAlert(false)
                    setAlertBackDrop(false)
                }
            }} />
            <SnackbarComponent open={isSnackOpen} snackMsg={snackMsg} setOpen={setSnackOpen} severity={severity} />
        </div>
    );
}