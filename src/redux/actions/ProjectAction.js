import { PROJECT } from '../Types'

export const clearStatus = () => ({
    type: PROJECT.CLEAR_STATUS
})
export const clearError = () => ({
    type: PROJECT.CLEAR_ERROR
})
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
    payload: error
})

export const updateSuccess = (payload) => ({
    type: PROJECT.UPDATE_SUCCESS,
    payload: {
        ...payload
    }
})
export const updateFail = (error) => ({
    type: PROJECT.UPDATE_FAIL,
    payload: error
})
export const addFail = () => ({
    type: PROJECT.ADD_FAIL
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
