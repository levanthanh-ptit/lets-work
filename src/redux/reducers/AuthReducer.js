import { AUTH } from '../Types';

const initialState = {
    id: null,
    userName: '',
    firstName: '',
    lastName: '',
    email: null,
    company: null,
    bio: null,
    country: null,
    status: null,
    error: '',
    token: null
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH.CLEAR_STATUS:
            return { ...state, status: null}
        case AUTH.LOGIN_START:
            return { ...state, ...payload, status: type }
        case AUTH.LOGIN_SUCCESS:
            return { ...state, ...payload, status: type }
        case AUTH.LOGIN_FAIL:
            return { ...state, ...payload, status: type }
        case AUTH.LOGOUT:
            return { ...initialState}
        case AUTH.SESSION_LOGIN:
            return { ...state, ...payload, status: AUTH.LOGIN_SUCCESS }
        case AUTH.UPDATE:
            return { ...state, ...payload, status: AUTH.LOGIN_SUCCESS }
        default:
            return state
    }
}
