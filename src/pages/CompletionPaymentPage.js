import { useEffect, useState, useContext } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { createOrder } from '../http/userAPI';
import { Context } from '../index';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function CompletionPaymentPage() {
  const [message, setMessage] = useState('Загрузка...');
  const { cartStore } = useContext(Context);

  useEffect(() => {
    stripePromise.then(async (stripe) => {
      if (!stripe) {
        setMessage('Ошибка инициализации Stripe');
        return;
      }

      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      if (!clientSecret) {
        setMessage('Отсутствует client secret');
        return;
      }

      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if (error) {
        setMessage(`Ошибка при оплате: ${error.message}`);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        try {
          await createOrder(paymentIntent.id);
          cartStore.clearCart();
          setMessage('Спасибо за заказ!');
        } catch (err) {
          setMessage(`Ошибка при создании заказа: ${err.message}`);
        }
      } else {
        setMessage(`Оплата неуспешна. Статус: ${paymentIntent.status}`);
      }
    });
  }, [cartStore]);

  return (
  <>
    <h1 className="text-3xl text-center mt-[20vh] mb-5">
      {message}
    </h1>
    <div className="text-center">
      <a href="/" className="text-lg text-blue-600 hover:underline">
        На главную
      </a>
    </div>
  </>
);

}

export default CompletionPaymentPage;
