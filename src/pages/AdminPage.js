import React, { useEffect, useState } from 'react';
import { Button, Container, Tabs, Tab } from "react-bootstrap";
import CreateCategory from "../admin/modals/CreateCategory";
import CreateProduct from "../admin/modals/CreateProduct";
import { observer } from "mobx-react-lite";
import adminStore from "../store/AdminStore";
import CategoryTable from "../admin/CategoryTable"; // Компонент для отображения категорий
import ProductTable from "../admin/ProductTable"; // Компонент для отображения продуктов

const AdminPage = observer(() => {
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [showCreateProduct, setShowCreateProduct] = useState(false);

    useEffect(() => {
        // Загружаем категории и продукты при загрузке компонента
        const fetchData = async () => {
            await adminStore.fetchCategories();
            await adminStore.fetchProducts();
            await adminStore.fetchBrands();
        };

        fetchData();
    }, []);

    return (
        <Container>
            <Tabs defaultActiveKey="categories" id="admin-tabs" className="mb-4 mt-2">
                <Tab eventKey="categories" title="Категории">
                    <div className="mt-3 mb-3 d-flex justify-content-between align-items-center">
                        <h2>Список категорий</h2>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => setShowCreateCategory(true)}
                        >
                            Добавить категорию
                        </Button>
                    </div>
                    <CategoryTable />
                </Tab>
                <Tab eventKey="products" title="Товары">
                    <div className="mt-3 mb-3 d-flex justify-content-between align-items-center">
                        <h2>Список товаров</h2>
                        <Button
                            variant={"outline-dark"}
                            onClick={() => setShowCreateProduct(true)}
                        >
                            Добавить товар
                        </Button>
                    </div>
                    <ProductTable />
                </Tab>
            </Tabs>

            <CreateCategory show={showCreateCategory} onHide={() => setShowCreateCategory(false)} />
            <CreateProduct show={showCreateProduct} onHide={() => setShowCreateProduct(false)} />
        </Container>
    );
});

export default AdminPage;
