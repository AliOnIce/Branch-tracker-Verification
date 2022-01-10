import React, {useState} from 'react';
import {
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';
import {logout} from "../../redux/actions/authAction";
import "./NavbarComponent.css";


const NavbarComponent = (props) => {

    const handleLogout = () => {
        props.dispatch(logout());
        props.history.push('/');
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = () => setDropdownOpen(prevState => !prevState);

    return <>
        <Navbar className="navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow" color="light" light expand="md">
            <NavbarBrand className="col-md-2 col-lg-2 mr-0 px-3" href="/">Branch Tracker</NavbarBrand>
            <NavbarToggler className="ml-2 w-25" onClick={props.toggle} />
            <Collapse navbar/>
            <ul className="navbar-nav m-2">
                <li className="nav-item text-nowrap">
                    <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
                        <DropdownToggle caret>
                            {props.user.nameSurname}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Kullanıcı Menü</DropdownItem>
                            <DropdownItem onClick={handleLogout}>Çıkış Yap</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
        </Navbar>
    </>
};


export default NavbarComponent;