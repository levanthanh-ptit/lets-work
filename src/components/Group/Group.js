import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import './Group.scss'

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { Types as TaskTypes } from './Task/Task'

export const Types = {
    GROUP: 'GROUP',
}

function Group(props) {
    const { id, index, title, children, onGroupShouldDrop, onTaskShouldDrop, onDrapChange } = props;

    const [addTask, setAddTask] = useState({
        open: false,
        title: "",
    });

    const [, drag] = useDrag({
        item: {
            type: Types.TASK_GROUP,
            id,
            index,
        },
    });

    const [{ isGroupOver }, drop] = useDrop({
        accept: [Types.TASK_GROUP, TaskTypes.TASK],
        hover(item, monitor) {
            if (item.type === Types.TASK_GROUP) {
                if (item.index === props.index)
                    return
                onGroupShouldDrop('groups', item.id, id, index > item.index);
                monitor.getItem().index = index;
            }
        },
        drop(item) {
            onDrapChange(0, 0)
            if (item.type === TaskTypes.TASK) {
                if (item.groupId === id) return;
                onTaskShouldDrop(item.id, item.groupId, id);
            }
        },
        collect(monitor) {
            return {
                isGroupOver:
                    monitor.isOver({ shallow: true })
                    && monitor.getItemType() === Types.TASK_GROUP,
                isTaskOver:
                    monitor.isOver({ shallow: false })
                    && monitor.getItemType() === TaskTypes.TASK
                    && monitor.getItem().groupId !== id
            }
        }

    })

    const handleOpenAddTask = () => {
        setAddTask({
            ...addTask,
            open: !addTask.open,
            title: ''
        })
    }

    const renderAddTaskInput = () => (
        <ClickAwayListener onClickAway={handleOpenAddTask}>
            <div className="addTask">
                <input 
                    placeholder='Enter title for this card...' 
                    value={addTask.title}
                    onChange={e => setAddTask({...addTask, title: e.target.value})}
                />
                <Button className="btnAddTask" size="small">add</Button>
                <button className="btnCancelAddTask" onClick={handleOpenAddTask}>X</button>
            </div>
        </ClickAwayListener>
    )

    return drop(
        <div className={`TaskGroupContainerWrap ${isGroupOver ? "over" : ""}`} >
            {drag(
                <div
                    className={`TaskGroupContainer`}
                >
                    <div className='title'>
                        {title}
                    </div>
                    <div className="content">
                        {children}
                        {addTask.open ?
                            renderAddTaskInput()
                            :
                            <div
                                className={`addTaskHolder`}
                                onClick={() => handleOpenAddTask()}
                            >
                                + Add a card here
                            </div>

                        }
                    </div>
                </div>
            )}
        </div>
    )
}

Group.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onGroupShouldDrop: PropTypes.func.isRequired,
    onTaskShouldDrop: PropTypes.func,
    onDrapChange: PropTypes.func,
    onAddTask: PropTypes.func,
}

export default Group



