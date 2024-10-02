import React, {useContext} from 'react';
import OrderItem from './OrderItem';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const OrderList  = observer (() => {

    const {userStore} = useContext(Context);

    return (
        <div>
            <h2>Ваши заказы:</h2>
            {userStore.orders.map((order) => (
                <OrderItem key={order.id} order={order}/>
            ))}
        </div>
    );
});

export default OrderList;