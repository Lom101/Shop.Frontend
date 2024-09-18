import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image} from "react-bootstrap";
import '../assets/css/productpage.css'
import star from '../assets/svg/rating-star.svg';
import {useParams} from 'react-router-dom';
import {fetchOneProduct} from "../http/productAPI";

const ProductPage = () => {
    const [product, setProduct] = useState({info: []});
    const {id} = useParams();

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data));
        // eslint-disable-next-line
    }, []);

    return (
        <Container className="product-page">
           <div className="d-flex">
               <Col md={8} className="product-left">
                   <div className="d-flex align-items-start">
                       <Image src={process.env.REACT_APP_API_URL + product.imageUrl} className="product-big-image" />
                       <div>
                           <h2 className="product-title">{product.name}</h2>
                           <div className="product-rating">
                               {/* <p>Рейтинг: {product.rating}</p> */}
                               {/* <Image src={star} /> */}
                           </div>
                       </div>
                   </div>
               </Col>
               <Col md={4}>
                   <Card className="product-right">
                       <h2 className="price-title">
                           Цена от: {product.price} руб
                       </h2>
                       <Button className="product-btn-basket">
                           Добавить в корзину
                       </Button>
                   </Card>
               </Col>
           </div>
            <div className="d-flex flex-column mt-4 mb-5">
                <h3 className="p-0">Характеристики</h3>
                <div className="product-description">
                    {product.description}
                </div>
            </div>
        </Container>
    );
};

export default ProductPage;