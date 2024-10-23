import {useContext, useEffect, useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";
import {createOrder} from "../http/userAPI";
import React from 'react';
import {Context} from "../index";


// TODO: в будущем нужно создать context для хранения stripePromise и тд, но это не точно
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CompletionPaymentPage () {
    const [ messageBody, setMessageBody ] = useState('');
    const { cartStore } = useContext(Context);


    useEffect(() => {
        console.log("stripe prom", stripePromise)
        if (!stripePromise) return;

        stripePromise.then(async (stripe) => {
            const url = new URL(window.location);
            const clientSecret = url.searchParams.get('payment_intent_client_secret');
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);


            if (error) {
                console.error("Ошибка при получении PaymentIntent:", error.message);
            } else {
                // Если ошибки нет, то передаем данные на сервер для создания заказа
                console.log("PaymentIntent получен успешно:", paymentIntent);
                console.log("PaymentIntentId:", paymentIntent.id);
                try {
                    // Пробуем создать заказ
                    await createOrder(paymentIntent.id);
                    // Очищаем корзину
                    cartStore.clearCart();
                } catch (createOrderError) {
                    // Обработка ошибки при создании заказа
                    console.error("Ошибка при создании заказа:", createOrderError.message);
                }
            }

            setMessageBody(error ? `> ${error.message}` : (
                <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
            ));
        });
    }, []); // в скобках было stripePromise

    return (
        <>
            <h1>Thank you!</h1>
            <a href="/">home</a>
            <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
        </>
    );
}

export default CompletionPaymentPage;