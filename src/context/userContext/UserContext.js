import React, {useContext, useReducer} from "react";
import userReducer from "./userReducer";
import axios from 'axios'
import {ADD_USER, SUCCESS, USER_DATA, WOW_LOGIN_URL, WOW_SIGNUP_URL} from "../../util/StringUtil";

const initState = {
    user: null,
    isFetching: true,
    isUpdating: false
};

const UserContext = React.createContext();

const UserProvider = ({children}) => {

    const [state, dispatch] = useReducer(userReducer, initState);

    const login = async (user) => {
        const reqBody = {user_id: user.userName, user_pw: user.password};
        return await axios.post(WOW_LOGIN_URL, reqBody).then(res=> {
            console.log(res.data)
            const userData = JSON.parse(res.data.data);
            if (res.data.status === SUCCESS) {
                localStorage.setItem(USER_DATA, JSON.stringify(userData));
                dispatch({type: ADD_USER, payload: userData});
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        })
    }

    const signup = async (user) => {
        const reqBody = {user_id: user.userName, user_pw: user.password};
        return await axios.post(WOW_SIGNUP_URL, reqBody).then(res=> {
            console.log(res.data)
            const userData = JSON.parse(res.data.data);
            if (res.data.status === SUCCESS) {
                localStorage.setItem(USER_DATA, JSON.stringify(userData));
                dispatch({type: ADD_USER, payload: userData});
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        })
    }

    const logout = async () => {
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem(USER_DATA)
        return Promise.resolve(true)
    }

    const addUser = async (userData) => {
        dispatch({type: ADD_USER, payload: userData});
        return Promise.resolve(true);
    }

    return (
        <UserContext.Provider
        value={{
            ...state,
            login,
            logout,
            signup,
            addUser
        }}
        >{children}</UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export { UserProvider, UserContext }