import React, {useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import '../assets/css/filterpanel.css'

const FilterPanel = observer(() => {
    const { productStore } = useContext(Context);

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
            <ListGroup className="mb-2">
                <ListGroup.Item
                    className={`filterPanel-item ${'' === productStore.selectedCategory ? 'active' : ''}`}
                    onClick={() => productStore.setSelectedCategory('')}
                >
                    Все
                </ListGroup.Item>
                {productStore.categories.length > 0 ? (
                    productStore.categories.map((category) => (
                        <ListGroup.Item
                            key={category.id || category}
                            className={`filterPanel-item ${productStore.selectedCategory?.id === category.id ? 'active' : ''}`}
                            // className={`filterPanel-item ${category === productStore.selectedCategory ? 'active' : ''}}`}
                            onClick={() => {
                                productStore.setSelectedCategory(category);
                            }}
                        >
                            {category.name || category}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="filterPanel-item">Нет категорий</ListGroup.Item>
                )}
            </ListGroup>

            <h5 className="fw-bold ps-1 mb-1">Бренды</h5>
            <ListGroup className="mb-2">
                <ListGroup.Item
                    className={`filterPanel-item ${'' === productStore.selectedBrand ? 'active' : ''}`}
                    onClick={() => productStore.setSelectedBrand('')}
                >
                    Все бренды
                </ListGroup.Item>
                {Array.isArray(productStore.brands) && productStore.brands.length > 0 ? (
                    productStore.brands.map((brand) => (
                        <ListGroup.Item
                            key={brand.id || brand}
                            className={`filterPanel-item ${brand === productStore.selectedBrand ? 'active' : ''}`}
                            onClick={() => productStore.setSelectedBrand(brand)}
                        >
                            {brand.name || brand}
                        </ListGroup.Item>
                    ))
                ) : (
                    <ListGroup.Item className="filterPanel-item">Нет брендов</ListGroup.Item>
                )}
            </ListGroup>

            <h5 className="fw-bold ps-1 mb-1">Цвет</h5>
            <Form.Control
                as="select"
                className="mb-2"
                value={productStore.selectedColor?.id || ''}
                onChange={(e) => {
                    if (e.target.value === "") {
                        productStore.setSelectedColor("");
                    }
                    const selectedColor = productStore.colors.find(color => color.id === +e.target.value);
                    productStore.setSelectedColor(selectedColor);
                }}
            >
                <option value="">Все цвета</option>
                {Array.isArray(productStore.colors) && productStore.colors.length > 0 ? (
                    productStore.colors.map((color) => (
                        <option key={color.id || color} value={color.id || color}>
                            {color.name || color}
                        </option>
                    ))
                ) : (
                    <option value="">Нет доступных цветов</option>
                )}
            </Form.Control>

            <h5 className="fw-bold ps-1 mb-1">Размер</h5>
            <div className="max-h-36 overflow-y-auto border border-gray-300 rounded p-2 mb-3">
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
                        value={minPrice || ''}
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
