import {$host, $authHost} from './index';

// Function to create Payment Intent
export const createPaymentIntent = async (cartItems) => {
    try {
        // Extract only modelId, sizeId, and quantity from each cart item
        const orderItems = cartItems.map(item => ({
            modelId: item.modelId,
            sizeId: item.sizeId,
            quantity: item.quantity
        }));

        // Send the transformed cart items (orderItems) to the backend
        const { data } = await $authHost.post(`api/payment/create-payment-intent`, { orderItems });
        console.log(data);
        return data;  // Server should return an object with clientSecret
    } catch (error) {
        console.error('Error while creating PaymentIntent', error);
        throw error;
    }
};
