import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import {fetchAllReviews, fetchOneProduct, fetchReviewsOnProductPage} from "../http/productAPI";
import { Context } from '../index';
import { FaStar } from 'react-icons/fa';

const ProductPage = () => {
    const [product, setProduct] = useState({ info: [], models: [] });
    const [reviews, setReviews] = useState([]); // State for reviews
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const { id } = useParams();
    const { cartStore } = useContext(Context);


    useEffect(() => {
        fetchOneProduct(id).then(data => {
            setProduct(data);
            fetchReviewsOnProductPage(id).then(data => setReviews(data)); // Fetch reviews for the product
        });
    }, [id]);

    const addToCart = () => {
        if (selectedModel && selectedSize) {
            cartStore.addToCart(product, selectedModel.id, selectedSize.id);
        } else {
            alert("Пожалуйста, выберите модель и размер.");
        }
    };

    return (
        <Container className="mt-4 mb-3">
            <Row className="g-4">
                {/* Левая колонка: изображение продукта */}
                <Col md={4}>
                    <Image
                        src={`${process.env.REACT_APP_API_URL}/${selectedModel ? selectedModel.photos[0].url : product.models[0]?.photos[0]?.url}?v=@DateTime.UtcNow.Ticks`}
                        className="rounded shadow"
                        style={{ height: '450px', objectFit: 'contain' }}
                    />
                </Col>

                {/* Средняя колонка: название и описание продукта */}
                <Col md={4}>
                    <h2 className="text-2xl fw-bold">{product.name}</h2>


                    {/* Отображение рейтинга */}
                    <div className="d-flex align-items-center">
                        {product.averageRating > 0 ? (
                            <>
                                {/* Display rating with one decimal and "/5" */}
                                <span className="text-l pe-1 ps-2">{product.averageRating.toFixed(1)}</span>

                                {/* Display stars based on the rating */}
                                {[...Array(5)].map((_, index) => {
                                    const roundedRating = Math.round(product.averageRating * 2) / 2; // Round to the nearest 0.5
                                    const starClass = roundedRating >= index + 1
                                        ? 'text-warning'
                                        : roundedRating >= index + 0.5
                                            ? 'text-warning half-star' // For partial stars (you may add special CSS for half-star)
                                            : 'text-muted';

                                    return (
                                        <FaStar
                                            key={index}
                                            className={`me-1 ${starClass}`}
                                            size={20}
                                        />
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {/* Display "No reviews" and 5 gray stars if rating is 0 */}
                                <span className="text-l pe-1 ps-2">Отзывов нет</span>
                                {[...Array(5)].map((_, index) => (
                                    <FaStar
                                        key={index}
                                        className="me-1 text-muted"
                                        size={20}
                                    />
                                ))}
                            </>
                        )}
                    </div>

                    <div className="mt-2 border rounded shadow-sm p-3 bg-light">
                        {product.description}
                    </div>


                </Col>

                {/* Правая колонка: блок добавления в корзину */}
                <Col md={4}>
                    <Card className="shadow-sm p-4">
                        {/* Модели */}
                        <h5 className="fw-bold mb-3">Выберите модель:</h5>
                        <Row>
                            {product.models.map(model => (
                                <Col key={model.id} xs={5} className="mb-2">
                                    <Card
                                        className={`model-card ${selectedModel?.id === model.id ? 'border-success' : 'border-light'} shadow-sm`}
                                        onClick={() => {
                                            setSelectedModel(model);
                                            setSelectedSize(null);
                                        }}
                                        style={{cursor: 'pointer'}}
                                    >
                                        <Card.Body className="p-2 text-center">
                                            <Card.Title className="fs-6 mb-1">{model.color.name}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>


                        {/* Size Selection */}
                        <h5 className="fw-bold mt-3 mb-2">Выберите размер:</h5>
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

                        <h2 className="fw-bold mt-3">
                            Цена: <span
                            className="text-success">{selectedModel ? selectedModel.price : product.models[0]?.price} руб</span>
                        </h2>

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

            {/* Reviews Section */}
            <div className="mt-5">
                <h4 className="fw-bold">Отзывы:</h4>
                {console.log(reviews)}
                {reviews.length > 0 ? (
                    <ul className="list-unstyled">
                        {reviews.map(review => (
                            <li key={review.id} className="border-bottom mb-3 pb-2">
                                <div className="d-flex align-items-center">
                                    <FaStar className="text-warning me-2" />
                                    <span className="fw-bold">
                            {review.user ? review.user.userName : 'Anonymous'}
                        </span>
                                </div>
                                <p>{review.text}</p>
                                <small className="text-muted">
                                    {new Date(review.created).toLocaleDateString()}
                                </small>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Нет отзывов для этого продукта.</p>
                )}
            </div>


        </Container>
    );
};

export default ProductPage;
