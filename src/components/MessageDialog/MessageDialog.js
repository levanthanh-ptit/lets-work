import React from 'react'
import PropTypes from 'prop-types'

import * as color from '../assets/color'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    dialogTitle: {
        background: color.color_bg_white80,
    },
    dialogContent: {
        minHeight: 50,
        minWidth: 100,
        padding: 20,
        background: color.color_bg_white80,
    }
})

function MessageDialog(props) {
    const { handleClose, error, title, lock, ...other } = props;
    const classes = useStyles();
    const _handleClose = () => {
        handleClose(false);
    }
    return (
        <Dialog
            {...other}
            onBackdropClick={lock?null:_handleClose}
        >
            <DialogTitle
            className={classes.dialogTitle}
            >
                <Typography color={error?'error':'primary'} align='center'>{title}</Typography>
            </DialogTitle>
            <DialogContent
                className={classes.dialogContent}
            >
                <Typography align='center'>{props.children}</Typography>
            </DialogContent>
        </Dialog>
    )
}
MessageDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    error: PropTypes.bool,
    lock: PropTypes.bool,
    title: PropTypes.string,
}

MessageDialog.defaultProps = {
    error: false,
    lock: false,
}

export default MessageDialog


