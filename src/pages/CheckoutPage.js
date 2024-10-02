import React, { useState, useEffect, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form, Alert } from 'react-bootstrap';
import { createPaymentIntent } from '../http/stripeAPI';
import { Context } from "../index";
import { addAddress, createOrder } from "../http/userAPI";

const CheckoutPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartStore } = useContext(Context);
    const { userStore } = useContext(Context);

    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [selectedAddressId, setSelectedAddressId] = useState(''); // Выбранный адрес
    const [contactPhone, setContactPhone] = useState(''); // Контактный телефон

    const totalAmount = cartStore.cartItems.reduce((total, item) => total + item.model.price * item.quantity, 0);
    const addressExists = userStore.addresses && userStore.addresses.length !== 0;

    const handleAddressChange = (e) => {
        setSelectedAddressId(e.target.value);
    };

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [addressData, setAddressData] = useState({ street: '', city: '', state: '', zipCode: '' });

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const addressWithUserId = { ...addressData, userId: userStore.user.id };
            if (userStore.user.id) {
                await addAddress(addressWithUserId);
                await userStore.fetchAddresses(); // Обновите адреса
                setShowAddressForm(false);
            } else {
                setError('Попробуйте еще раз.');
            }
        } catch (error) {
            console.error('Ошибка при добавлении адреса:', error);
            setError('Не удалось добавить адрес.');
        }
    };

    useEffect(() => {
        const initiatePayment = async () => {
            try {
                const clientSecret = await createPaymentIntent(totalAmount);
                setClientSecret(clientSecret);
            } catch (error) {
                console.error('Ошибка при создании PaymentIntent', error);
                setError('Ошибка при создании намерения платежа.');
            }
        };

        initiatePayment();
    }, [totalAmount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!stripe || !elements) {
            setError('Stripe не загружен.');
            setIsLoading(false);
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (!error) {
            const orderData = {
                userId: userStore.user.id,
                status: 1,
                paymentIntentId: paymentIntent.id,
                addressId: Number(selectedAddressId), // Используйте выбранный адрес
                contactPhone,
                orderItems: cartStore.cartItems.map(item => ({
                    modelId: Number(item.modelId), // Преобразуем modelId в число
                    sizeId: Number(item.sizeId), // Преобразуем sizeId в число
                    quantity: item.quantity, // quantity остается числом
                })),
            };
            try {
                await createOrder(orderData);
                setPaymentSuccess(true);
            } catch (error) {
                console.error("Ошибка создания заказа:", error);
                setError('Ошибка создания заказа.');
            }
        } else {
            console.error("Ошибка оплаты:", error);
        }

        setIsLoading(false);
    };

    return (
        <div className="container mt-4 mb-4">
            <h2>Оформление заказа</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {paymentSuccess ? (
                <Alert variant="success">Оплата прошла успешно!</Alert>
            ) : (
                <>
                    {!addressExists ? (
                        <>
                            <h4>Пожалуйста, добавьте адрес доставки</h4>
                            {showAddressForm ? (
                                <Form onSubmit={handleAddressSubmit}>
                                    <Form.Group>
                                        <Form.Label>Улица</Form.Label>
                                        <Form.Control type="text" onChange={e => setAddressData({ ...addressData, street: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Город</Form.Label>
                                        <Form.Control type="text" onChange={e => setAddressData({ ...addressData, city: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Штат</Form.Label>
                                        <Form.Control type="text" onChange={e => setAddressData({ ...addressData, state: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Почтовый индекс</Form.Label>
                                        <Form.Control type="text" onChange={e => setAddressData({ ...addressData, zipCode: e.target.value })} />
                                    </Form.Group>
                                    <Button type="submit">Добавить адрес</Button>
                                    <Button variant="secondary" onClick={() => setShowAddressForm(false)}>Отмена</Button>
                                </Form>
                            ) : (
                                <Button onClick={() => setShowAddressForm(true)}>Добавить новый адрес</Button>
                            )}
                        </>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Выберите адрес доставки</Form.Label>
                                <Form.Control as="select" value={selectedAddressId} onChange={handleAddressChange}>
                                    <option value="">Выберите адрес...</option>
                                    {userStore.addresses.map(address => (
                                        <option key={address.id} value={address.id}>
                                            {`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <div className="mb-3">
                                <h4>Сумма к оплате: {totalAmount} руб</h4>
                            </div>
                            <CardElement className="mb-3" />
                            <Button variant="success" type="submit" disabled={!stripe || isLoading}>
                                {isLoading ? 'Обработка...' : 'Оплатить'}
                            </Button>
                        </Form>
                    )}
                </>
            )}
        </div>
    );
};

export default CheckoutPage;
