import React, { useState, useEffect } from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types';
import axios from '../../../../axios/axios'
import { useStyles } from './TaskDialogStyle'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ProjectThunk from '../../../../redux/thunk/ProjectThunk'

import {
    Dialog, DialogContent, TextField, Typography, List,
    ListItem, ListItemIcon, ListItemText, Menu, MenuItem
} from '@material-ui/core';
import {
    Subtitles as IconSubtitles, Description as IconDescription, RemoveCircle as IconRemoveCircle,
    PersonAdd as IconPersonAdd, AccessTime as IconAccessTime, AvTimer as IconAvTimer,
    DeleteForever as IconDeleteForever
} from '@material-ui/icons';

import ConfirmBox from '../../../../components/ConfirmBox/ConfirmBox';
import MemberList from './MemberList';
import PopUpMenu from '../../../../components/PopUpMenu/PopUpMenu'

function TaskDialog(props) {

    const { auth, id, groupId, title, description, estimateTime, spendTime, members,
        open, onClose, handleDeleteTask, handleUpdateTask, lock, handleProgressBar, ...other } = props;
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

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
    })

    const [addMemberMenu, setAddMemberMenu] = useState({
        open: false,
        anchor: null
    })
    const [removeMemberMenu, setRemoveMemberMenu] = useState({
        open: false,
        anchor: null
    })

    useEffect(() => {
        function effect() {
            axios.get(`/task/${id}/assignment`)
                .then( res => {
                    setState({
                        ...state,
                        assignee: res.data
                    })
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

    const _handleClose = async () => {
        var task = await _.reduce(state, (r, v, k) => {
            if (k !== 'assignee') r[k] = v;
            return r;
        }, {})
        await handleProgressBar(true)
        await handleUpdateTask(groupId, task);
        await handleProgressBar(false)
        await onClose();
    }

    const handleAssignTask = async (userId) => {
        axios.post(
            `/task/${id}/assign-user`,
            {
                'assignerId': auth.id,
                'userId': userId,
            }
        ).then(res => {
            setState({
                ...state,
                assignee: [...state.assignee, { userId }]
            })
        }).catch(error => {

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
                    margin="none" variant='standard' fullWidth
                    value={state.title}
                    onChange={e => handleEdit('title', e.target.value)}
                />
            </div>
        </DialogContent>
    )

    const renderDescription = () => (
        <DialogContent
            className={[classes.dialogContent, classes.last]}
        >
            <div className={classes.line}>
                <IconDescription className={classes.icon} />Description
            </div>
            <div className={classes.line}>
                <TextField
                    className={classes.textField} placeholder='description...'
                    margin="none" fullWidth variant='outlined' rows={6}
                    multiline value={state.description}
                    onChange={e => handleEdit('description', e.target.value)}
                />
            </div>
        </DialogContent>
    )

    const sideLayout = [
        {
            type: 'button', component: ListItemText, color: 'primary', icon: IconPersonAdd,
            attribute: {
                onClick: (e) => {
                    console.log(e);
                    setAddMemberMenu({ open: true, anchor: e.currentTarget })
                },
                button: true,
            },
            innerAttribute: {
                primary: 'Assign member',
            }
        },
        {
            type: 'button', component: ListItemText, color: 'error', icon: IconRemoveCircle,
            attribute: {
                onClick: (e) => {
                    console.log(e);
                    setRemoveMemberMenu({ open: true, anchor: e.currentTarget })
                },
                button: true,
                style: { color: 'red' },
            },
            innerAttribute: {
                primary: 'Remove member',
            }
        },
        {
            type: 'textfeild', component: TextField, color: 'primary', icon: IconAccessTime,
            attribute: {},
            innerAttribute: {
                fullWidth: true,
                label: 'Estimate time',
                type: 'number',
                helperText: 'Unit: hour',
                onChange: e => handleEdit('estimateTime', e.target.value),
                value: state.estimateTime
            }
        },
        {
            type: 'textfeild', component: TextField, color: 'primary', icon: IconAvTimer,
            attribute: {},
            innerAttribute: {
                fullWidth: true,
                label: 'Spend time',
                type: 'number',
                helperText: 'Unit: hour',
                onChange: e => handleEdit('spendTime', e.target.value),
                value: state.spendTime
            }
        },
        {
            type: 'button', component: ListItemText, color: 'error', icon: IconDeleteForever,
            attribute: {
                onClick: () => setConfirmDelete({ open: true }),
                button: true,
                style: { color: 'red' },
            },
            innerAttribute: {
                primary: 'Delete task',
            }
        },
    ]

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
                {sideLayout.map(e => (
                    <ListItem {...e.attribute}>
                        <ListItemIcon>
                            <e.icon color={e.color} />
                        </ListItemIcon>
                        <e.component {...e.innerAttribute}>
                            {e.innerAttribute.children}
                        </e.component>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    const renderDeleteTaskConfirmBox = () => (
        <ConfirmBox
            open={confirmDelete.open}
            title='Delete confirm'
            message={`Do you want to delete ${title}`}
            variant='delete'
            onClose={() => setConfirmDelete({ open: false })}
            actionLabel='delete'
            action={async () => {
                await handleDeleteTask(id, groupId);
                await onClose();
            }}
        />
    )
    console.log(members);
    console.log(state.assignee);
    
    return (
        <>
            <Dialog
                open={open}
                scroll='body'
                {...other}
                onClose={_handleClose}
                maxWidth='lg'
            >
                <div className={classes.root}>
                    <div className={classes.container}>
                        {renderTitle()}
                        <MemberList members={members} assignee={state.assignee} />
                        {renderDescription()}
                    </div>
                    {renderSide()}
                </div>
            </Dialog>
            {renderDeleteTaskConfirmBox()}
            <PopUpMenu fullList={members} fullListKey='id'
                negativeList={state.assignee} negativeListKey='userId'
                open={addMemberMenu.open} anchorRoot={addMemberMenu.anchor}
                onClose={()=> setAddMemberMenu({...addMemberMenu, open: false})}
                displayFeild='fullName'
                renderNegativeList={false}
                onItemClick={({id}) => {
                    setAddMemberMenu({ ...addMemberMenu, open: false })
                    handleAssignTask(id)
                }}
            />
            <PopUpMenu fullList={members} fullListKey='id'
                negativeList={state.assignee} negativeListKey='userId'
                open={removeMemberMenu.open} anchorRoot={removeMemberMenu.anchor}
                onClose={()=> setRemoveMemberMenu({...removeMemberMenu, open: false})}
                displayFeild='fullName'
                renderNegativeList={true}
                onItemClick={({id}) => {
                    setRemoveMemberMenu({ ...removeMemberMenu, open: false })
                }}
            />
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
}
const mapStateToProps = ({ Project, Auth }) => ({
    data: Project,
    auth: Auth
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        handleDeleteTask: ProjectThunk.deleteTask,
        handleUpdateTask: ProjectThunk.updateTask,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDialog)
