import {ADD_USER, LOGOUT} from "../../util/StringUtil";

const userReducer = (state, action) => {
    switch (action.type) {
        case ADD_USER:
            return {...state, user: action.payload}

        case LOGOUT:
            return {...state, user: null}

        default:
            return {...state}
    }
}

export default userReducer