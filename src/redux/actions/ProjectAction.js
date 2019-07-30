import { PROJECT } from '../Types'

export const loadStart = () => ({
    type: PROJECT.LOAD_START,
})
export const loadSuccess = (id, groups) => ({
    type: PROJECT.LOAD_SUCCESS,
    payload: {
        id,
        groups: groups
    }
})
export const loadFail = (error) => ({
    type: PROJECT.LOAD_FAIL,
    error
})
export const update = (groups) => ({
    type: PROJECT.UPDATE,
    payload: {
        groups
    }
})

export const addTask = (groupId, payload) => ({
    type: PROJECT.ADD_TASK,
    payload:{
        id: groupId,
        task: payload
    }
})

export const addGroup = (payload) => ({
    type: PROJECT.ADD_TASK,
    payload
})
