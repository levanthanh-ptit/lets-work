import { PROJECT } from '../Types'

const initialState = {
    status: null,
    id: null,
    groups: [],
    members:[]
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROJECT.LOAD_START:
            return {
                ...state,
                status: PROJECT.LOAD_START
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
                status: PROJECT.LOAD_FAIL
            }
        case PROJECT.UPDATE:
            return {
                ...state,
                status: PROJECT.LOAD_SUCCESS,
                ...payload
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
            console.log(groups);
            groups.push(payload);
            console.log(groups);
            return {
                ...state,
                groups
            }
        }
        default:
            return state
    }
}
