import {AUTH} from '../Types'

export const clearStatus = () => ({
    type: AUTH.CLEAR_STATUS
})

export const loginStart = () => ({
    type: AUTH.LOGIN_START,
})
export const loginSuccess = (payload) => ({
    type: AUTH.LOGIN_SUCCESS,
    payload
})
export const loginFail = (error) => ({
    type: AUTH.LOGIN_FAIL,
    payload: {
        error
    }
})
export const logout = () => ({
    type: AUTH.LOGOUT,
})
export const update = (payload) => ({
    type: AUTH.UPDATE,
    payload
})
