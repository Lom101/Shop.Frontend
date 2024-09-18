import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CategoryBar from "../components/CategoryBar";
import ProductList from "../components/ProductList";
import Page from "../components/Pages";
import '../assets/css/shop.css';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchCategories, fetchProductsByCategory, fetchTotalCountOfProductsWithFiltration} from "../http/productAPI";

const Shop = observer (() => {
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


    // нужно достать количество всех элементов
    // и присвоить productStore.setTotalCount количество элементов в категории, либо если передаем null
    // то получим количество всех товаров (если пользователь выбрал none)

    return (
        <Container>
            <Row className="shop-content">
                <Col md={3}>
                    <CategoryBar />
                </Col>
                <Col md={9}>
                    <ProductList/>
                    <Page />
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
