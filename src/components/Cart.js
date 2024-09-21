import React from 'react';
import { NavLink } from 'react-router-dom';
import { CART_ROUTE } from '../utils/consts';
import { Nav } from 'react-bootstrap';

const Cart = () => {
    return (
        <Nav.Link as={NavLink} to={CART_ROUTE} className="navbar-button">
            Корзина
        </Nav.Link>
    );
};

export default Cart;
