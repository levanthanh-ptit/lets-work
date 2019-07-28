import { AUTH } from '../Types';

const initialState = {
    token: null,
    status: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case AUTH.LOGIN_START:
            return { ...state, ...payload }
        case AUTH.LOGIN_SUCCESS:
            return { ...state, ...payload }
        case AUTH.LOGIN_FAIL:
            return { ...state, ...payload }
        case AUTH.LOGOUT:
            return { ...state, ...payload }
        default:
            return state
    }
}
