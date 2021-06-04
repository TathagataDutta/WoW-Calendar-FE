import './App.css';
import AuthComponent from "./components/AuthComponent/AuthComponent";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Home from "./components/HomeComponent/Home";
import {useUserContext} from "./context/userContext/UserContext";



const App = () => {

    const {user} = useUserContext();

  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={AuthComponent} />
            <Route path='/home' >
                {!user ? <Redirect to='/' /> : <Home />}
            </Route>
            <Route><Redirect to='/' /></Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
