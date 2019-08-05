import * as ProjectAction from '../actions/ProjectAction'
import axios from '../../axios/axios'
import _ from 'lodash'

export function load(id) {
    return async (dispatch, getState) => {
        dispatch(ProjectAction.loadStart());
        axios.get(
            `/project/${id}/groups`
        ).then(res => {
            dispatch(ProjectAction.loadSuccess({ id, groups: res.data }));
            //then get all member
            axios.get(
                `/project/${id}/ownerships`
            ).then(res => {
                dispatch(ProjectAction.loadSuccess({ members: res.data }));
            })
        }).catch(err => {
            dispatch(ProjectAction.loadFail())
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
        dispatch(ProjectAction.update({ [feild]: arr }))
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
            dispatch(ProjectAction.update(arr))
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
        dispatch(ProjectAction.update(superArr))
    }
}

export function addTask(groupId, title, callback) {
    return async (dispatch, getState) => {
        dispatch(ProjectAction.loadStart());
        axios.post(
            `/group/${groupId}/add-task`,
            {
                title
            }
        ).then(res => {
            callback();
            dispatch(ProjectAction.addTask(groupId, res.data));
            console.log(res.data);
        }).catch(err => {
            dispatch(ProjectAction.loadFail())
        })
    }
}
export function deleteTask(taskId, groupId) {
    return async (dispatch, getState) => {
        await axios.delete(
            `/task/${taskId}`,
            {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }
        ).then(res => {
            let { groups } = getState().Project;
            let indexG = groups.findIndex(e => {
                return e.id === groupId
            })
            let index = groups[indexG].tasks.findIndex(e => {
                return e.id === taskId
            })
            groups[indexG].tasks.splice(index, 1);
            dispatch(ProjectAction.update({ groups }));

        }).catch(err => {
            console.log(err);
            dispatch(ProjectAction.loadFail())
        })
    }
}
export function updateTask(groupId, task) {
    const { id, title, description, estimateTime, spendTime } = task;
    return async (dispatch, getState) => {
        dispatch(ProjectAction.loadStart());
        let { groups } = await getState().Project;
        let index = await groups.findIndex(v => { return v.id === groupId });
        let indexT = await groups[index].tasks.findIndex(v => { return v.id === id });
        if (!_.isEqual(task, groups[index].tasks[indexT])) {
            groups[index].tasks[indexT] = task;
            await axios.patch(
                `/task/${id}`,
                {
                    title, description, estimateTime, spendTime
                }
            ).then(res => {
                dispatch(ProjectAction.update({groups}));
            }).catch(err => {
                dispatch(ProjectAction.loadFail())
            })
        }

    }
}
export function addGroup(projectId, title, callback) {
    return async (dispatch, getState) => {
        axios.post(
            `/project/${projectId}/add-group`,
            {
                title
            }
        ).then(res => {
            console.log(res.data);
            dispatch(ProjectAction.addGroup(res.data));
            console.log("pass");
            callback();
        }).catch(err => {
            console.log(err);
            dispatch(ProjectAction.loadFail())
        })
    }
}
export function deleteGroup(groupId) {
    return async (dispatch, getState) => {
        await axios.delete(
            `/group/${groupId}`,
            {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }
        ).then(res => {
            let { groups } = getState().Project;
            let index = groups.findIndex(e => {
                return e.id === groupId
            })
            groups.splice(index, 1);
            dispatch(ProjectAction.update({ groups }));

        }).catch(err => {
            console.log(err);
            dispatch(ProjectAction.loadFail())
        })
    }
}