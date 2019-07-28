import {AUTH} from '../Types'
export const loginStart = () => ({
    type: AUTH.LOGIN_START,
    payload: {
        status: 'load'
    }
})
export const loginSuccess = (token) => ({
    type: AUTH.LOGIN_SUCCESS,
    payload: {
        status: 'done',
        token
    }
})
export const loginFail = () => ({
    type: AUTH.LOGIN_FAIL,
    payload: {
        status: 'fail'
    }
})
export const logout = () => ({
    type: AUTH.LOGOUT,
    payload: {
        status: null,
    }
})