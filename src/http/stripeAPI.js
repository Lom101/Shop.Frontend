import {$host, $authHost} from './index';

// Функция для создания Payment Intent
export const createPaymentIntent = async (amount) => {
    try {
        const { data } = await $authHost.post(`api/payment/create-payment-intent`, { amount });
        console.log(data);
        return data;  // Убедитесь, что сервер возвращает объект с clientSecret
    } catch (error) {
        console.error('Ошибка при создании PaymentIntent', error);
        throw error;
    }
};
