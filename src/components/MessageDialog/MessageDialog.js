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
    },
    dialogContent: {
        display: 'flex',
        alignItems: 'center',
        minHeight: theme.spacing(10),
        minWidth: theme.spacing(10),
        padding: theme.spacing(3),
        background: color.color_bg_white80,
    },
}))

function MessageDialog(props) {
    const { onClose, open, error, title, lock } = props;
    const classes = useStyles();

    return (
        <Dialog
            onClose={onClose}
            open={open}
        >
            <DialogContent
                className={classes.dialogContent}
            >
                <Typography color={error ? 'error' : 'primary'} align='center'>{title}</Typography>
                <Typography align='center'>{props.children}</Typography>
            </DialogContent>
        </Dialog>
    )
}
MessageDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    error: PropTypes.bool,
    lock: PropTypes.bool,
    title: PropTypes.string,
}

MessageDialog.defaultProps = {
    error: false,
    lock: false,
}

export default MessageDialog


