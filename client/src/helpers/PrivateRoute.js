import React from 'react';
import {useSelector} from "react-redux";
import {Route, Redirect} from "react-router-dom";


const PrivateRoute = ({component: Component, ...rest}) => {
    const {token} = useSelector(state => state.auth);

    return <Route {...rest} component={(props) => (
        token ? <Component {...props} /> : <Redirect to="/"/>
    )}/>

};

export default PrivateRoute;