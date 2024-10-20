import React, {useContext, useEffect, useState} from 'react';
import {Badge, Button, Card, Col, Modal, Form} from "react-bootstrap";
import Placeholder from 'react-bootstrap/Placeholder';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from "../utils/consts";
import { Context } from "../index";
import { FaStar } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import Compressor from "compressorjs";

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
            // alert(`${product.name} добавлен в корзину!`);
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

    const [compressedImageUrl, setCompressedImageUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // ?v=@DateTime.UtcNow.Ticks
    const imageUrl = `${process.env.REACT_APP_API_URL}/${product.models[0].photos[0].url}?v=${Date.now()}`;
    useEffect(() => {
        const fetchImageAsBlob = async (url) => {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");
            return await response.blob();
        };

        const compressImage = async () => {
            try {
                const imageBlob = await fetchImageAsBlob(imageUrl); // Fetch image as Blob
                const compressedBlob = await new Promise((resolve, reject) => {
                    new Compressor(imageBlob, {
                        quality: 0.6,
                        maxWidth: 800,
                        maxHeight: 800,
                        mimeType: "image/jpeg",
                        success(result) {
                            resolve(result);
                        },
                        error(error) {
                            reject(error);
                        },
                    });
                });

                setCompressedImageUrl(URL.createObjectURL(compressedBlob));
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        compressImage();
    }, []); // Make sure to include imageUrl as a dependency

    return (
        <Col md={3} className="mb-3">

                {isLoading ? (
                    <Card style={{ width: '18rem' }}>
                        {/* Используем Placeholder для изображения */}
                        <div style={{ height: '200px', position: 'relative' }}>
                            <Placeholder as="div" animation="wave" style={{ height: '100%', backgroundColor: '#e0e0e0' }} />
                        </div>
                        <Card.Body>
                            <Placeholder as={Card.Title} animation="wave">
                                <Placeholder xs={6} />
                            </Placeholder>
                            <Placeholder as={Card.Text} animation="wave">
                                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card className='product-item shadow-sm border-0 transform transition-transform duration-200 hover:scale-105' onClick={handleCardClick}>

                    <Card.Img
                        variant="top"
                        src={compressedImageUrl}
                        alt={product.name}
                        className="cursor-pointer"
                        style={{
                            height: '200px',
                            width: '100%',
                            objectFit: 'cover'
                        }}
                    />
                <Card.Body>
                    <Card.Text className="cursor-pointer">{product.name}</Card.Text>
                    <Card.Title className="cursor-pointer">{getPriceRange(product.models)}</Card.Title>

                    <div className="d-flex align-items-center">
                        {product.averageRating > 0 ? (
                            <>
                                <div className="cursor-pointer d-flex align-items-center">
                                    <span>{product.averageRating.toFixed(1)}</span>
                                    <FaStar className="text-warning ms-1"/>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="cursor-pointer d-flex align-items-center">
                                    <FaStar className="text-gray-400 ms-1 me-1"/> {/* Серая звездочка */}
                                    <span className="text-gray-400">Нет отзывов</span> {/* Текст при отсутствии отзывов */}
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {/* Список размеров */}
                        <div>
                            {availableSizes.map(size => (
                                <Badge  key={size.id} pill bg="dark" className="cursor-pointer me-1 mb-1">
                                    {size.name}
                                </Badge>
                            ))}
                        </div>

                        {/* Иконка корзины */}
                        <div
                            className="me-3 bg-gray-800 text-white p-2.5 rounded-full inline-flex items-center justify-center cursor-pointer hover:bg-gray-700 transform transition-transform duration-200 hover:scale-110"
                            onClick={handleAddToCart} // Обработчик клика
                        >
                            <FaShoppingCart size={24}/>
                        </div>
                    </div>

                </Card.Body>
            </Card>

                )}


            {/* Модальное окно для выбора модели и размера */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton className="border-b border-gray-300">
                    <Modal.Title className="text-xl font-semibold">Выберите модель и размер</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-gray-50 p-4">
                    <Form>
                        {/* Выбор модели */}
                        <Form.Group className="mb-3">
                            <Form.Label>Модель</Form.Label>
                            <Form.Select
                                onChange={handleModelChange}
                                defaultValue=""
                                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                            >
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
                                <Form.Select
                                    onChange={handleSizeChange}
                                    defaultValue=""
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2"
                                >
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
                <Modal.Footer className="border-t border-gray-300">
                    <Button variant="danger" onClick={handleCloseModal}>
                        Отмена
                    </Button>
                    <Button variant="success" onClick={handleConfirmAddToCart}>
                        Добавить в корзину
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

const getPriceRange = (models) => {
    if (models.length === 0) {
        return "Нет доступных цен";
    }

    const prices = models.map(model => model.price); // Получаем массив цен
    const minPrice = Math.min(...prices); // Находим минимальную цену
    const maxPrice = Math.max(...prices); // Находим максимальную цену

    // Если минимальная и максимальная цена совпадают, отображаем только одну цену
    if (minPrice === maxPrice) {
        return `${minPrice} руб.`;
    }

    return `${minPrice} - ${maxPrice} руб.`; // Форматируем строку диапазона
};


export default ProductItem;
