import React, { useContext } from 'react';
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { CART_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, PRODUCT_LIST_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import { logout } from '../http/userAPI';
import { Navbar, Nav, Container } from 'react-bootstrap';
import HoverDropdown from './HoverDropdown';
import { FaShoppingCart } from "react-icons/fa";

const NavBar = observer(() => {
    const { userStore } = useContext(Context);
    const { productStore } = useContext(Context);
    const { cartStore } = useContext(Context);
    const navigate = useNavigate();

    const logout_user = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        userStore.reset();
        productStore.reset();
        cartStore.reset();
        logout();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar-store sticky-top bg-gradient-to-r from-gray-800 to-black p-3">
            <Container fluid>
                <Navbar.Brand as={NavLink} to={MAIN_ROUTE} className="text-white fs-5 font-bold transition-transform transform hover:scale-105 duration-200">
                    Bashmak
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="transition-transform transform hover:scale-105 duration-200" onClick={() => navigate(`${PRODUCT_LIST_ROUTE}?category=1`)}>
                            Женщинам
                        </Nav.Link>
                        <Nav.Link className="transition-transform transform hover:scale-105 duration-200" onClick={() => navigate(`${PRODUCT_LIST_ROUTE}?category=2`)}>
                            Мужчинам
                        </Nav.Link>
                        <Nav.Link className="transition-transform transform hover:scale-105 duration-200" onClick={() => navigate(`${PRODUCT_LIST_ROUTE}?category=3`)}>
                            Детям
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">
                        {userStore.isAuth && !userStore.isAdmin() && (
                            <Nav.Item>
                                <Nav.Link as={NavLink} to={CART_ROUTE} className="me-1 fade show navbar-button transition-transform transform hover:scale-110 hover:text-indigo-500 duration-200">
                                    <FaShoppingCart size={24} />
                                </Nav.Link>
                            </Nav.Item>
                        )}
                        {userStore.isAuth ? (
                            <Nav.Item>
                                <HoverDropdown logout_user={logout_user} />
                            </Nav.Item>
                        ) : (
                            <Nav.Link as={NavLink} to={LOGIN_ROUTE} className="navbar-button transition-transform transform hover:scale-105 duration-200">
                                Авторизация
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
});

export default NavBar;
