import {AUTH} from '../Types';

const initialState = {
    username:"abc",
    password:"abc",
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case AUTH.LOGIN:
        return { ...state, ...payload }

    default:
        return state
    }
}
