import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import './Task.scss'

export const Types = {
    TASK: "TASK",
}

function Task(props) {
    const { id, groupId, index, title, children,
        onTaskShouldDrop, onDragChange,
        dragUp, onTaskOpen } = props;

    const [, drag] = useDrag({
        item: {
            type: Types.TASK,
            id,
            index,
            groupId,
        },
        begin(monitor) {
            onDragChange(groupId, id);
        }
    });

    const [, drop] = useDrop({
        accept: Types.TASK,
        hover(item, monitor) {
            if (item.index === props.index || item.groupId !== groupId)
                return
            onTaskShouldDrop(groupId, item.id, id, index > item.index);
            monitor.getItem().index = index;
        },
        drop() {
            onDragChange(0, 0)
        },
    })

    const renderContainer = () => (
        <div className="TaskContainer" onClick={() => onTaskOpen(id)}>
            <div className="title">{title}</div>
            <div className="content">{children}</div>
        </div>
    )

    return drop(
        <div className={`TaskContainerWrap ${dragUp ? "over" : ""}`}>
            {drag(renderContainer())}
        </div>
    )
}

Task.propTypes = {
    id: PropTypes.number,
    groupId: PropTypes.number,
    index: PropTypes.number.isRequired,
    onTaskShouldDrop: PropTypes.func.isRequired,
    onDragChange: PropTypes.func,
    dragUp: PropTypes.bool,
    onTaskOpen: PropTypes.func,
    onDeleteTask: PropTypes.func,
}

export default Task

