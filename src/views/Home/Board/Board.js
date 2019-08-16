import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect, useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import './Board.scss';
import { useStyle } from './BoardStyle'
import { Menu, MenuItem } from '@material-ui/core';
import { DeleteForever as IconDeleteForever } from '@material-ui/icons'

import * as ProjectThunk from '../../../redux/thunk/ProjectThunk'
import Group from '../../../components/Group/Group';
import Task from '../../../components/Group/Task/Task';
import TaskDialog from './TaskDialog/TaskDialog';
import TextInput from '../../../components/TextInput/TextInput'
import ConfirmBox from '../../../components/ConfirmBox/ConfirmBox'
import BoardHeader from './BoardHeader'
import MessageDialog from '../../../components/MessageDialog/MessageDialog'

function Board(props) {
    const classes = useStyle();
    const { load, moveTask, handleOnSortGroups, handleSortTask, handleAddTask,
        handleAddGroup, handleDeleteGroup, handleClearStatus, handleClearError 
    } = props;
    const data = useSelector(state => state.Project)
    const auth = useSelector(state => state.Auth)
    const id = props.match.params.boardId;
    const [taskDialog, setTaskDialog] = useState({
        open: false,
        id: null,
        groupId: null,
        title: null,
        description: null,
        estimateTime: null,
        spendTime: null
    })

    const [anchorGroupMenu, setAnchorGroupMenu] = useState({
        anchor: null,
        groupId: null,
        title: ''
    })

    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        title: '',
        action: null,
    })

    const [dragUp, setDragUp] = useState({
        groupId: 0,
        taskId: 0
    })
    useEffect(() => {
        if (id) {
            load(id);
        }
    }, [id])
    const handleDragChange = (groupId, taskId) => {
        setDragUp({ groupId, taskId })
    }

    const handleTaskDialog = (open, task) => {
        setTaskDialog({
            open,
            ...task
        })
    }

    const renderGroup = (taskGroup, index, children) => {
        const { id, title } = taskGroup;
        return (<Group id={id}
            key={id}
            index={index}
            title={title}
            onGroupShouldDrop={handleOnSortGroups}
            onTaskShouldDrop={moveTask}
            onDrapChange={handleDragChange}
            onAddTask={(groupId, title) => handleAddTask(groupId, title)}
            onMenuClick={(e, id) => setAnchorGroupMenu({
                anchor: e.currentTarget,
                groupId: id,
                title
            })}
        >
            {children}
        </Group>)
    }

    const renderGroupAdder = () => (
        <TextInput
            variant='horizontal'
            holderText='+ Add another group'
            inputPlaceHolderText='Enter group title...'
            onAdd={async (title) => {
                await handleAddGroup(id, title);
            }}
        />
    )

    const renderTask = (task, index) => {
        const { id, title, description, estimateTime, spendTime, groupId } = task;
        var dragUpState = false;
        if (dragUp.groupId === groupId && dragUp.taskId === id) dragUpState = true;
        return (<Task id={id}
            key={id}
            index={index}
            title={title}
            groupId={groupId}
            onTaskShouldDrop={handleSortTask}
            onDragChange={handleDragChange}
            dragUp={dragUpState}
            onTaskOpen={() => handleTaskDialog(true, { id, groupId, title, description, estimateTime, spendTime })}
        >
            {description}
        </Task>)
    }

    const renderGroupMenu = () => (
        <Menu
            id={anchorGroupMenu.groupId}
            open={Boolean(anchorGroupMenu.anchor)}
            anchorEl={anchorGroupMenu.anchor}
            onClose={() => setAnchorGroupMenu({ anchor: null, groupId: null })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center', }}
            transformOrigin={{ vertical: 'top', horizontal: 'center', }}
        >
            <MenuItem
                onClick={() => {
                    setConfirmDelete({
                        open: true,
                        title: anchorGroupMenu.title,
                        action: () => handleDeleteGroup(anchorGroupMenu.groupId)
                    })
                    setAnchorGroupMenu({ anchor: null, groupId: null })
                }}
                style={{ color: 'red' }}
            >
                <IconDeleteForever style={{ color: 'red' }} className={classes.icon} />
                Delete
            </MenuItem>
        </Menu>
    )

    const renderDeleteGroupConfirmBox = () => (
        <ConfirmBox
            open={confirmDelete.open}
            title='Delete confirm'
            message={`Do you want to delete ${confirmDelete.title}`}
            variant='delete'
            onClose={() => setConfirmDelete({ open: false })}
            actionLabel='delete'
            action={confirmDelete.action}
        />
    )

    if (auth.id === null) return <Redirect to='/auth/login' />

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={classes.root}>
                <BoardHeader/>
                <div className='board'>
                    {data.groups.map((group, index) => {
                        var tasks = group.tasks.map((task, t_index) => {
                            return renderTask({ ...task, groupId: group.id }, t_index)
                        })
                        return renderGroup(group, index, tasks)
                    })}
                    {renderGroupAdder()}
                </div>
                {renderGroupMenu()}
                {renderDeleteGroupConfirmBox()}
                {taskDialog.open &&
                    <TaskDialog
                        {...taskDialog}
                        onClose={() => {handleTaskDialog(false)}}
                        members={data.members}
                    />}
                <MessageDialog
                    open={data.error!==''}
                    title={data.error}
                    error
                    onClose={() => handleClearError()}
                />
            </div >
        </DndProvider >
    )
}

Board.propTypes = {
    boardName: PropTypes.string,
    id: PropTypes.number
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        load: ProjectThunk.load,
        moveTask: ProjectThunk.moveTask,
        handleOnSortGroups: ProjectThunk.SortGroups,
        handleSortTask: ProjectThunk.SortTasks,
        handleAddTask: ProjectThunk.addTask,
        handleDeleteTask: ProjectThunk.deleteTask,
        handleUpdateTask: ProjectThunk.updateTask,
        handleAddGroup: ProjectThunk.addGroup,
        handleDeleteGroup: ProjectThunk.deleteGroup,
        handleClearStatus: ProjectThunk.clearStatus,
        handleClearError: ProjectThunk.clearError,
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Board)

