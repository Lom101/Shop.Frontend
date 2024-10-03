import React, {useContext} from 'react';
import OrderItem from './OrderItem';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const OrderList  = observer (() => {

    const {userStore} = useContext(Context);

    return (
        <div className="container mb-5 p-5">
            <h2 className="mb-4 text-3xl font-bold text-center">
                Заказы
            </h2>

            {userStore.orders.length > 0 ? (
                userStore.orders.map((order) => (
                    <OrderItem key={order.id} order={order} />
                ))
            ) : (
                <p className="text-center fs-5">У вас нет заказов.</p>
            )}
        </div>
    );
});

export default OrderList;