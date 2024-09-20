import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';
import { logout } from '../http/userAPI';
import CurtainMenu from '../pages/CurtainMenu';

const NavBar = observer(() => {
    const { userStore } = useContext(Context);
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

    return (
        <Navbar bg="dark" variant="dark" className="navbar-store">
            <Container>
                <NavLink className="logo-title" to={SHOP_ROUTE}>
                    Магазин
                </NavLink>
                <Nav className="ml-auto d-flex align-items-center">
                    {userStore.isAuth ? (
                        <>
                            {isAdmin() && (
                                <Nav.Item>
                                    <Nav.Link
                                        className="navbar-button"
                                        onClick={() => navigate(ADMIN_ROUTE)}
                                    >
                                        Админ панель
                                    </Nav.Link>
                                </Nav.Item>
                            )}
                            <Nav.Item>
                                <Nav.Link
                                    className="btn-login"
                                    onClick={logout_user}
                                >
                                    Выйти
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <CurtainMenu />
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
            </Container>
        </Navbar>
    );
});

export default NavBar;