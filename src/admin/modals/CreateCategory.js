import React, { useState } from 'react';
import { Button, Form, Modal, Alert, Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import adminStore from "../../store/AdminStore";

const CreateCategory = observer(({ show, onHide }) => {
    const [valueCategory, setValueCategory] = useState('');

    const addCategory = async () => {
        if (!valueCategory.trim()) {
            adminStore.error = "Пожалуйста, введите название категории";
            return;
        }

        await adminStore.createCategory({ name: valueCategory });

        if (!adminStore.error) {
            setValueCategory(''); // Сбрасываем значение после успешного добавления
            onHide(); // Закрываем модальное окно
        }
    };

    // Функция для сброса состояния при закрытии модального окна
    const handleCloseModal = () => {
        setValueCategory('');
        adminStore.error = null; // Сбрасываем ошибку
        onHide();
    };

    return (
        <Modal show={show} onHide={handleCloseModal} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить новую категорию
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder="Введите название категории"
                        value={valueCategory}
                        onChange={(e) => setValueCategory(e.target.value)}
                    />
                </Form>

                {adminStore.error && (
                    <div className="mt-3 mb-3">
                        <Alert variant="danger">{adminStore.error}</Alert>
                    </div>
                )}

                {adminStore.isLoading && (
                    <div className="d-flex justify-content-center my-3">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Загрузка...</span>
                        </Spinner>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={handleCloseModal} disabled={adminStore.isLoading}>
                    Закрыть
                </Button>
                <Button
                    variant="outline-success"
                    className="ml-auto mr-3"
                    onClick={addCategory}
                    disabled={adminStore.isLoading}
                >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateCategory;
