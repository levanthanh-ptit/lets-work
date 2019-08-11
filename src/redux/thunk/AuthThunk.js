import * as Auth from '../actions/AuthAction'
import axios from '../../axios/axios'

export function login(username, password) {
    return async dispatch => {
        await dispatch(Auth.loginStart());
        var id, token;
        axios.post(
            "/auth/login",
            {
                userName: username,
                password: password
            }
        ).then(res => {
            id = res.data.id;
            token = res.data.token;
            localStorage.setItem('userId', id);
            localStorage.setItem('token', token);
        }).then(() => {
            axios.get(
                `/user/${id}`
            ).then(res => {
                dispatch(Auth.loginSuccess({ token, ...res.data }));
            }).catch(error => {
                if (error.response !== null) {
                    dispatch(Auth.loginFail(error.response.data.message))
                }
            })
        }).catch(error => {
            if (error.response !== undefined) {
                if (error.response.data !== undefined)
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
        axios.get(
            `/user/${userId}`
        ).then(res => {
            dispatch(Auth.loginSuccess({ token, ...res.data }));
        }).catch(error => {
            if (error.response !== undefined)
                if (error.response.data !== undefined) {
                    dispatch(Auth.loginFail(error.response.data.message))
                }
        })

    }
}
export function logout() {
    return async dispatch => {
        localStorage.clear()
        await dispatch(Auth.logout());
    }
}
export function uploadProfile(id, data) {
    return async dispatch => {
        axios.patch(`/user/${id}`, data)
            .then(res => {
                dispatch(Auth.update(data))
            }).catch(err => {
                dispatch(Auth.loginFail(''))
            })
    }
}