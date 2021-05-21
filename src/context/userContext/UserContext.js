import React, {useContext, useReducer} from "react";
import {useHistory} from 'react-router-dom';
import userReducer from "./userReducer";
import axios from 'axios'
import {LOGIN, SIGNUP, SUCCESS, WOW_BASE_URL, WOW_LOGIN_URL, WOW_SIGNUP_URL} from "../../util/StringUtil";

const initState = {
    user: null,
    isFetching: true,
    isUpdating: false
};

const UserContext = React.createContext();

const UserProvider = ({children}) => {
    const history = useHistory();

    const [state, dispatch] = useReducer(userReducer, initState);

    const login = async (user) => {
        const reqBody = {user_id: user.userName, user_pw: user.password};
        return await axios.post(WOW_BASE_URL+WOW_LOGIN_URL, reqBody).then(res=>{
            console.log(res.data)
            if (res.data.status === SUCCESS) {
                dispatch({type: LOGIN, payload: user});
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        })
    }

    const signup = async (user) => {
        const reqBody = {user_id: user.userName, user_pw: user.password};
        return await axios.post(WOW_BASE_URL+WOW_SIGNUP_URL, reqBody).then(res=>{
            console.log(res.data)
            if (res.data.status === SUCCESS) {
                dispatch({type: SIGNUP, payload: user});
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        })
    }

    const logout = () => {
        dispatch({type: 'LOGOUT'})
    }

    return (
        <UserContext.Provider
        value={{
            ...state,
            login,
            logout,
            signup
        }}
        >{children}</UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export { UserProvider, UserContext }