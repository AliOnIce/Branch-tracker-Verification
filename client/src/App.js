import React, {useEffect} from 'react';
import './App.css';
import LoginForm from "./components/loginForm/LoginForm";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import UserPanel from "./components/userPanel/UserPanel";
import ControlPanel from "./components/controlPanel/ControlPanel";
import {setAuthorizationToken} from "./helpers/setAuthorizationToken";
import {useSelector} from "react-redux";
import ErrorPage from "./components/errorPage/ErrorPage";

const pages = [
    {
        exact: true,
        path: "/",
        component: LoginForm,
        isPublic: true,
        usertype: 99
    },
    //admin pages
    {
        exact: false,
        path: "/controlPanel",
        component: ControlPanel,
        isPublic: false,
        usertype: 0
    },
    //user pages
    {
        exact: false,
        path: "/userPanel",
        component: UserPanel,
        isPublic: false,
        usertype: 1
    },
    {
        exact: false,
        path: "*",
        component: ErrorPage,
        isPublic: true,
        usertype: 99
    },
];

const App = () => {
    const {user, token} = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            setAuthorizationToken(token);
        }
    }, [token])
    return <>
        <Router>
            <Switch>
                {
                    pages.map((p, index) => {
                        if(p.isPublic || (user && user.usertype === p.usertype)){
                            return <Route key={index} exact={p.exact} path={p.path} component={p.component}/>;
                        }else{
                            return '';
                        }
                    })
                }
            </Switch>
        </Router>
    </>

}

export default App;
