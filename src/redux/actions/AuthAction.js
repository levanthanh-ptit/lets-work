import {AUTH} from '../Types'
export const loginStart = () => ({
    type: AUTH.LOGIN_START,
})
export const loginSuccess = (token) => ({
    type: AUTH.LOGIN_SUCCESS,
    payload: {
        token
    }
})
export const loginFail = () => ({
    type: AUTH.LOGIN_FAIL,
})
export const logout = () => ({
    type: AUTH.LOGOUT,
})
export const sessionLogin = (token) => ({
    type: AUTH.SESSION_LOGIN,
    payload: {
        token
    }
})