import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import '../assets/css/categorybar.css'

const CategoryBar = observer (() => {
    const {productStore} = useContext(Context);
    return (
        <div>
            <h3>Filter by:</h3>
            <ListGroup>
                     <ListGroup.Item
                        className="categoryBar-item"
                        active={null === productStore.selectedCategory}
                        onClick={()=> productStore.setSelectedCategory(null)}
                    >
                        None
                    </ListGroup.Item>
                {productStore.categories.map(category =>
                    <ListGroup.Item
                        key={category.id}
                        className="categoryBar-item"
                        active={category.id === productStore.selectedCategory?.id}
                        onClick={()=> productStore.setSelectedCategory(category)}
                    >
                        {category.name}
                    </ListGroup.Item>
                )}
            </ListGroup>
        </div>
    );
});

export default CategoryBar;