import * as Auth from '../actions/AuthAction'
import axios from '../../axios/axios'

export function login(username, password) {
    return async dispatch => {
        await dispatch(Auth.loginStart());
        axios.post(
            "/auth/login",
            {
                userName: username,
                password: password
            }
        ).then(res => {
            console.log(res);
            localStorage.setItem('userId', res.data.id);
            localStorage.setItem('token', res.data.token);
            dispatch(Auth.loginSuccess({ id: res.data.id, token: res.data.token }));
        }).catch(error => {
            if (error.response !== null) {
                dispatch(Auth.loginFail(error.response.data.message))
            }

        })

    }
}
export function sessionLogin() {
    return async dispatch => {
        await dispatch(Auth.loginStart());
        var token = localStorage.getItem('token');
        var userId = localStorage.getItem('userId');
        console.log(token);
        console.log(userId);
        axios.get(
            `/user/${userId}`
        ).then(res => {
            dispatch(Auth.loginSuccess({ token, ...res.data }));
        }).catch(error => {
            if (error.response !== null) {
                dispatch(Auth.loginFail(error.response.data.message))
            }
        })

    }
}
export function logout() {
    return async dispatch => {
        await dispatch(Auth.logout());
    }
}