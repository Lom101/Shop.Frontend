import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ProductItem from "./ProductItem";

const ProductList = observer (() => {
    const {productStore} = useContext(Context);

    return (
        <div className="d-flex flex-wrap">
            {productStore.products.map(product =>
                <ProductItem
                    key={product.id}
                    product={product}
                />
            )}
        </div>
    );
});

export default ProductList;