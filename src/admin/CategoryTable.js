import React, { useState } from 'react';
import { observer } from "mobx-react-lite";
import { Table, Button, Modal, Form } from "react-bootstrap";
import adminStore from "../store/AdminStore";

const CategoryTable = observer(() => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');


    const handleDelete = async (id) => {
        await adminStore.deleteCategory(id);
    };
    const handleEdit = (category) => {
        setSelectedCategory(category);
        setEditCategoryName(category.name);
        setShowEditModal(true);
    };
    const handleEditSubmit = async () => {
        if (selectedCategory) {
            // await adminStore.updateCategory(selectedCategory.id, {
            //     ...selectedCategory,
            //     name: editCategoryName
            // });
            await adminStore.updateCategory({
                ...selectedCategory,
                name: editCategoryName
            });
            setShowEditModal(false);
        }
    };
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedCategory(null);
        setEditCategoryName('');
    };


    return (
        <>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Название</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody>
                {adminStore.categories.length === 0 ? (
                    <tr>
                        <td colSpan="3">Нет доступных категорий.</td>
                    </tr>
                ) : (
                    adminStore.categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td className="d-flex justify-content-end align-items-center">
                                <Button
                                    className="me-2"
                                    variant="warning"
                                    onClick={() => handleEdit(category)}
                                >
                                    Редактировать
                                </Button>
                                <Button
                                    className="me-2"
                                    variant="danger"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>

            {/* Модальное окно для редактирования категории */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактировать категорию</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="categoryName">
                            <Form.Label>Название категории</Form.Label>
                            <Form.Control
                                type="text"
                                value={editCategoryName}
                                onChange={(e) => setEditCategoryName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Отмена
                    </Button>
                    <Button variant="primary" onClick={handleEditSubmit}>
                        Сохранить изменения
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
});

export default CategoryTable;
