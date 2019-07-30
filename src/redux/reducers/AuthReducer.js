import { AUTH } from '../Types';

const initialState = {
    token: null,
    status: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case AUTH.LOGIN_START:
            return { ...state, ...payload, status: type }
        case AUTH.LOGIN_SUCCESS:
            return { ...state, ...payload, status: type }
        case AUTH.LOGIN_FAIL:
            return { ...state, ...payload,  status: type }
        case AUTH.LOGOUT:
            return { ...state, ...payload,  status: type }
        default:
            return state
    }
}
