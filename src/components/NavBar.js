import React, { useContext } from 'react';
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, ORDERS_ROUTE, SETTINGS_ROUTE, CART_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import '../assets/css/navbar.css';
import { logout } from '../http/userAPI';
import { Navbar, Nav, Container } from 'react-bootstrap';
import HoverDropdown from './HoverDropdown';
import Cart from './Cart';

const NavBar = observer(() => {
    const { userStore } = useContext(Context);
    const { productStore } = useContext(Context);
    const navigate = useNavigate();

    const logout_user = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        logout();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar-store d-flex justify-content-between">
            <Container fluid>
                
            <Nav className="me-auto">
                    {/* <Nav.Link as={NavLink} to={MAIN_ROUTE} className="logo-title">
                        <img
                            src="icon.webp"  // Путь к логотипу
                            alt="Логотип"
                            width="25"
                            height="25"
                            className="d-inline-block align-top"
                        />
                    </Nav.Link> */}
                    
                    <Nav.Link as={NavLink} to={MAIN_ROUTE}>
                        Магазин 
                    </Nav.Link>
                    
                    <Nav.Link onClick={() => productStore.setSelectedGender('women')}>
                        Women
                    </Nav.Link>
                    <Nav.Link onClick={() => productStore.setSelectedGender('men')}>
                        Men
                    </Nav.Link>
                    <Nav.Link onClick={() => productStore.setSelectedGender('kids')}>
                        Kids
                    </Nav.Link>
                </Nav>


                {/* Личный кабинет или авторизация */}
                <Nav className="ms-auto">
                    {userStore.isAuth && !userStore.isAdmin() && ( // Условие для отображения корзины
                        <Nav.Item>
                            <Cart />
                        </Nav.Item>
                    )}
                    {userStore.isAuth ? (
                        <Nav.Item>
                            <HoverDropdown logout_user={logout_user} />
                        </Nav.Item>
                    ) : (
                        <Nav.Link as={NavLink} to={LOGIN_ROUTE} className="navbar-button">
                            Авторизация
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
