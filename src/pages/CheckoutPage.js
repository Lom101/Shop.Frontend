import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import CheckoutForm from "../components/CheckoutForm";
import {createPaymentIntent} from "../http/stripeAPI";
import {Context} from "../index";

const stripePromise = loadStripe("pk_test_51Q53yhKGJp4CXm6iZcGeA1nSqBrOUSfL9eDP3ZOPK4jNa0SnzmDKBBYHVuxqNc3VepeXyICm7mfOUSKWwmdLFPw700Exd3W2RT");


const CheckoutPage= observer(() => {
    const [ clientSecret, setClientSecret ] = useState(null);
    const { cartStore } = useContext(Context);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const cartItems = cartStore.cartItems;  // Get cart items
                const data = await createPaymentIntent(cartItems); // В будущем здесь будет сумма из корзины
                setClientSecret(data);  // Set only clientSecret
            } catch (error) {
                console.error("Ошибка при получении clientSecret", error);
            }
        };

        fetchClientSecret();
    }, []);


    return(
        <>
            <h1>Payment</h1>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{clientSecret,}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    );
});

export default CheckoutPage;
