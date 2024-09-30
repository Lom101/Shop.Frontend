import React, { useContext, useState, useEffect } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = observer(() => {
    const { cartStore } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const canAccessCheckout = localStorage.getItem('canAccessCheckout');
        if (!canAccessCheckout) {
            navigate('/cart'); // Redirect to cart page if the flag is not set
        }

        return () => {
            localStorage.removeItem('canAccessCheckout'); // Clear the flag after leaving the page
        };
    }, [navigate]);

    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        email: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo({ ...customerInfo, [name]: value });
    };

    const handleCheckout = () => {
        if (customerInfo.name && customerInfo.email && customerInfo.address) {
            alert("Заказ успешно оформлен!");
            cartStore.clearCart();
            navigate('/'); // Redirect to homepage or any other page
        } else {
            alert("Пожалуйста, заполните все поля.");
        }
    };

    return (
        <div className="container mb-3 pt-3">
            <h1 className="mb-4">Оформление заказа</h1>
            <Row>
                <Col md={8}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Информация о покупателе</h4>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={customerInfo.name}
                                        onChange={handleInputChange}
                                        placeholder="Введите ваше имя"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={customerInfo.email}
                                        onChange={handleInputChange}
                                        placeholder="Введите ваш email"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Адрес доставки</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={customerInfo.address}
                                        onChange={handleInputChange}
                                        placeholder="Введите ваш адрес"
                                    />
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <h4>Ваш заказ</h4>
                            <ul className="list-group mb-3">
                                {cartStore.cartItems.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between">
                                        <span>{item.name} (Размер: {item.size?.name})</span>
                                        <span>{item.model.price} руб</span>
                                    </li>
                                ))}
                            </ul>
                            <h5>Итого: {cartStore.cartItems.reduce((total, item) => total + item.model.price * item.quantity, 0)} руб</h5>
                        </Card.Body>
                    </Card>
                    <Button variant="success" className="w-100" onClick={handleCheckout}>
                        Оформить заказ
                    </Button>
                </Col>
            </Row>
        </div>
    );
});

export default CheckoutPage;
