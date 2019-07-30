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
        case PROJECT.ADD_TASK:
            return {
                ...state,
                groups: [ ...state.groups.push(payload)]
            }
        default:
            return state
    }
}
