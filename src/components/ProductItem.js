import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import '../assets/css/productitem.css';
import star from '../assets/svg/rating-star.svg';
import {useNavigate} from 'react-router-dom';
import {PRODUCT_ROUTE} from "../utils/consts";

const ProductItem = ({product}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className="mt-3">
            <Card className='product-item' onClick={()=> navigate(PRODUCT_ROUTE + '/' + product.id)}>
                {/* <Image src={product.imageUrl} className="product-img" /> */}
                <div className="d-flex justify-content-between mt-2">
                    {/* <div className="text-black-50">Samsung</div> */}
                    <div className="d-flex align-items-center">
                        {/* <div>{product.rating}</div>
                        <Image width={15} height={15} src={star} /> */}
                    </div>
                </div>
                <div>
                    {product.name}
                </div>
            </Card>
        </Col>
    );
};

export default ProductItem;

// process.env.REACT_APP_API_URL