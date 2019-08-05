import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import axios from '../../../axios/axios'
import { useStyles } from './TaskDialogStyle'
import {
    Dialog, DialogContent, TextField, Avatar, Typography, List,
    ListItem, ListItemIcon, ListItemText, Menu, MenuItem
} from '@material-ui/core';
import {
    Subtitles as IconSubtitles, Description as IconDescription,
    People as IconPeople, PersonAdd as IconPersonAdd,
    DeleteForever as IconDeleteForever
} from '@material-ui/icons';

import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'

function TaskDialog(props) {

    const { auth, id, groupId, title, description, estimateTime, spendTime, members,
        open, onClose, onDelete, onUpdate, lock, ...other } = props;
    const classes = useStyles();

    const [state, setState] = useState({
        id,
        title,
        description,
        estimateTime,
        spendTime,
        assignee: [
            // {
            //      userId
            //      assignerId
            // }
        ],
    })
    console.log(members);

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
    })

    const [addMemberMenu, setAddMemberMenu] = useState({
        open: false,
        anchor: null
    })

    useEffect(() => {
        function effect() {
            axios.get(`/task/${id}/assignment`)
                .then(async res => {
                    await setState({
                        ...state,
                        assignee: res.data
                    })
                    await console.log(state);
                })
        }
        effect()
    }, [id]
    )

    const handleEdit = (feild, value) => {
        setState({
            ...state,
            [feild]: value
        })
    }

    const _handleClose = () => {
        var task = _.reduce(state, (r, v, k) => {
            if (k !== 'assignee') r[k] = v;
            return r;
        }, {})
        onUpdate(groupId, task);
        onClose();
    }

    const handleAssignTask = async (userId) => {
        console.log({userId, id, asignner: auth.userId});
        
        axios.post(
            `/task/${id}/assign-user`,
            {
                'assignerId': auth.userId,
                'userId': userId,
            }
        ).then( res => {
            setState({
                ...state,
                assignee: [...state.assignee, {userId}]
            })
        }).catch( error => {

        })
    }

    const renderTitle = () => (
        <DialogContent
            className={classes.dialogContent}
        >
            <div className={classes.line} style={{ flexWrap: 'nowrap' }}>
                <IconSubtitles className={classes.icon} />
                <TextField
                    className={classes.textField}
                    margin="none"
                    variant='standard'
                    fullWidth
                    value={state.title}
                    onChange={e => handleEdit('title', e.target.value)}
                    inputProps={{ 'aria-label': 'bare' }}
                />
            </div>
        </DialogContent>
    )

    const renderMembers = () => (
        <DialogContent className={classes.dialogContent}>
            <div className={classes.line}>
                <IconPeople className={classes.icon} />
                Members
            </div>
            <div className={classes.line}>
                {members.map(e => {
                    let index = state.assignee.findIndex(v => e.id === v.userId)
                    if (index !== -1) return (
                        <div key={e.id} className={classes.memberCard}>
                            <Avatar className={classes.icon}>{e.fullName[0]}</Avatar>
                            <span className={`member-card-name ${classes.memberCardName}`}>{e.fullName}</span>
                        </div>

                    )
                    else return null
                }

                )}
            </div>
        </DialogContent>
    )

    const renderDescription = () => (
        <DialogContent
            className={[classes.dialogContent, classes.last]}
        >
            <div className={classes.line}>
                <IconDescription className={classes.icon} />
                Description
                </div>
            <div className={classes.line}>
                <TextField
                    className={classes.textField}
                    placeholder='description...'
                    margin="none"
                    fullWidth
                    variant='outlined'
                    rows={6}
                    multiline
                    value={state.description}
                    onChange={e => handleEdit('description', e.target.value)}

                />
            </div>

        </DialogContent>
    )
    const renderSide = () => (
        <div className={classes.side}>
            <Typography
                className={classes.sideTitle}
                color='inherit'
                variant='h5'
                maxWidth
                align='center'
            >Add to task</Typography>
            <List>
                <ListItem
                    onClick={e => setAddMemberMenu({open: true, anchor: e.currentTarget})}
                    button
                >
                    <ListItemIcon>
                        <IconPersonAdd color='primary' />
                    </ListItemIcon>
                    <ListItemText primary="Assign member" />
                </ListItem>
                <ListItem
                    onClick={() => setConfirmDelete({ open: true })}
                    button
                    style={{ color: 'red' }}
                >
                    <ListItemIcon>
                        <IconDeleteForever color='error' />
                    </ListItemIcon>
                    <ListItemText primary="Delete task" />
                </ListItem>
            </List>
        </div>
    )

    const renderAddMemberMenu = () => (
        <Menu
            open={addMemberMenu.open&&members.length - state.assignee.length>0}
            anchorEl={addMemberMenu.anchor}
            onClose={() => setAddMemberMenu({...addMemberMenu, open: false})}
        >
            {members.map(mV => {
                if (-1 === state.assignee.findIndex(a => { return a.userId === mV.id }))
                    return (
                        <MenuItem
                            onClick={() => {
                                setAddMemberMenu({...addMemberMenu, open: false})
                                handleAssignTask(mV.id);
                            }}
                        >
                            {mV.fullName}
                        </MenuItem>
                    )
                return null
            })}
        </Menu>
    )

    const renderDeleteTaskConfirmBox = () => (
        <ConfirmBox
            open={confirmDelete.open}
            title='Delete confirm'
            message={`Do you want to delete ${title}`}
            variant='delete'
            onClose={() => setConfirmDelete({ open: false })}
            actionLabel='delete'
            action={() => {
                onDelete();
                onClose();
            }}
        />
    )
    console.log(state);
    return (
        <>
            <Dialog
                open={open}
                scroll='body'
                {...other}
                onBackdropClick={lock ? null : _handleClose}
                maxWidth='lg'
            >
                <div className={classes.root}>
                    <div className={classes.container}>
                        {renderTitle()}
                        {renderMembers()}
                        {renderDescription()}
                    </div>
                    {renderSide()}
                </div>
            </Dialog>
            {renderDeleteTaskConfirmBox()}
            {renderAddMemberMenu()}
        </>
    )
}

TaskDialog.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    id: PropTypes.number,
    auth: PropTypes.object,
    groupId: PropTypes.number,
    title: PropTypes.any,
    description: PropTypes.string,
    estimateTime: PropTypes.number,
    spendTime: PropTypes.number,
    members: PropTypes.array,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
}

export default TaskDialog

