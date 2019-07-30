import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import * as color from '../../../components/assets/color';
import './Board.scss'

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';

import * as Thunk from '../../../redux/thunk/ProjectThunk'
import Group from '../../../components/Group/Group';    
import Task from '../../../components/Group/Task/Task';
import TaskDialog from './TaskDialog'

const useStyle = makeStyles(theme => ({

    root: {
        flexGrow: 1,
        boxSizing: 'border-box',
        marginTop: theme.spacing(6),
        display: 'flex',
        flexDirection: 'column',
    },
    subBar: {
        background: color.color_bg_black40,
        boxShadow: 'none'
    },
    columnWrap: {
        display: 'inline-block',
    },
    column: {
        backgroundColor: color.color_bg_white90,
        height: theme.spacing(20),
        width: theme.spacing(30),
        borderRadius: theme.spacing(1),
    }
}))

function Board(props) {
    const classes = useStyle();
    const { id, boardName, data, load, moveTask, handleOnSort, handleSortTask } = props;

    const [taskDialog, setTaskDialog] = useState({
        open: false,
        id: null
    })
    const [dragUp, setDragUp] = useState({
        groupId: 0,
        taskId: 0
    })
    console.log(data);
    
    useEffect(() => {
        load(id);
    }, [])

    const handleDragChange = (groupId, taskId) => {
        setDragUp({groupId, taskId})
    }

    const handleTaskDialogOpen = (id) => {
        setTaskDialog({
            open: true,
            id
        })
    }

    const handleTaskDialogClose = () => {
        setTaskDialog({
            open: false,
            id: null,
        })
    }

    const renderBoardHeader = () => (
        <Fade in timeout={1000}>
            <AppBar
                className={classes.subBar}
                position='static'
            >
                <Toolbar variant="regular">
                    {boardName}
                </Toolbar>
            </AppBar>
        </Fade>
    )

    const renderTaskGroup = (taskGroup, index, children) => {
        const { id, title, } = taskGroup;
        return (<Group id={id}
            key={id}
            index={index}
            title={title}
            onGroupShouldDrop={handleOnSort}
            onTaskShouldDrop={moveTask}
            onDrapChange={handleDragChange}
        >
            {children}
        </Group>)
    }

    const renderTask = (task, index) => {
        const { id, title, description, groupId } = task;
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
            onTaskOpen={handleTaskDialogOpen}
        >
            {description}
        </Task>)
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={classes.root}>
                {renderBoardHeader()}
                <div className='board-canvas'>
                    <div id='board'>
                        {data.groups.map((group, index) => {
                            var tasks = group.tasks.map((task, t_index) => {
                                return renderTask({ ...task, groupId: group.id }, t_index)
                            })
                            return renderTaskGroup(group, index, tasks)
                        })}
                    </div>
                </div>
                <TaskDialog open={taskDialog.open} id={taskDialog.id} onClose={handleTaskDialogClose} />
            </div >
        </DndProvider >
    )
}

Board.propTypes = {
    boardName: PropTypes.string,
    id: PropTypes.number
}

const mapStateToProps = ({ Project }) => ({
    data: Project
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        load: Thunk.load,
        moveTask: Thunk.moveTask,
        handleOnSort: Thunk.handleOnSort,
        handleSortTask: Thunk.handleSortTask,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)

