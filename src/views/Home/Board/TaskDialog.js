import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import TaskDetail from '../../../components/TaskDetail/TaskDetail';


function TaskDialog(props) {
    const { open, id, onClose } = props;

    const [state, setState] = useState({
        title: "",
        content: "",
        estmateTime: 0,
        spendTome: 0,
        loading: true,
    })

    const handleTaskEdit = (feild, value) => {
        setState({
            ...state,
            [feild]: value
        })
    }

    useEffect(() => {
        
    }, [id])
    return (
        <TaskDetail
            open={open}
            onClose={onClose}
            id={id}
            title={id}
        />
    )
}

TaskDialog.propTypes = {
    open: PropTypes.bool,
    id: PropTypes.number,
    onClose: PropTypes.func
}

export default TaskDialog

