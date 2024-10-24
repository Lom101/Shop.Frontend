import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import CheckoutForm from "../components/CheckoutForm";
import {createPaymentIntent} from "../http/stripeAPI";
import {Context} from "../index";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutPage= observer(() => {
    const [ clientSecret, setClientSecret ] = useState(null);
    const { cartStore } = useContext(Context);
    const { userStore } = useContext(Context);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const cartItems = cartStore.cartItems;  // Get cart items
                const data = await createPaymentIntent(userStore.user.id, cartItems); // В будущем здесь будет сумма из корзины
                setClientSecret(data);  // Set only clientSecret
            } catch (error) {
                console.error("Ошибка при получении clientSecret", error);
            }
        };

        fetchClientSecret();
    }, [cartStore.cartItems, userStore.user.id]);


    return(
        <>
            {clientSecret && stripePromise && (
                <Elements stripe={stripePromise} options={{clientSecret,}}>
                    <CheckoutForm/>
                </Elements>
            )}
        </>
    );
});

export default CheckoutPage;
