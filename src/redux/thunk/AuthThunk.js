import * as Auth from '../actions/AuthAction'
import axios from '../../axios/axios'

export function clearStatus() {
    return dispatch => {
        dispatch(Auth.clearStatus())
    }
}

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
        var token = localStorage.getItem('token');
        var userId = localStorage.getItem('userId');
        if (userId === null) return
        await dispatch(Auth.loginStart());
        await axios.get(
            `/user/${userId}`
        ).then(async res => {
            await dispatch(Auth.loginSuccess({ token, ...res.data }));
            await dispatch(Auth.clearStatus())
        }).catch(error => {
            console.log(error);
            
            dispatch(Auth.clearStatus())
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
export function signUp({ username, email, password, firstName, lastName }) {
    return async dispatch => {
        var id, token;
        axios.post(`/auth/sign_up`,
            {
                username,
                email,
                password,
                firstName,
                lastName
            })
            .then(res => {
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