import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateCategory from "../components/modals/CreateCategory";
import CreateProduct from "../components/modals/CreateProduct";

const AdminPage = () => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [productVisible, setProductVisible] = useState(false);
    return (
        <Container>
            <div className="admin-content w-25">
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-3"
                    onClick={()=>setCategoryVisible(true)}
                >
                    Добавить тип
                </Button>
                <Button
                    variant={"outline-dark"}
                    className="mt-4 p-3"
                    onClick={()=>setProductVisible(true)}
                >
                    Добавить товар
                </Button>
                <CreateCategory show={categoryVisible} onHide={()=> setCategoryVisible(false)} />
                <CreateProduct show={productVisible} onHide={()=> setProductVisible(false)} />
            </div>

        </Container>
    );
};

export default AdminPage;