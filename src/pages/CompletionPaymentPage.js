import {useEffect, useState} from 'react';
import {loadStripe} from "@stripe/stripe-js";

// вынужденная мера, в будущем нужно создать context для хранения stripePromise и тд
const stripePromise = loadStripe("pk_test_51Q53yhKGJp4CXm6iZcGeA1nSqBrOUSfL9eDP3ZOPK4jNa0SnzmDKBBYHVuxqNc3VepeXyICm7mfOUSKWwmdLFPw700Exd3W2RT");

function CompletionPaymentPage () {
    const [ messageBody, setMessageBody ] = useState('');


    useEffect(() => {
        console.log("stripe prom", stripePromise)
        if (!stripePromise) return;

        stripePromise.then(async (stripe) => {
            const url = new URL(window.location);
            const clientSecret = url.searchParams.get('payment_intent_client_secret');
            const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

            console.log("Complete window")
            console.log(paymentIntent)

            setMessageBody(error ? `> ${error.message}` : (
                <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
            ));
        });
    }, [stripePromise]); // в скобках было stripePromise

    return (
        <>
            <h1>Thank you!</h1>
            <a href="/">home</a>
            <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
        </>
    );
}

export default CompletionPaymentPage;