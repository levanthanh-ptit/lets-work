import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import axios from '../../../axios/axios'
import { makeStyles } from '@material-ui/core/styles';
import * as color from '../../../components/assets/color';
import './Board.scss'

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';

import TaskGroup from '../../../components/TaskGroup/TaskGroup';
import Task from '../../../components/TaskGroup/Task/Task';
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
    const { id, boardName } = props;
    const [taskDialog, setTaskDialog] = useState({
        open: false,
        id: null
    })
    const [data, setData] = useState({
        groups: [
            // {
            //     id: 15, title: 'Inprocess',
            //     tasks: [
            //         { id: 1, title: 'To do', description: 'too much' },
            //         { id: 2, title: 'Inprocess', description: 'not many' },
            //     ]
            // },
            // {
            //     id: 16, title: 'Bug',
            //     tasks: [
            //         { id: 3, title: 'Inprocess', description: 'not many' },
            //         { id: 4, title: 'Bug', description: 'a lot' },
            //         { id: 5, title: 'Done', description: 'WTF is this' }
            //     ]
            // },
            // {
            //     id: 17, title: 'Done',
            //     tasks: [
            //         { id: 6, title: 'To do', description: 'too much' },
            //         { id: 7, title: 'Inprocess', description: 'not many' },
            //         { id: 8, title: 'Bug', description: 'a lot' },
            //         { id: 9, title: 'Done', description: 'WTF is this' }
            //     ]
            // },
            // {
            //     id: 18, title: 'To do',
            //     tasks: [
            //         { id: 10, title: 'To do', description: 'too much' },
            //         { id: 11, title: 'Inprocess', description: 'not many' },
            //         { id: 12, title: 'Bug', description: 'a lot' },
            //         { id: 13, title: 'Done', description: 'WTF is this' }
            //     ]
            // },
        ],
    });

    const [dragUp, setDragUp] = useState({
        groupId: null,
        taskId: null,
    })

    useEffect(() => {
        const fetchData = async () => {
            axios.get(
                `/project/6/groups`
            ).then(data => {
                setData({ groups: data.data })
            }).catch(err => {

            })
        }
        fetchData();
    }, [id])

    function getTask(groupId, id) {
        var group = data.groups.find(e => { return e.id === groupId });
        return group.tasks.find(e => { return e.id === id })
    }

    function moveTask(taskId, srcGroupId, targetGroupId) {
        let arr = data.groups;

        let srcGroupIndex = arr.findIndex(group => { return group.id === srcGroupId });
        let taskIndex = arr[srcGroupIndex].tasks.findIndex(t => { return t.id === taskId });
        let task = arr[srcGroupIndex].tasks[taskIndex];
        let targetGroupIndex = arr.findIndex(group => { return group.id === targetGroupId; });
        arr[srcGroupIndex].tasks.splice(taskIndex, 1);
        arr[targetGroupIndex].tasks = [...arr[targetGroupIndex].tasks, task];
        setData({
            ...data,
            groups: arr,
        })
    }

    function handleOnSort(feild, srcId, desId, direct) {
        var arr = data[feild];
        let delIndex = arr.findIndex(e => { return e.id === srcId });
        let srcElement = arr.find(e => { return e.id === srcId });
        arr.splice(delIndex, 1);
        let insertIndex = arr.findIndex(e => { return e.id === desId }) + (direct ? 1 : 0);
        arr.splice(insertIndex, 0, srcElement);
        setData({
            ...data,
            [feild]: arr,
        })
    }

    function handleOnSortTask(groupId, srcId, desId, direct) {
        var superArr = data.groups;
        var index = superArr.findIndex(e => { return e.id === groupId });
        let delIndex = superArr[index].tasks.findIndex(e => { return e.id === srcId });
        let srcElement = superArr[index].tasks.find(e => { return e.id === srcId });
        superArr[index].tasks.splice(delIndex, 1);
        let insertIndex = superArr[index].tasks.findIndex(e => { return e.id === desId }) + (direct ? 1 : 0);
        superArr[index].tasks.splice(insertIndex, 0, srcElement);
        setData({
            ...data,
            groups: superArr
        })
    }

    const handleDragChange = (groupId, taskId) => {
        setDragUp(groupId, taskId)
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
                    {data.boardName}
                </Toolbar>
            </AppBar>
        </Fade>
    )

    const renderTaskGroup = (taskGroup, index, children) => {
        const { id, title, } = taskGroup;
        return (<TaskGroup id={id}
            key={id}
            index={index}
            title={title}
            onGroupShouldDrop={handleOnSort}
            onTaskShouldDrop={moveTask}
            onDrapChange={handleDragChange}
        >
            {children}
        </TaskGroup>)
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
            onTaskShouldDrop={handleOnSortTask}
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
                        {
                            data.groups.map((group, index) => {
                                var tasks = group.tasks.map((task, t_index) => {
                                    return renderTask({ ...task, groupId: group.id }, t_index)
                                })
                                return renderTaskGroup(group, index, tasks)
                            })
                        }
                    </div>
                </div>
                <TaskDialog open={taskDialog.open} id={taskDialog.id} onClose={handleTaskDialogClose} />
            </div >
        </DndProvider >
    )
}

Board.propTypes = {

}

export default Board

