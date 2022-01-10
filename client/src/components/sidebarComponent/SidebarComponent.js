import React from 'react';
import "./SidebarComponent.css";
import {Collapse} from "reactstrap";
import {Link} from "react-router-dom";

const SidebarComponent = (props) => {
    return <>
        <Collapse isOpen={props.isOpen} id="sidebarMenu" className="col-md-2 col-lg-2 d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    {props.pages.map((p, index) => {
                        return <li key={index}  className="nav-item">
                            <Link to={props.path+p.path} className="nav-link">{p.text}</Link>
                        </li>
                    })}
                </ul>
            </div>
        </Collapse>
    </>
};

export default SidebarComponent;
