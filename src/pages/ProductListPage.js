import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import ProductList from "../components/ProductList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { fetchFilteredPagedProducts, fetchProductFilterOptions} from "../http/productAPI";

import PagesPagination from "../components/PagesPagination"
import FilterPanel from '../components/FilterPanel';

const ProductListPage = observer (() => {
    const  {productStore} = useContext(Context);
    const [loading, setLoading] = useState(true); // Состояние загрузки фильтров


    useEffect(() => {
        fetchProductFilterOptions().then(data=>{
            productStore.setCategories(data.categories);
            productStore.setBrands(data.brands);
            productStore.setSizes(data.sizes);
            productStore.setColors(data.colors);
            productStore.setMinPrice(data.minPrice);
            productStore.setMaxPrice(data.maxPrice);
            // setLoading(false); // Данные загружены, убираем индикатор загрузки

            // Установите загрузку в false с задержкой
            setTimeout(() => {
                setLoading(false);
            }, 700); // 700 миллисекунд (0,7 секунды)
        });

    }, [productStore]);

    useEffect(() => {
        if (!loading) { // Запрос только если данные фильтров загружены
            const categoryId = productStore.selectedCategory?.id;
            const brandId = productStore.selectedBrand?.id;
            const sizeIds = productStore.selectedSizes?.map(size => size.id) || null;
            const colorIds = productStore.selectedColor?.id;
            const minPrice = productStore.selectedMinPrice;
            const maxPrice = productStore.selectedMaxPrice;
            const inStock = productStore.selectedInStock;

            console.log('Параметры для фильтрации:');
            console.log('Category ID:', categoryId || 'Не выбран');
            console.log('Brand ID:', brandId || 'Не выбран');
            console.log('Size ID:', sizeIds || 'Не выбран');
            console.log('Color ID:', colorIds || 'Не выбран');
            console.log('Min Price:', minPrice !== undefined ? minPrice : 'Не указано');
            console.log('Max Price:', maxPrice !== undefined ? maxPrice : 'Не указано');
            console.log('In Stock:', inStock !== undefined ? inStock : 'Не указано');
            console.log('Page Number:', productStore.pageNumber || 'Не указано');
            console.log('Page Size:', productStore.pageSize || 'Не указано');

            fetchFilteredPagedProducts(
                productStore.pageNumber,
                productStore.pageSize,
                categoryId,
                brandId,
                sizeIds,
                colorIds,
                minPrice,
                maxPrice,
                inStock
            )
                .then(data => {
                    productStore.setProducts(data.items);
                    productStore.setTotalCount(data.totalCount);
                });
        }
    }, [loading, productStore.selectedCategory, productStore.selectedBrand, productStore.selectedSizes,
        productStore.selectedColor, productStore.selectedMinPrice, productStore.selectedMaxPrice, productStore.selectedInStock,
        productStore.pageNumber, productStore.pageSize]);
   
    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Spinner animation="border"/>
                </div>
            ) : (
                <Container fluid className='mb-3 mt-4 pe-4'>
                    <Row className="shop-content">
                    <Col md={2}>
                            <FilterPanel />
                        </Col>
                        <Col md={10}>
                            <ProductList />
                            <PagesPagination />
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
});

export default ProductListPage;