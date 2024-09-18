import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createCategory} from "../../http/productAPI";

const CreateCategory = ({show, onHide}) => {

    const [valueCategory, setValueCategory] = useState('');
    const addCategory = () => {
        createCategory({name: valueCategory}).then(data => {
            setValueCategory('');
            onHide();
        })
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новый тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={"Введите название типа"}
                        value={valueCategory}
                        onChange={e => setValueCategory(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"light"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCategory}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateCategory;