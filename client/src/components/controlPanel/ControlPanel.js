import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import NavbarComponent from "../navbarComponent/NavbarComponent";
import SidebarComponent from "../sidebarComponent/SidebarComponent";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import ControlPanelMain from "./controlPanelMain/ControlPanelMain";
import UsersComponent from "./usersComponent/UsersComponent";


const pages = [
    {
        exact: true,
        path: "/",
        component: ControlPanelMain,
        text:"Ana Sayfa"
    },
    {
        exact: false,
        path: "/users",
        component: UsersComponent,
        text:"Kullanıcılar"
    },
];

const ControlPanel = (props) => {
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { path } = useRouteMatch();

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return <>
        <NavbarComponent history={props.history} dispatch={dispatch} toggle={toggle} user={user}/>
        <div className="container-fluid">
            <div className="row">
                <SidebarComponent isOpen={isOpen} pages={pages} path={path}/>

                <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-md-4">
                    <Switch>
                        {pages.map((p, index) => {
                            return <Route key={index} exact={p.exact} path={path+p.path} component={p.component}/>
                        })}

                    </Switch>
                </main>
            </div>
        </div>
    </>
};

export default ControlPanel;