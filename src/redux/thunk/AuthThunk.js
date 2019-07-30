import * as Auth from '../actions/AuthAction'
import axios from '../../axios/axios'

export function login(username, password){
    return async dispatch => {
        await dispatch(Auth.loginStart());
        await dispatch(Auth.loginSuccess("bearer bfhjadldjljsherkl32qw2k"));
    }
}
export function logout(){
    return async dispatch => {
        await dispatch(Auth.logout());
    }
}