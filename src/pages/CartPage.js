import React, { useContext } from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const CartPage = observer(() => {
    const { cartStore } = useContext(Context);

    return (
         <div>
            <h1>Корзина</h1>
            {cartStore.cartItems.length === 0 ? (
                <p>Ваша корзина пуста.</p>
            ) : (
                <ul>
                    {cartStore.cartItems.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );  
});

export default CartPage;
