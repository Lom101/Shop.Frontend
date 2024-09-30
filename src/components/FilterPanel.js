import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Form, Row, Col, Button } from "react-bootstrap";
import '../assets/css/filterpanel.css'

const FilterPanel = observer(() => {
    const { productStore } = useContext(Context);

    const [minPrice, setMinPrice] = useState(productStore.selectedMinPrice || productStore._minPrice);
    const [maxPrice, setMaxPrice] = useState(productStore.selectedMaxPrice || productStore._maxPrice);

    const handlePriceChange = () => {
        productStore.setSelectedMinPrice(minPrice);
        productStore.setSelectedMaxPrice(maxPrice);
    };

    const clearFilters = () => {
        productStore.setSelectedCategory('');
        productStore.setSelectedBrand('');
        productStore.setSelectedColor('');
        productStore.setSelectedSizes([]);
        setMinPrice(productStore._minPrice);
        setMaxPrice(productStore._maxPrice);
        productStore.setSelectedInStock(true);
    };

    return (
        <div className="border p-3 mb-4 bg-light rounded">
            <h5 className="fw-bold">Категории</h5>
            <ListGroup className="mb-3">
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

            <h5 className="fw-bold">Бренды</h5>
            <ListGroup className="mb-3">
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

            <h5 className="fw-bold">Цвет</h5>
            <Form.Control
                as="select"
                className="mb-3"
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

            <h5 className="fw-bold">Размер</h5>
            <div style={{
                maxHeight: '150px',
                overflowY: 'auto',
                border: '1px solid #ced4da',
                borderRadius: '0.25rem',
                padding: '0.5rem'
            }}>
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

            <h5 className="fw-bold">Цена</h5>
            <Row className="mb-3">
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
            <Button variant="primary" className="w-100 mb-2" onClick={handlePriceChange}>Применить</Button>

            <Button variant="secondary" className="w-100 mb-3" onClick={clearFilters}>Очистить фильтры</Button>

            <h5 className="fw-bold mt-3">В наличии</h5>
            <Form.Check
                type="checkbox"
                label="Показать только товары в наличии"
                checked={productStore.selectedInStock || false}
                onChange={(e) => productStore.setSelectedInStock(e.target.checked)}
            />
        </div>
    );
});

export default FilterPanel;
