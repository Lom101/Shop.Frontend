import React, { useContext } from 'react';
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, MAIN_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';
import { logout } from '../http/userAPI';
import CurtainMenu from './CurtainMenu';

import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import HoverDropdown from './HoverDropdown';


const NavBar = observer(() => {
    const { userStore } = useContext(Context);
    const { productStore } = useContext(Context);

    const navigate = useNavigate();

    const logout_user = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        logout();
    };

    const isAdmin = () => {
        const token = localStorage.getItem('authToken');
        if (!token) return false;

        const payload = JSON.parse(atob(token.split('.')[1])); // декодирование JWT
        return payload.role === 'Admin'; // предполагается, что у вас есть поле 'role'
    };

    //if (isAdmin()) return null; // Если админ, не рендерим NavBar

    return (
        <Navbar bg="dark" variant="dark" className="navbar-store d-flex justify-content-between">
            <Container fluid>
                <div className="d-flex">
                    <Nav.Link className="logo-title" to={MAIN_ROUTE}>
                        Магазин
                    </Nav.Link>
                    <Nav className="ms-2">
                        <Nav.Link onClick={() => productStore.setSelectedGender('women')}>Women</Nav.Link>
                        <Nav.Link onClick={() => productStore.setSelectedGender('men')}>Men</Nav.Link>
                        <Nav.Link onClick={() => productStore.setSelectedGender('kids')}>Kids</Nav.Link>
                    </Nav>
                </div>
                <div className="d-flex ml-auto">
                    <Nav>
                        {userStore.isAuth ? (
                            <>
                                <Nav.Item>
                                    <HoverDropdown logout_user={logout_user} />
                                </Nav.Item>
                            </>
                        ) : (
                            <Nav.Item>
                                <Nav.Link
                                    className="navbar-button"
                                    onClick={() => navigate(LOGIN_ROUTE)}
                                >
                                    Авторизация
                                </Nav.Link>
                            </Nav.Item>
                        )}
                    </Nav>
                </div>
            </Container>
        </Navbar>
    );
});

export default NavBar;