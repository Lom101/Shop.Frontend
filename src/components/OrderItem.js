import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col, Badge, ListGroup, Form, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Context } from "../index";
import { fetchReviews, submitReview } from "../http/userAPI";

// Сопоставление статусов
const OrderStatusMap = {
    0: 'Ожидает',
    1: 'Обработан',
    2: 'Отправлен',
    3: 'Доставлен',
    4: 'Отменен',
};

const OrderItem = ({ order }) => {
    const [existingReview, setExistingReview] = useState(null);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(5); // По умолчанию 5 звезд
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [showModal, setShowModal] = useState(false); // Состояние для управления модальным окном

    const { userStore } = useContext(Context);

    // Функция для проверки существующего отзыва
    const checkExistingReview = async (productId) => {
        try {
            const response = await fetchReviews(productId);
            setExistingReview(response.data);
        } catch (error) {
            console.error("Ошибка при получении отзыва:", error);
        }
    };

    useEffect(() => {
        if (selectedProductId) {
            checkExistingReview(selectedProductId);
        }
    }, [selectedProductId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProductId) return;

        const userId = userStore.user.id;

        try {
            await submitReview({
                text,
                rating,
                productId: selectedProductId,
                userId,
            });
            // Сбросить форму
            setText('');
            setRating(5);
            setShowModal(false); // Закрыть модальное окно
            // Получить новый отзыв
            checkExistingReview(selectedProductId);
        } catch (error) {
            console.error("Ошибка при отправке отзыва:", error);
        }
    };

    const handleShowModal = (productId) => {
        setSelectedProductId(productId);
        setText('');
        setExistingReview(null); // Очистить предыдущие отзывы
        checkExistingReview(productId); // Получить отзывы для выбранного товара
        setShowModal(true); // Открыть модальное окно
    };

    return (
        <Card className="mt-4 mb-4 ms-5 me-5 shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Заказ #{order.id}</h5>
                <Button variant="outline-secondary" size="sm">Детали</Button>
            </Card.Header>
            <Card.Body>
                <Row className="mb-3">
                    <Col md={6}>
                        <h6 className="mb-2">Дата:</h6>
                        <p>{new Date(order.created).toLocaleDateString()}</p>
                    </Col>
                    <Col md={6}>
                        <h6 className="mb-2">Статус:</h6>
                        <Badge bg={order.status === 1 ? 'success' : (order.status === 0 ? 'warning' : 'secondary')}>
                            {OrderStatusMap[order.status] || 'Неизвестный статус'}
                        </Badge>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <h6 className="mb-2">Сумма:</h6>
                        <p>{order.totalAmount} руб.</p>
                    </Col>
                    <Col md={6}>
                        <h6 className="mb-2">Контактный телефон:</h6>
                        <p>{order.contactPhone || 'Нет указанного телефона'}</p>
                    </Col>
                </Row>
                <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                        <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                            <div className="me-auto d-flex align-items-center">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}${item.model.photos[0].url}`}
                                    alt={`${item.model.name} (${item.size.name})`}
                                    className="img-thumbnail me-3"
                                    style={{ width: '50px' }}
                                />
                                <div className="">
                                    <span className="fw-bold font-bold">
                                        {`${item.model.name}`}
                                    </span>
                                </div>
                            </div>
                            <div className="me-auto">
                                <span className="text-muted font-light">
                                    Размер: {item.size.name}, Цвет: {item.model.color.name}, Кол-во: {item.quantity} ед. Цена за шт: {item.amount}
                                </span>
                            </div>
                            <span className="fw-bold font-bold">Итого: {item.totalPrice} руб.</span>
                            <Button variant="link" onClick={() => handleShowModal(item.model.productId)}>
                                Отзывы
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {/* Модальное окно для отправки отзыва */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Оставить отзыв</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {existingReview ? (
                            <div>
                                <h6>Ваш отзыв:</h6>
                                <div>
                                    {'★'.repeat(existingReview.rating)}{'☆'.repeat(5 - existingReview.rating)}
                                    <p>{existingReview.text}</p>
                                </div>
                            </div>
                        ) : (
                            <Form onSubmit={handleReviewSubmit}>
                                <Form.Group controlId="reviewText">
                                    <Form.Label>Ваш отзыв</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="reviewRating">
                                    <Form.Label>Рейтинг</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={rating}
                                        onChange={(e) => setRating(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5].map((rate) => (
                                            <option key={rate} value={rate}>{rate}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Оставить отзыв
                                </Button>
                            </Form>
                        )}
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

OrderItem.propTypes = {
    order: PropTypes.shape({
        id: PropTypes.number.isRequired,
        created: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        totalAmount: PropTypes.number.isRequired,
        contactPhone: PropTypes.string,
        orderItems: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                model: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    color: PropTypes.shape({
                        name: PropTypes.string.isRequired,
                    }).isRequired,
                    photos: PropTypes.arrayOf(
                        PropTypes.shape({
                            url: PropTypes.string.isRequired,
                        })
                    ).isRequired,
                }).isRequired,
                size: PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired,
                quantity: PropTypes.number.isRequired,
                amount: PropTypes.number.isRequired,
                totalPrice: PropTypes.number.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default OrderItem;
