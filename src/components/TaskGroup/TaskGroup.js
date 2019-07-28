import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';

import './TaskGroup.scss'

import { Types as TaskTypes } from './Task/Task'
export const Types = {
    TASK_GROUP: 'TASK_GROUP',
}

function TaskGroup(props) {
    const { id, index, title, children, onGroupShouldDrop, onTaskShouldDrop, onDrapChange } = props;
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
            onDrapChange(null, null)
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

    const handleAddTask = () => {
        alert('a')
    }

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
                        <div className={`addTaskHolder`} onClick={() => handleAddTask()}>+ Add a card here</div>
                    </div>
                </div>
            )}
        </div>
    )
}

TaskGroup.propTypes = {
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    onGroupShouldDrop: PropTypes.func.isRequired,
    onTaskShouldDrop: PropTypes.func,
    onDrapChange: PropTypes.func,
}

export default TaskGroup



