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
export const loadFail = () => ({
    type: PROJECT.LOAD_FAIL,
})
export const update = (groups) => ({
    type: PROJECT.UPDATE,
    payload: {
        groups
    }
})

export const addTask = (payload) => ({
    type: PROJECT.ADD_TASK,
    payload
})

