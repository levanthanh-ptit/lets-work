import * as Project from '../actions/ProjectAction'
import axios from '../../axios/axios'

export function load(id) {
    return async (dispatch, getState) => {
        dispatch(Project.loadStart());
        axios.get(
            `/project/${id}/groups`
        ).then(res => {
            dispatch(Project.loadSuccess(id, res.data));
        }).catch(err => {
            dispatch(Project.loadFail())
        })
    }
}

export function handleOnSort(feild, srcId, desId, direct) {
    return (dispatch, getState) => {
        const data = getState().Project;
        var arr = data[feild];
        let delIndex = arr.findIndex(e => { return e.id === srcId });
        let srcElement = arr.find(e => { return e.id === srcId });
        arr.splice(delIndex, 1);
        let insertIndex = arr.findIndex(e => { return e.id === desId }) + (direct ? 1 : 0);
        arr.splice(insertIndex, 0, srcElement);
        dispatch(Project.update(arr))
    }
}

export function moveTask(taskId, srcGroupId, targetGroupId) {
    return async (dispatch, getState) => {
        try {
            await axios.post(`/task/change-group?id=${taskId}&target_group_id=${targetGroupId}`);
            const data = getState().Project;
            let arr = data.groups;
            let srcGroupIndex = arr.findIndex(group => { return group.id === srcGroupId });
            let taskIndex = arr[srcGroupIndex].tasks.findIndex(t => { return t.id === taskId });
            let task = arr[srcGroupIndex].tasks[taskIndex];
            let targetGroupIndex = arr.findIndex(group => { return group.id === targetGroupId; });
            arr[srcGroupIndex].tasks.splice(taskIndex, 1);
            arr[targetGroupIndex].tasks = [...arr[targetGroupIndex].tasks, task];
            dispatch(Project.update(arr))
        } catch (error) {
            console.log(error);
        }

    }
}

export function handleSortTask(groupId, srcId, desId, direct) {
    return (dispatch, getState) => {
        const data = getState().Project;
        let superArr = data.groups;
        var index = superArr.findIndex(e => { return e.id === groupId });
        let delIndex = superArr[index].tasks.findIndex(e => { return e.id === srcId });
        let srcElement = superArr[index].tasks.find(e => { return e.id === srcId });
        superArr[index].tasks.splice(delIndex, 1);
        let insertIndex = superArr[index].tasks.findIndex(e => { return e.id === desId }) + (direct ? 1 : 0);
        superArr[index].tasks.splice(insertIndex, 0, srcElement);
        dispatch(Project.update(superArr))
    }
}

export function addNewTask(groupId, title){
    return async (dispatch, getState) => {
        dispatch(Project.loadStart());
        axios.post(
            `/group/${groupId}/add-task`,
            {
                title
            }
        ).then(res => {
            dispatch((res.data));
        }).catch(err => {
            dispatch(Project.loadFail())
        })
    }
}