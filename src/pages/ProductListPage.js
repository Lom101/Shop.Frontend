import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
//import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import '../assets/css/shop.css';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchProductsByCategory, fetchTotalCountOfProductsWithFiltration} from "../http/productAPI";

import PagesPagination from "../components/PagesPagination"

const ProductListPage = observer (() => {
    const  {productStore} = useContext(Context);

    // initial Fetch categories 
    useEffect(() => {
        try {
            fetchCategories().then(data => productStore.setCategories(data))
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
        // eslint-disable-next-line
    }, []);


    useEffect(() => {
        fetchTotalCountOfProductsWithFiltration(productStore.selectedCategory?.id || null).then(data =>{
            productStore.setTotalCount(data)
        })
    }, [productStore.selectedCategory])

    // Fetch products when category or page changes
    useEffect(() => {
        try {
            fetchProductsByCategory(productStore.selectedCategory?.id || null, productStore.page || 1, 4).then(data =>{
                productStore.setProducts(data);
                //productStore.setCountInPage(data.length);
            })
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    }, [productStore.page, productStore.selectedCategory]); // Dependencies: page and selectedCategory


    return (
        <Container>
            <Row className="shop-content">
                <Col md={3}>
                    {/* <CategoryBar /> */}
                </Col>
                <Col md={9}>
                    <ProductList/>
                    {/* <Page /> */}
                    <PagesPagination/>
                </Col>
            </Row>
        </Container>
    );
});

export default ProductListPage;
