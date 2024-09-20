import React, { useState } from 'react';
import { Offcanvas, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'; // Импорт из react-router-dom
import { ORDERS_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from '../utils/consts';
const CurtainMenu = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Nav.Item>
                <Nav.Link variant="primary" onClick={handleShow}>
                    Открыть меню
                </Nav.Link>
            </Nav.Item>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Меню</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        <li>
                            <NavLink to={PROFILE_ROUTE} onClick={handleClose}>
                                Личный кабинет
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ORDERS_ROUTE} onClick={handleClose}>
                                Мои заказы
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={SETTINGS_ROUTE} onClick={handleClose}>
                                Настройки
                            </NavLink>
                        </li>
                        {/* Выход на главную страницу */}
                        {/* <li>
                            <NavLink to="/" onClick={handleClose}> 
                                Выход
                            </NavLink>
                        </li> */}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CurtainMenu;