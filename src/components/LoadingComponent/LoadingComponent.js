import {useEffect} from "react";
import {useUserContext} from "../../context/userContext/UserContext";
import {AUTH_ROUTE, DASHBOARD_ROUTE, USER_DATA} from "../../util/StringUtil";
import {useHistory} from "react-router-dom";
import BackdropComponent from "../BackdropComponent/BackdropComponent";


const LoadingComponent = () => {

    const {addUser} = useUserContext();
    const history = useHistory();

    useEffect(() => {
        const userDataString = localStorage.getItem(USER_DATA);
        if (!!userDataString) {
            const userData = JSON.parse(userDataString);
            addUser(userData).then(res => {
                history.push(DASHBOARD_ROUTE)
            })
        } else {
            console.log('else part');
            history.push(AUTH_ROUTE);
        }
    }, [])

    return <BackdropComponent isOpen={true} />
}

export default LoadingComponent