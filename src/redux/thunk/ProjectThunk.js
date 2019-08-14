import * as ProjectAction from '../actions/ProjectAction'
import axios from '../../axios/axios'
import {PROJECT} from '../Types'
import _ from 'lodash'

export function clearStatus() {
    return dispatch => {
        dispatch(ProjectAction.clearStatus())
    }
}
export function load(id) {
    return async (dispatch, getState) => {
        const {Project} = getState();
        if(Project.status === id) return
        dispatch(ProjectAction.clean());
        dispatch(ProjectAction.loadStart());
        axios.get(
            `/project/${id}/groups`
        ).then(res => {
            if(res.status !== 200) return
            dispatch(ProjectAction.loadSuccess({ id, groups: res.data }));
        }).catch(err => {
            dispatch(ProjectAction.loadFail())
        })
        axios.get(
            `/project/${id}/ownerships`
        ).then(res => {
            if(res.status !== 200) return
            dispatch(ProjectAction.loadSuccess({ members: res.data }));
        }).catch(err => {
            dispatch(ProjectAction.loadFail())
        })
    }
}

export function SortGroups(srcId, desId, direct) {
    return (dispatch, getState) => {
        const data = getState().Project;
        var groups = data.groups;
        let delIndex = groups.findIndex(e => { return e.id === srcId });
        let srcElement = groups.find(e => { return e.id === srcId });
        groups.splice(delIndex, 1);
        let insertIndex = groups.findIndex(e => { return e.id === desId }) + (direct ? 1 : 0);
        groups.splice(insertIndex, 0, srcElement);
        dispatch(ProjectAction.update({groups}))
    }
}

export function moveTask(taskId, srcGroupId, targetGroupId) {
    return async (dispatch, getState) => {
        try {
            await axios.post(`/task/change-group?id=${taskId}&target_group_id=${targetGroupId}`);
            var {groups} = getState().Project;
            let srcGroupIndex = groups.findIndex(group => { return group.id === srcGroupId });
            let taskIndex = groups[srcGroupIndex].tasks.findIndex(t => { return t.id === taskId });
            let task = groups[srcGroupIndex].tasks[taskIndex];
            let targetGroupIndex = groups.findIndex(group => { return group.id === targetGroupId; });
            groups[srcGroupIndex].tasks.splice(taskIndex, 1);
            groups[targetGroupIndex].tasks = [...groups[targetGroupIndex].tasks, task];
            dispatch(ProjectAction.update({groups}))
        } catch (error) {
        }

    }
}

export function SortTasks(groupId, srcId, desId, direct) {
    return (dispatch, getState) => {
        var {groups} = getState().Project;
        var index = groups.findIndex(e => { return e.id === groupId });
        let delIndex = groups[index].tasks.findIndex(e => { return e.id === srcId });
        let srcElement = groups[index].tasks.find(e => { return e.id === srcId });
        groups[index].tasks.splice(delIndex, 1);
        let insertIndex = groups[index].tasks.findIndex(e => { return e.id === desId }) + (direct ? 1 : 0);
        groups[index].tasks.splice(insertIndex, 0, srcElement);
        dispatch(ProjectAction.update({groups}))
    }
}

export function addTask(groupId, title) {
    return async (dispatch, getState) => {
        dispatch(ProjectAction.loadStart());
        axios.post(
            `/group/${groupId}/add-task`,
            {
                title
            }
        ).then(res => {
            dispatch(ProjectAction.addTask(groupId, res.data));
        }).catch(err => {
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
export function addGroup(projectId, title) {
    return async (dispatch, getState) => {
        axios.post(
            `/project/${projectId}/add-group`,
            {
                title
            }
        ).then(res => {
            dispatch(ProjectAction.addGroup(res.data));
        }).catch(error => {
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
        })
    }
}
export function addMember(userId, fullName) {
    return async (dispatch, getState) => {
        let {Project} = getState();
        await axios.post(
            `/project/${Project.id}/add-user?user_id=${userId}&role=dev`,
        ).then(res => {
            dispatch(ProjectAction.addMember({ id: userId, fullName, ownership: 'dev' }));
        }).catch(err => {
        })
    }
}