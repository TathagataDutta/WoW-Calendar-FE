import {useHistory} from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {useUserContext} from "../../context/userContext/UserContext";

const Home = () => {
    const {user, logout} = useUserContext();
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/');
    }

    return (
        <div>
            <div>{user.userName}</div>
            <Button className='btn' variant="contained" color='primary' type="button" onClick={handleLogout}>
                Log out
            </Button>
        </div>
    )
}

export default Home