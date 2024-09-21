import React, { useContext } from 'react';
import { Card, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { PRODUCT_ROUTE } from "../utils/consts";
import { Context } from "../index";
import star from '../assets/svg/rating-star.svg';

const ProductItem = ({product}) => {

    const navigate = useNavigate();
    const { cartStore } = useContext(Context);

    
    const handleAddToCart = () => {
        cartStore.addToCart(product);
        alert(`${product.name} добавлен в корзину!`); // Сообщение для подтверждения
    };
    
    const handleCardClick = () => {
        navigate(PRODUCT_ROUTE + '/' + product.id);
    };

    const handleButtonClick = (event) => {
        event.stopPropagation(); // Останавливаем всплытие события
        handleAddToCart(product); // Добавляем продукт в корзину
    };

    return (
        <Col md={3} className="mt-3">
            <Card className='product-item' onClick={handleCardClick}>
                <div>
                    <div>{product.name}</div>
                    <button onClick={handleButtonClick}>Добавить в корзину</button>
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;

// process.env.REACT_APP_API_URL

{/* <div>{product.rating}</div>
<Image width={15} height={15} src={star} /> */}