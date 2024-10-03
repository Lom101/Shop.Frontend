import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ORDERS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../utils/consts';
import { FaUser } from 'react-icons/fa';
import "../assets/css/hoverdropdown.css"

const HoverDropdown = ({ logout_user }) => {
    const [show, setShow] = useState(false);
    let timeoutId = null;

    const handleMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId); // Очищаем тайм-аут при наведении
        setShow(true);
    };

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => setShow(false), 300); // Закрываем меню с задержкой
    };

    return (
        <Nav>
            <NavDropdown
                id="nav-dropdown-dark-example"
                title={
                    <span className="flex items-center">
                        <FaUser className="mr-2 mb-0" />
                        Личный кабинет
                    </span>
                }
                menuVariant="dark"
                show={show} // Управление видимостью вручную
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="dropdown-toggle"
            >
                {/* Ссылки на внутренние маршруты */}
                <NavDropdown.Item as={NavLink} to={PROFILE_ROUTE}>Профиль</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={ORDERS_ROUTE}>Мои заказы</NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to={SETTINGS_ROUTE}>Настройки</NavDropdown.Item>
                <NavDropdown.Divider />
                {/* Кнопка выхода */}
                <NavDropdown.Item onClick={logout_user}>Выйти</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    );
};

export default HoverDropdown;
