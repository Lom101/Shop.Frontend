import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';
import { logout } from '../http/userAPI';

const NavBar = observer(() => {
    const { userStore } = useContext(Context);
    const navigate = useNavigate();

    const logout_user = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        logout();
    };

    return (
        <Navbar bg="dark" variant="dark" className="navbar-store">
            <Container>
                <NavLink className="logo-title" to={SHOP_ROUTE}>
                    Магазин
                </NavLink>
                <Nav className="ml-auto">
                    {userStore.isAuth ? (
                        <>
                            <Button
                                className="navbar-button"
                                variant="outline-light"
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Админ панель
                            </Button>
                            <Button
                                className="btn-login"
                                variant="outline-light"
                                onClick={logout_user}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <Button
                            className="navbar-button"
                            variant="outline-light"
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Авторизация
                        </Button>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
