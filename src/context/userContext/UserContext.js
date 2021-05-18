import React, {useContext, useReducer} from "react";
import {useHistory} from 'react-router-dom';
import userReducer from "./userReducer";
import axios from 'axios'
import {WOW_BASE_URL} from "../../util/StringUtil";

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
        const mockUrl = 'https://jsonplaceholder.typicode.com/users/1';
        const reqBody = {user_id: user.userName, user_pw: user.password};
        return await axios.get(mockUrl).then(res=>{
            console.log(res.data.username)
            if (res.data.username === 'Bret') {
                dispatch({type: 'LOGIN', payload: user});
                return Promise.resolve(true);
            } else {
                console.log("Else part a print korlam")
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
            logout
        }}
        >{children}</UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext)
}

export { UserProvider, UserContext }