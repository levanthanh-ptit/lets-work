import { PROJECT } from '../Types'

export const loadStart = () => ({
    type: PROJECT.LOAD_START,
})
export const clean = () => ({
    type: PROJECT.CLEAN,
})
export const loadSuccess = (payload) => ({
    type: PROJECT.LOAD_SUCCESS,
    payload: {
        ...payload
    }
})
export const loadFail = (error) => ({
    type: PROJECT.LOAD_FAIL,
    error
})
export const update = (payload) => ({
    type: PROJECT.UPDATE,
    payload: {
        ...payload
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
    type: PROJECT.ADD_GROUP,
    payload:{
        ...payload,
        tasks:[]
    }
})

export const addMember = (payload) => ({
    type: PROJECT.ADD_USER,
    payload
})
