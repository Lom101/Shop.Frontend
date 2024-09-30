import React, { useContext, useState } from 'react';
import { Badge, Button, Card, Col, Modal, Row, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { FaStar } from 'react-icons/fa';

const ProductItem = ({ product }) => {
    const navigate = useNavigate();
    const { cartStore } = useContext(Context);

    const [showModal, setShowModal] = useState(false); // Состояние для модального окна
    const [selectedModel, setSelectedModel] = useState(null); // Состояние для выбранной модели
    const [selectedSize, setSelectedSize] = useState(null); // Состояние для выбранного размера

    // Функция для получения уникальных размеров
    const getUniqueAvailableSizes = (models) => {
        const allSizes = models.flatMap(model => model.sizes.filter(size => size.stockQuantity > 0));
        const uniqueSizes = Array.from(new Set(allSizes.map(size => size.id)))
            .map(id => allSizes.find(size => size.id === id));
        return uniqueSizes;
    };

    const availableSizes = getUniqueAvailableSizes(product.models);

    // Открыть модальное окно
    const handleAddToCart = (event) => {
        event.stopPropagation(); // Останавливаем всплытие события клика на карточке
        setShowModal(true);
    };

    // Закрыть модальное окно
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedModel(null);
        setSelectedSize(null);
    };

    // Добавить товар в корзину
    const handleConfirmAddToCart = () => {
        if (selectedModel && selectedSize) {
            cartStore.addToCart(product, selectedModel.id, selectedSize.id);
            alert(`${product.name} добавлен в корзину!`);
            handleCloseModal();
        } else {
            alert("Пожалуйста, выберите модель и размер.");
        }
    };

    const handleCardClick = () => {
        navigate(PRODUCT_ROUTE + '/' + product.id);
    };

    const handleModelChange = (event) => {
        const modelId = parseInt(event.target.value);
        const model = product.models.find(model => model.id === modelId);
        setSelectedModel(model);
        setSelectedSize(null); // Сбросить размер при смене модели
    };

    const handleSizeChange = (event) => {
        const sizeId = parseInt(event.target.value);
        const size = selectedModel.sizes.find(size => size.id === sizeId);
        setSelectedSize(size);
    };

    return (
        <Col md={3} className="mb-3">
            <Card className='product-item shadow-sm' onClick={handleCardClick}>
                <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}/images/${product.models[0].photos[0].fileName}`}
                    alt={product.name}
                    style={{
                        height: '200px',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <div className="d-flex align-items-center">
                        <span className="me-1">{product.averageRating}</span>
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                color={index < product.averageRating ? '#FFD700' : '#D3D3D3'}
                                size={20}
                                className="me-1"
                            />
                        ))}
                    </div>
                    <div className="mt-2">
                        <h6>Доступные размеры:</h6>
                        <div>
                            {availableSizes.map(size => (
                                <Badge key={size.id} pill bg="dark" className="me-1 mb-1">
                                    {size.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <Button variant="dark" onClick={handleAddToCart}>
                        Добавить в корзину
                    </Button>
                </Card.Body>
            </Card>

            {/* Модальное окно для выбора модели и размера */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Выберите модель и размер</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Выбор модели */}
                        <Form.Group className="mb-3">
                            <Form.Label>Модель</Form.Label>
                            <Form.Select onChange={handleModelChange} defaultValue="">
                                <option value="" disabled>Выберите модель</option>
                                {product.models.map(model => (
                                    <option key={model.id} value={model.id}>
                                        {model.color.name} - {model.price} руб
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        {/* Выбор размера */}
                        {selectedModel && (
                            <Form.Group className="mb-3">
                                <Form.Label>Размер</Form.Label>
                                <Form.Select onChange={handleSizeChange} defaultValue="">
                                    <option value="" disabled>Выберите размер</option>
                                    {selectedModel.sizes.map(size => (
                                        <option key={size.id} value={size.id} disabled={!size.isAvailable}>
                                            {size.name} {size.stockQuantity > 0 ? `- В наличии (${size.stockQuantity})` : '- Нет в наличии'}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAddToCart}>
                        Добавить в корзину
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default ProductItem;
