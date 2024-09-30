import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Badge } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneProduct } from "../http/productAPI";
import { Context } from '../index';
import { FaStar } from 'react-icons/fa'; // Импортируем иконку звезды

const ProductPage = () => {
    const [product, setProduct] = useState({ info: [], models: [] });
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { id } = useParams();
    const { cartStore } = useContext(Context);


    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
    }, [id]);

    const addToCart = () => {
        if (selectedModel && selectedSize) {
            cartStore.addToCart(product, selectedModel.id, selectedSize.id);
        } else {
            alert("Пожалуйста, выберите модель и размер.");
        }
    };

    return (
        <Container className="product-page mt-4 mb-3">
            <Row className="g-4">
                {/* Левая колонка: изображение продукта */}
                <Col md={4}>
                    <Image
                        src={`${process.env.REACT_APP_API_URL}/images/${selectedModel ? selectedModel.photos[0].fileName : product.models[0]?.photos[0]?.fileName}`}
                        className="product-big-image rounded border shadow-sm"
                        style={{ height: '400px', objectFit: 'contain' }}
                    />
                </Col>

                {/* Средняя колонка: название и описание продукта */}
                <Col md={4}>
                    <h2 className="product-title">{product.name}</h2>
                    <div className="product-description p-3 border rounded shadow-sm">
                        {product.description}
                    </div>

                    {/* Отображение рейтинга */}
                    <div className="product-rating d-flex align-items-center">
                        <p className="m-0 me-2">Рейтинг:</p>
                        {[...Array(5)].map((_, index) => (
                            <FaStar
                                key={index}
                                className={`me-1 ${index < product.averageRating ? 'text-warning' : 'text-muted'}`} // Звезды окрашиваются в желтый, если рейтинг соответствует
                                size={20} // Размер звезды
                            />
                        ))}
                        <span>{product.averageRating} из 5</span>
                    </div>

                    {/* Отображение доступных размеров */}
                    <div className="mt-3">
                        <h5>Доступные размеры:</h5>
                        <div>
                            {product.models.flatMap(model => model.sizes.filter(size => size.isAvailable)).map(size => (
                                <Badge key={size.id} pill bg="success" className="me-1 mb-1">
                                    {size.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Col>

                {/* Правая колонка: блок добавления в корзину */}
                <Col md={4}>
                    <Card className="shadow-sm p-3">
                        <h2 className="price-title">
                            Цена: <span className="text-success">{selectedModel ? selectedModel.price : product.models[0]?.price} руб</span>
                        </h2>

                        {/* Модели */}
                        <h5>Выберите модель:</h5>
                        <Row>
                            {product.models.map(model => (
                                <Col key={model.id} xs={6} className="mb-2">
                                    <Card
                                        className={`model-card ${selectedModel?.id === model.id ? 'border-primary' : ''}`}
                                        onClick={() => {
                                            setSelectedModel(model);
                                            setSelectedSize(null);
                                        }}
                                    >
                                        <Card.Body>
                                            <Card.Title>{model.color.name}</Card.Title>
                                            <Card.Text>
                                                Цена: {model.price} руб
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>

                        {/* Выбор размеров */}
                        <h5 className="mt-3">Выберите размер:</h5>
                        <Row>
                            {selectedModel?.sizes.filter(size => size.isAvailable).map(size => (
                                <Col key={size.id} xs={4} className="mb-2">
                                    <Button
                                        variant={selectedSize?.id === size.id ? 'success' : 'outline-secondary'}
                                        onClick={() => setSelectedSize(size)}
                                        className="w-100"
                                    >
                                        {size.name}
                                    </Button>
                                </Col>
                            ))}
                        </Row>

                        <Button
                            className="w-100 mt-3"
                            variant="primary"
                            onClick={addToCart}
                            disabled={!selectedModel || !selectedSize}
                        >
                            Добавить в корзину
                        </Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;
