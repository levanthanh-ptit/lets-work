import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import './Group.scss'

import { Types as TaskTypes } from './Task/Task'
import TextInput from '../TextInput/TextInput'
import IconButton from '@material-ui/core/IconButton'
import IconMenu from '@material-ui/icons/MoreVert'

export const Types = {
    GROUP: 'GROUP',
}

function Group(props) {
    const { id, index, title, children,
        onGroupShouldDrop,
        onTaskShouldDrop,
        onDrapChange,
        onAddTask,
        onMenuClick } = props;

    const [, drag] = useDrag({
        item: {
            type: Types.GROUP,
            id,
            index,
        },
    });

    const [{ isGroupOver }, drop] = useDrop({
        accept: [Types.GROUP, TaskTypes.TASK],
        hover(item, monitor) {
            if (item.type === Types.GROUP) {
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
                    && monitor.getItemType() === Types.GROUP,
                isTaskOver:
                    monitor.isOver({ shallow: false })
                    && monitor.getItemType() === TaskTypes.TASK
                    && monitor.getItem().groupId !== id
            }
        }

    })

    return drop(
        <div className={`TaskGroupContainerWrap ${isGroupOver ? "over" : ""}`} >
            {drag(
                <div
                    className={`TaskGroupContainer`}
                >
                    <div className='title'>
                        <div className="text">{title}</div>
                        <IconButton size="small" onClick={ e => onMenuClick(e, id)}><IconMenu fontSize="small"/></IconButton>
                    </div>
                    <div className="content">
                        {children}
                        <TextInput
                            holderText='+ Add a card here'
                            inputPlaceHolderText='Enter title for this card...'
                            holderStyle={{
                                padding: 0,
                            }}
                            theme='light'
                            onAdd={(title)=>onAddTask(id, title)}
                        />
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
    onMenuClick: PropTypes.func,
}

export default Group



