import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Card, Button, ListGroup, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {CHECKOUT_ROUTE} from "../utils/consts";

const CartPage = observer(() => {
    const { cartStore } = useContext(Context);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (cartStore.cartItems.length === 0) {
            alert("Корзина пуста! Пожалуйста, добавьте товары в корзину.");
            return;
        }

        const totalAmount = cartStore.cartItems.reduce((total, item) => total + item.model.price * item.quantity, 0);

        localStorage.setItem('canAccessCheckout', 'true'); // Set the flag in localStorage
        // Перенаправление на страницу оформления заказа
        navigate(CHECKOUT_ROUTE);
    };

    return (
        <div className="container mb-5 p-5">
            <h1 className="mb-4 text-3xl font-bold text-center">Корзина</h1>
            {cartStore.cartItems.length === 0 ? (
                <p className="text-center fs-5">Ваша корзина пуста.</p>
            ) : (
                    <Card className="shadow-sm">
                    <ListGroup variant="flush">
                        {cartStore.cartItems.map(item => (
                            <ListGroup.Item
                                key={`${item.productId}-${item.modelId}-${item.sizeId}`}
                                className="d-flex justify-content-between align-items-center py-3"
                            >
                                <Row className="w-100 align-items-center">
                                    <Col md={1} className="text-center">
                                        {/* Изображение модели */}
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/images/${item.model.photos[0]?.fileName}`}
                                            alt={item.name}
                                            className="img-fluid rounded"
                                            style={{ height: '80px', objectFit: 'contain' }}
                                        />
                                    </Col>
                                    <Col md={8}>
                                        <h5 className="mb-2 fw-bold">{item.name}</h5>
                                        <div className="text-muted">
                                            <small>Модель: {item.model.color.name}</small>
                                        </div>
                                        <div className="text-muted">
                                            <small>Размер: {item.size?.name}</small>
                                        </div>
                                        <div className="text-muted">
                                            <small>Цена: {item.model.price} руб</small>
                                        </div>
                                        <div className="text-muted">
                                            <small>Количество: {item.quantity}</small>
                                        </div>
                                    </Col>
                                    <Col md={3} className="d-flex justify-content-end align-items-center">
                                        <Button
                                            variant="danger"
                                            className="me-3"
                                            onClick={() => cartStore.removeFromCart(item.productId, item.modelId, item.sizeId)}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Card.Body className="d-flex flex-column align-items-end p-4">
                        <h4 className="mb-3 fw-bold">
                            Итого: {cartStore.cartItems.reduce((total, item) => total + item.model.price * item.quantity, 0)} руб
                        </h4>
                        <Button variant="success" className="w-100 py-2 fs-5" onClick={handleCheckout}>
                            Оформить заказ
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
});

export default CartPage;
