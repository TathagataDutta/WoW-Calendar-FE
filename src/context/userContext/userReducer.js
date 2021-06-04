import {LOGIN, LOGOUT, SIGNUP} from "../../util/StringUtil";

const userReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload}

        case SIGNUP:
            return {...state, user: action.payload}

        case LOGOUT:
            return {...state, user: null}

        default:
            return {...state}
    }
}

export default userReducer