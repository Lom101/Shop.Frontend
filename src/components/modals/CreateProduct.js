import React, {useContext, useEffect, useState} from 'react';
import {Button,  Dropdown, Form, Modal,  Alert} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createProduct, fetchCategories} from "../../http/productAPI";

const CreateProduct = observer(({show, onHide}) => {
    const {productStore} = useContext(Context);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stockQuantity, setStockQuantity] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateForm = () => {
        if (!name.trim()) {
            setErrorMessage('Введите название товара');
            return false;
        }
        if (!description.trim()) {
            setErrorMessage('Введите описание товара');
            return false;
        }
        const priceNum = Number(price);
        if (isNaN(priceNum) || priceNum <= 0) {
            setErrorMessage('Цена должна быть положительным числом');
            return false;
        }
        const stockQuantityNum = Number(stockQuantity);
        if (isNaN(stockQuantityNum) || stockQuantityNum < 0) {
            setErrorMessage('Количество на складе должно быть целым числом, не меньше 0');
            return false;
        }
        if (!imageUrl.trim()) {
            setErrorMessage('Введите URL изображения товара');
            return false;
        }
        if (!productStore.selectedCategory) {
            setErrorMessage('Выберите категорию товара');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const addProduct = () => {
        if (!validateForm()) return;

        const productData = {
            name,
            description,
            price: Number(price),
            stockQuantity: Number(stockQuantity),
            imageUrl,
            categoryId: productStore.selectedCategory.id
        };

        createProduct(productData).then(() => {
            resetForm();
            onHide();
        });
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setPrice('');
        setStockQuantity('');
        setImageUrl('');
        productStore.setSelectedCategory(null);
        setErrorMessage(''); // Сброс ошибки при закрытии формы
    };

    useEffect(() => {
        fetchCategories().then(data => productStore.setCategories(data));
    }, [productStore]);

    return (
        <Modal
            show={show}
            onHide={() => {
                resetForm();
                onHide();
            }}
            size="md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый товар
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {errorMessage && 
                        <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                            {errorMessage}
                        </Alert>
                    }
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{productStore.selectedCategory?.name || 'Выберите категорию товара'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {productStore.categories?.map(category =>
                                <Dropdown.Item
                                    onClick={() => productStore.setSelectedCategory(category)}
                                    key={category.id}>
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите название товара"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите описание товара"
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите стоимость товара"
                        type="text"
                        pattern="\d*"
                        inputMode="numeric"
                        value={price === 0 ? '' : price}  // Пустое поле, если цена равна 0
                        onChange={e => setPrice(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите количество на складе"
                        type="text"
                        pattern="\d*"
                        inputMode="numeric"
                        value={stockQuantity === 0 ? '' : stockQuantity} // Пустое поле по умолчанию
                        onChange={e => setStockQuantity(e.target.value)}
                    />

                    <Form.Control
                        className="mt-3"
                        placeholder="Введите URL изображения товара"
                        type="text"
                        value={imageUrl}
                        onChange={e => setImageUrl(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={() => {
                    resetForm();
                    onHide();
                }}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;
