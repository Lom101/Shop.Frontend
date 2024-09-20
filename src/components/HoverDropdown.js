import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { NavLink } from 'react-router-dom';
import { ORDERS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../utils/consts';
import { FaUser } from 'react-icons/fa';

const HoverDropdown =  ({ logout_user })  => {
    const [show, setShow] = useState(false);
    let timeoutId = null;

    const handleMouseEnter = () => {
        if (timeoutId) {
            clearTimeout(timeoutId); // Очищаем тайм-аут, если курсор вернулся на элемент
        }
        setShow(true); // Показываем меню
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            setShow(false); // Закрываем меню через небольшую задержку
        }, 300); // Задержка 300 мс
    };

    return (
        <Nav bg="dark" variant="dark" expand="lg">
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example">
                <Nav>
                    <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={
                            <span>
                                <FaUser style={{ marginRight: '6px' , marginBottom: '4px'}} />
                                Личный кабинет
                            </span>
                        }
                        menuVariant="dark"
                        show={show} // Контролируем видимость вручную
                        onMouseEnter={handleMouseEnter} // Показываем меню при наведении
                        onMouseLeave={handleMouseLeave} // Закрываем с задержкой при уходе
                    >
                        <NavDropdown.Item as={NavLink} to={PROFILE_ROUTE}>Профиль</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={ORDERS_ROUTE}>Мои заказы</NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to={SETTINGS_ROUTE}>Настройки</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logout_user}>Выйти</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Nav>
    );
};

export default HoverDropdown;
