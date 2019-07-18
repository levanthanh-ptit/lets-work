import * as Auth from '../actions/AuthAction'
export function login(username, password){
    return dispatch => {
        dispatch(Auth.loginStart());
        
    }
}