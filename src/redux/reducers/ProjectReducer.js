import { PROJECT } from '../Types'

const initialState = {
    status: null,
    id: null,
    error: '',
    groups: [],
    members: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROJECT.CLEAR_STATUS:
            return { ...state, status: null }
        case PROJECT.CLEAR_ERROR:
            return { ...state, error: '' }
        case PROJECT.LOAD_START:
            return {
                ...state,
                status: PROJECT.LOAD_START
            }
        case PROJECT.CLEAN:
            return {
                status: PROJECT.CLEAN,
                id: null,
                error: '',
                groups: [],
                members: []
            }
        case PROJECT.LOAD_SUCCESS:
            return {
                ...state,
                status: PROJECT.LOAD_SUCCESS,
                ...payload
            }
        case PROJECT.LOAD_FAIL:
            return {
                ...state,
                status: PROJECT.LOAD_FAIL,
                error: payload,
            }
        case PROJECT.UPDATE_START:
            return {
                ...state,
                status: PROJECT.UPDATE_START,
            }
        case PROJECT.UPDATE_SUCCESS:
            return {
                ...state,
                status: PROJECT.UPDATE_SUCCESS,
                ...payload
            }
        case PROJECT.UPDATE_FAIL:
            return {
                ...state,
                status: PROJECT.UPDATE_FAIL,
                error: payload,
            }
        case PROJECT.ADD_TASK: {
            let groups = state.groups;
            let index = groups.findIndex((e) => { return e.id === payload.id });
            groups[index].tasks.push(payload.task)
            return {
                ...state,
                groups
            }
        }
        case PROJECT.ADD_GROUP: {
            let groups = state.groups;
            groups.push(payload);
            return {
                ...state,
                groups
            }
        }
        case PROJECT.ADD_USER: {
            return {
                ...state,
                members: [...state.members, payload]
            }
        }
        default:
            return state
    }
}
