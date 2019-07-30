import { PROJECT } from '../Types'

const initialState = {
    status: "load",
    id: 6,
    groups: [],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PROJECT.LOAD_START:
            return {
                ...state,
                status: 'load'
            }
        case PROJECT.LOAD_SUCCESS:
            return {
                ...state,
                status: 'done',
                ...payload
            }
        case PROJECT.LOAD_FAIL:
            return {
                ...state,
                status: 'fail'
            }
        case PROJECT.UPDATE:
            return {
                ...state,
                status: 'done',
                ...payload
            }
        case PROJECT.ADD_TASK: {
            let groups = state.groups;
            let index = groups.findIndex((e) => { return e.id === payload.id });
            groups[index].tasks.push(payload.task)
            console.log(groups);

            return {
                ...state,
                groups
            }
        }
        case PROJECT.ADD_GROUP: {
            let groups = state.groups;
            groups.push(payload)
            return {
                ...state,
                groups
            }
        }
        default:
            return state
    }
}
