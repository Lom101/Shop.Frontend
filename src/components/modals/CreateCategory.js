import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { createCategory } from "../../http/productAPI";

const CreateCategory = ({ show, onHide }) => {
    const [valueCategory, setValueCategory] = useState('');
    const [error, setError] = useState(null);

    const addCategory = async () => {
        try {
            if (!valueCategory.trim()) {
                setError("Пожалуйста, введите название категории");
                return;
            }

            const data = await createCategory({ name: valueCategory });
            setValueCategory('');
            setError(null);
            onHide();
            console.log('Категория успешно добавлена:', data);
        } catch (error) {
            console.error('Ошибка при добавлении категории:', error);
            setError("Произошла ошибка при добавлении категории. Попробуйте снова.");
        }
    }

    // Функция для сброса состояния при закрытии модального окна
    const handleCloseModal = () => {
        setValueCategory('');
        setError(null);
        onHide();
    }   

    return (
        <Modal
            show={show}
            onHide={handleCloseModal}
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
                        placeholder="Введите название типа"
                        value={valueCategory}
                        onChange={(e) => setValueCategory(e.target.value)}
                    />
                </Form>
                {error && (
                    <div className="mt-3 mb-3">
                        <Alert variant="danger">{error}</Alert>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleCloseModal}>
                    Закрыть
                </Button>
                <Button variant="outline-success" className="ml-auto mr-3" onClick={addCategory}>Добавить</Button>
            </Modal.Footer>

        </Modal>
    );
};

export default CreateCategory;
