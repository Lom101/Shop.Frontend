import React from 'react';
import { Card, Button, Row, Col, Badge, ListGroup } from 'react-bootstrap';

const OrderItem = ({ order }) => {
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
                        <Badge bg={order.status === 1 ? 'success' : 'secondary'}>
                            {order.status === 1 ? 'Активный' : 'Завершенный'}
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
                                    src={`${process.env.REACT_APP_API_URL}/images/${item.model.photos[0].fileName}`}
                                    alt={`${item.model.name} (${item.size.name})`}
                                    className="img-thumbnail me-3"
                                    style={{ width: '50px' }}
                                />
                                <span>
                                    {`${item.model.name} (${item.size.name}), Цвет: ${item.model.color.name}`}
                                </span>
                            </div>
                            <span className="text-muted">{item.totalPrice} руб.</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default OrderItem;
