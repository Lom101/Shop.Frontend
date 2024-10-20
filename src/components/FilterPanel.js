import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { Form, Row, Col, Button } from "react-bootstrap";
import '../assets/css/filterpanel.css'
import { useLocation } from 'react-router-dom';

const FilterPanel = observer(() => {
    const { productStore } = useContext(Context);
    const location = useLocation();

    const [minPrice, setMinPrice] = useState(productStore.selectedMinPrice || productStore._minPrice);
    const [maxPrice, setMaxPrice] = useState(productStore.selectedMaxPrice || productStore._maxPrice);

    // Установка таймера для применения цен после завершения ввода
    useEffect(() => {
        const handler = setTimeout(() => {
            productStore.setSelectedMinPrice(minPrice);
            productStore.setSelectedMaxPrice(maxPrice);
        }, 500); // 500 мс задержки

        return () => {
            clearTimeout(handler); // Очистка таймера при изменении или размонтировании
        };
    }, [minPrice, maxPrice, productStore]);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const categoryId = queryParams.get('category');

        if (categoryId) {
            const selectedCategory = productStore.categories.find(
                (category) => category.id === +categoryId
            );
            productStore.setSelectedCategory(selectedCategory);
        } else {
            productStore.setSelectedCategory('');
        }
    }, [location.search, productStore.categories]);

    // Используем useEffect для установки начальных значений из productStore
    useEffect(() => {
        setMinPrice(productStore.selectedMinPrice || productStore._minPrice);
        setMaxPrice(productStore.selectedMaxPrice || productStore._maxPrice);
    }, [productStore]);

    const clearFilters = () => {
        productStore.setSelectedCategory('');
        productStore.setSelectedBrand('');
        productStore.setSelectedColor('');
        productStore.setSelectedSizes([]);
        setMinPrice(productStore._minPrice); // записываем значения на ui
        setMaxPrice(productStore._maxPrice);
        productStore.setSelectedMinPrice(productStore._minPrice); // и также записываем в store
        productStore.setSelectedMaxPrice(productStore._maxPrice);
        productStore.setSelectedInStock(true);
    };

    return (
        <div className="border p-3 mb-4 bg-white rounded shadow-sm">
            <h5 className="fw-bold ps-1 mb-1">Категории</h5>
            <Form.Control
                as="select"
                className="mb-2"
                value={productStore.selectedCategory?.id || ''}
                onChange={(e) => {
                    if (e.target.value === '') {
                        productStore.setSelectedCategory('');
                    } else {
                        const selectedCategory = productStore.categories.find(
                            (category) => category.id === +e.target.value
                        );
                        productStore.setSelectedCategory(selectedCategory);
                    }
                }}
            >
                <option value="">Все</option>
                {Array.isArray(productStore.categories) && productStore.categories.length > 0 ? (
                    productStore.categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))
                ) : (
                    <option value="">Нет категорий</option>
                )}
            </Form.Control>


            {/*<h5 className="fw-bold ps-1 mb-1">Бренды</h5>*/}
            {/*<ListGroup className="mb-2">*/}
            {/*    <ListGroup.Item*/}
            {/*        className={`filterPanel-item ${'' === productStore.selectedBrand ? 'active' : ''}`}*/}
            {/*        onClick={() => productStore.setSelectedBrand('')}*/}
            {/*    >*/}
            {/*        Все бренды*/}
            {/*    </ListGroup.Item>*/}
            {/*    {Array.isArray(productStore.brands) && productStore.brands.length > 0 ? (*/}
            {/*        productStore.brands.map((brand) => (*/}
            {/*            <ListGroup.Item*/}
            {/*                key={brand.id || brand}*/}
            {/*                className={`filterPanel-item ${brand === productStore.selectedBrand ? 'active' : ''}`}*/}
            {/*                onClick={() => productStore.setSelectedBrand(brand)}*/}
            {/*            >*/}
            {/*                {brand.name || brand}*/}
            {/*            </ListGroup.Item>*/}
            {/*        ))*/}
            {/*    ) : (*/}
            {/*        <ListGroup.Item className="filterPanel-item">Нет брендов</ListGroup.Item>*/}
            {/*    )}*/}
            {/*</ListGroup>*/}

            <h5 className="fw-bold ps-1 mb-1">Бренды</h5>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2 mb-3">
                <Form.Check
                    type="radio"
                    id="brand-all"
                    label="Все бренды"
                    checked={productStore.selectedBrand === ""}
                    onChange={() => productStore.setSelectedBrand("")}
                />
                {Array.isArray(productStore.brands) && productStore.brands.length > 0 ? (
                    productStore.brands.map((brand) => (
                        <Form.Check
                            key={brand.id || brand}
                            type="radio" // Изменено на radio
                            id={`brand-${brand.id}`}
                            label={brand.name || brand}
                            checked={productStore.selectedBrand === brand} // Проверяем, выбран ли бренд
                            onChange={() => {
                                console.log("Бренд ", brand.id);
                                productStore.setSelectedBrand(brand); // Устанавливаем выбранный бренд
                            }}
                        />
                    ))
                ) : (
                    <p>Нет доступных брендов</p>
                )}
            </div>


            <h5 className="fw-bold ps-1 mb-1">Цвет</h5>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2 mb-3">
                <Form.Check
                    type="radio"
                    id="color-all"
                    label="Все цвета"
                    checked={productStore.selectedColor === ""}
                    onChange={() => productStore.setSelectedColor("")}
                />
                {Array.isArray(productStore.colors) && productStore.colors.length > 0 ? (
                    productStore.colors.map((color) => (
                        <Form.Check
                            key={color.id || color}
                            type="radio" // Изменено на radio
                            id={`color-${color.id}`}
                            label={color.name || color}
                            checked={productStore.selectedColor === color} // Проверяем, выбран ли цвет
                            onChange={() => {
                                console.log("Цвет ", color.id);
                                productStore.setSelectedColor(color); // Устанавливаем выбранный цвет
                            }}
                        />
                    ))
                ) : (
                    <p>Нет доступных цветов</p>
                )}
            </div>


            <h5 className="fw-bold ps-1 mb-1">Размер</h5>
            <div className="max-h-32 overflow-y-auto border border-gray-300 rounded p-2 mb-3">
                {Array.isArray(productStore.sizes) && productStore.sizes.length > 0 ? (
                    productStore.sizes.map((size) => (
                        <Form.Check
                            key={size.id || size}
                            type="checkbox"
                            id={`size-${size.id}`}
                            label={size.name || size}
                            checked={productStore.selectedSizes?.includes(size)} // Используем опциональную цепочку
                            onChange={() => {
                                console.log("Размер ", size.id)
                                if (productStore.selectedSizes?.includes(size)) {
                                    // Если размер уже выбран, удаляем его из списка
                                    productStore.setSelectedSizes(productStore.selectedSizes.filter(s => s !== size));
                                } else {
                                    // Если размер не выбран, добавляем его в список
                                    productStore.setSelectedSizes([...productStore.selectedSizes, size]);
                                }
                            }}
                        />
                    ))
                ) : (
                    <p>Нет доступных размеров</p>
                )}
            </div>

            <h5 className="fw-bold ps-1 mb-1">Цена</h5>
            <Row className="mb-2">
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Мин"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="number"
                        placeholder="Макс"
                        value={maxPrice || ''}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Col>
            </Row>

            <h5 className="fw-bold ps-1 mb-1">В наличии</h5>
            <Form.Check
                className="mb-2"
                type="checkbox"
                label="Показать только товары в наличии"
                checked={productStore.selectedInStock || false}
                onChange={(e) => productStore.setSelectedInStock(e.target.checked)}
            />
            <Button variant="primary" className="w-100 mb-2 shadow" onClick={clearFilters}>Очистить фильтры</Button>

        </div>
    );
});

export default FilterPanel;
