import React, {useContext, useReducer} from "react";
import {useHistory} from 'react-router-dom';
import userReducer from "./userReducer";
import axios from 'axios'

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
        await axios.post("http://127.0.0.1:8080/user_login/", {user_id: user.userName, user_pw: user.password}).then(res=>{
            console.log(res.data.status)
            if (res.data.status === 'success') {
                console.log("If part a print korlam 1")
                dispatch({type: 'LOGIN', payload: user});
                console.log("If part a print korlam 2")
                return true;
            }
            else{
                console.log("Else part a print korlam")
                return false;
            }
        })
        // return false;
        console.log("axios er baire")
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