import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    dialog: {
        "& .MuiPaper-root": {
            minWidth: theme.spacing(50)
        }
    }
}))

function ConfirmBox(props) {
    const { open, onClose, message, title, variant, actionLabel, action } = props;
    const deleteStyle = variant === 'delete';
    const classes = useStyles()
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
            className={classes.dialog}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText color={deleteStyle ? 'secondary' : 'primary'}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color='primary'>Cancel</Button>
                <Button 
                    onClick={ async () => {
                        await action();
                        await onClose();
                    }} 
                    color={deleteStyle ? 'secondary' : 'primary'}
                >
                    {actionLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ConfirmBox.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    message: PropTypes.string,
    title: PropTypes.string,
    variant: PropTypes.oneOf(['create', 'delete']),
    actionLabel: PropTypes.string,
    action: PropTypes.func
}

export default ConfirmBox

