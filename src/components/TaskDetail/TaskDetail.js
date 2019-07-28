import React from 'react'
import PropTypes from 'prop-types'

import * as color from '../assets/color'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    dialogTitle: {
        background: color.color_bg_white80,
        borderBottom: `1px solid ${color.color_bg_black10}`
    },
    dialogContent: {
        minHeight: theme.spacing(40),
        minWidth: theme.spacing(60),
        padding: 20,
        background: color.color_bg_white80,
    }
}))

function TaskDetail(props) {
    const { id, title, content, 
        estimateTime, spendTime, onSetEstimateTime, onSetSpendTime,
        member, onAddMember,
        open, onClose, lock, ...other } = props;
    const classes = useStyles();
    const _handleClose = () => {
        onClose();
    }
    return (
        <Dialog
            open={open}
            scroll='body'
            {...other}
            onBackdropClick={lock ? null : _handleClose}
        >
            <DialogTitle
                className={classes.dialogTitle}
            >
                <Typography color={'primary'} align='left'>{title}</Typography>
            </DialogTitle>
            <DialogContent
                className={classes.dialogContent}
            >
                <Typography align='center'>{props.children}</Typography>
            </DialogContent>
        </Dialog>
    )
}

TaskDetail.propTypes = {
    id: PropTypes.number,
    title: PropTypes.any,
    content: PropTypes.string,
    estimateTime: PropTypes.number,
    spendTime: PropTypes.number,
    onAddMember: PropTypes.func,
    onSetEstimateTime: PropTypes.func,
    onSetSpendTime: PropTypes.func,
    member: PropTypes.array,
    onClose: PropTypes.func.isRequired,
    lock: PropTypes.bool,
    open: PropTypes.bool
}

TaskDetail.defaultProps = {
    lock: false,
}

export default TaskDetail


