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
    const navigate = useNavigate();

    const logout_user = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        logout();
    };

    function findCategoryByName(name) {
        return productStore.categories.find(category => category.name === name);
    }

    return (
        // d-flex justify-content-between
        <Navbar bg="dark" variant="dark" expand="lg" className="navbar-store navbar-expand-lg sticky-top bg-gradient-to-r from-gray-800 to-black p-3">
            <Container fluid className="d-flex align-items-center">
                <Nav className="me-auto d-flex align-items-center">
                    <Nav.Link as={NavLink} to={MAIN_ROUTE}
                              className="text-white fs-5 font-bold transition-transform transform hover:scale-105 duration-200"
                    >
                        BulaTCross
                    </Nav.Link>

                    <Nav.Link
                        className="transition-transform transform hover:scale-105 duration-200"
                        onClick={() => {
                            productStore.setSelectedCategory(findCategoryByName("Women's"));
                            navigate(PRODUCT_LIST_ROUTE); // Перенаправляем на страницу с продуктами
                        }}
                    >
                        Women
                    </Nav.Link>

                    <Nav.Link
                        className="transition-transform transform hover:scale-105 duration-200"
                        onClick={() => {
                            productStore.setSelectedCategory(findCategoryByName("Men's"));
                            navigate(PRODUCT_LIST_ROUTE); // Перенаправляем на страницу с продуктами
                        }}
                    >
                        Men
                    </Nav.Link>

                    <Nav.Link
                        className="transition-transform transform hover:scale-105 duration-200"
                        onClick={() => {
                            productStore.setSelectedCategory(findCategoryByName("Children's"));
                            navigate(PRODUCT_LIST_ROUTE); // Перенаправляем на страницу с продуктами
                        }}
                    >
                        Kids
                    </Nav.Link>
                </Nav>


                {/* Личный кабинет или авторизация */}
                <Nav className="ms-auto">
                    {userStore.isAuth && !userStore.isAdmin() && ( // Условие для отображения корзины
                        <Nav.Item>
                            <Nav.Link
                                as={NavLink} to={CART_ROUTE}
                                className="me-1 fade show navbar-button transition-transform transform hover:scale-110 hover:text-indigo-500 duration-200"
                            >
                                <FaShoppingCart size={24} /> {/* Иконка корзины */}
                            </Nav.Link>
                        </Nav.Item>
                    )}
                    {userStore.isAuth ? (
                        <Nav.Item>
                            <HoverDropdown logout_user={logout_user} />
                        </Nav.Item>
                    ) : (
                        <Nav.Link
                            as={NavLink} to={LOGIN_ROUTE}
                            className="navbar-button transition-transform transform hover:scale-105 duration-200"
                        >
                            Авторизация
                        </Nav.Link>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
});

export default NavBar;
