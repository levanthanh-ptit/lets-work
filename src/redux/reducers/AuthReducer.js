import { AUTH } from '../Types';

const initialState = {
    userId: null,
    token: null,
    status: null,
    error: "",
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case AUTH.LOGIN_START:
            return { ...state, ...payload, status: type }
        case AUTH.LOGIN_SUCCESS:
            return { ...state, ...payload, status: type }
        case AUTH.LOGIN_FAIL:
            return { ...state, ...payload, status: type }
        case AUTH.LOGOUT:
            return { ...state, ...payload, status: null }
        case AUTH.SESSION_LOGIN:
            return { ...state, ...payload, status: AUTH.LOGIN_SUCCESS }
        default:
            return state
    }
}
