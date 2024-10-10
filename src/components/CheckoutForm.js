import {observer} from "mobx-react-lite";
import React from 'react';
import {
    PaymentElement,
    LinkAuthenticationElement, AddressElement
} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import { Button, Alert, Form  } from 'react-bootstrap';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import AddressInput from "./AddressInput";

const CheckoutForm = observer(() =>{
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');

    const handleAddressChange = (newAddress) => {
        setAddress(newAddress);
        console.log('Выбранный адрес:', newAddress); // Используйте значение как вам нужно
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!(phoneNumber && isValidPhoneNumber(phoneNumber.toString()))) {
            console.log("Phone Number Invalid");
            return;
        }
        if (!address) {
            console.log("Address Invalid");
            return;
        }
        if (!name) {
            console.log("Name Invalid");
            return; // Проверка на наличие имени
        }

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // URL для завершения платежа
                return_url: `${window.location.origin}/completion`,
                shipping: {
                    name: name,
                    address: {
                        line1: address, // Передача адреса
                    },
                    phone: phoneNumber, // Передача номера телефона
                },
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    }


    return (
        <form id="payment-form" onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mb-3"
                />
            </Form.Group>

            <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <PhoneInput
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    defaultCountry="RU"
                    required
                    className="mb-3"
                />
            </Form.Group>

            <LinkAuthenticationElement
                id="link-authentication-element"
                // options={{ defaultValues: { email: 'foo@bar.com' } }}
            />

            <h3 className="mt-4 mb-3">Shipping Address</h3>
            <AddressInput onAddressChange={handleAddressChange}/>

            <h3 className="mt-4 mb-3">Payment Details</h3>
            <PaymentElement id="payment-element"/>
            <Button
                type="submit"
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="mt-4 w-100"
            >
                {isLoading ? <div className="spinner-border spinner-border-sm" role="status"><span
                    className="visually-hidden">Loading...</span></div> : "Pay Now"}
            </Button>
            {message && (
                <Alert variant="danger" className="mt-3" id="payment-message">
                    {message}
                </Alert>
            )}
        </form>
    );
});

export default CheckoutForm;