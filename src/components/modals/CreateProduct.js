import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createProduct, fetchCategories} from "../../http/productAPI";

const CreateProduct = observer (({show, onHide}) => {
    const {productStore} = useContext(Context);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const addProduct = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('categoryId', productStore.selectedCategory.id);
        createProduct(formData).then(data => onHide());
    }


    useEffect(() => {
        fetchCategories().then(data => productStore.setCategories(data)); 
        
        // eslint-disable-next-line
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
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
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{productStore.selectedCategory.name || 'Выберите категорию товара'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {productStore.Categories?.map(category =>
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
                        placeholder="Введите стоимость товара"
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <hr/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-light"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addProduct}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProduct;
