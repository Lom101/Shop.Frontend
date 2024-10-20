import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal, Alert } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import adminStore from "../../store/AdminStore";

const CreateProduct = observer(({ show, onHide }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null); // Локальное состояние для категории
    const [selectedBrand, setSelectedBrand] = useState(null); // Локальное состояние для бренда
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
        if (!selectedCategory) {
            setErrorMessage('Выберите категорию товара');
            return false;
        }
        if (!selectedBrand) {
            setErrorMessage('Выберите бренд товара');
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
            categoryId: selectedCategory.id, // Используем локальное состояние
            brandId: selectedBrand.id, // Используем локальное состояние
        };

        adminStore.createProduct(productData).then(() => {
            resetForm();
            onHide();
        }).catch(error => {
            setErrorMessage('Произошла ошибка при добавлении товара');
        });
    };

    const resetForm = () => {
        setName('');
        setDescription('');
        setSelectedCategory(null); // Сбрасываем локальное состояние
        setSelectedBrand(null); // Сбрасываем локальное состояние
        setErrorMessage('');
    };

    // useEffect(() => {
    //     adminStore.fetchCategories() // Загружаем категории
    //     adminStore.fetchBrands(); // Предполагается, что вы хотите загрузить бренды
    // }, [adminStore]);

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
                        <Dropdown.Toggle>
                            {selectedCategory?.name || 'Выберите категорию товара'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {adminStore.categories?.map(category =>
                                <Dropdown.Item
                                    onClick={() => setSelectedCategory(category)}
                                    key={category.id}>
                                    {category.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {selectedBrand?.name || 'Выберите бренд товара'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {adminStore.brands?.map(brand =>
                                <Dropdown.Item
                                    onClick={() => setSelectedBrand(brand)}
                                    key={brand.id}>
                                    {brand.name}
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
