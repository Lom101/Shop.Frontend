import {$host, $authHost} from './index';
import { jwtDecode } from 'jwt-decode';

export const registration = async (email, username, password) => {
      const response = await $host.post('api/Auth/registration', { email, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return jwtDecode(token);
};

export const login = async (email, password) => {
        const response = await $host.post('api/Auth/login', { email, password });

        if (!response) {
        throw new Error(`HTTP ошибка: ${response.status}`);
        }

        console.log("токены", response.data);

        const accessToken = response.data.token;
        const refreshToken = response.data.refreshToken;

        localStorage.setItem('authToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        console.log("токен - ", localStorage.getItem('authToken'));

        return jwtDecode(accessToken);
};
// error.response.data.errors[0]

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await $host.post('api/Auth/refresh_token', { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem('authToken', accessToken);
        return accessToken;
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Перенаправление на страницу логина
        //return Promise.reject(refreshError);
    }
};

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    // Очистка cookies
    document.cookie.split(";").forEach(function(cookie) {
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
};

// Отправка запроса для сброса пароля (на email)
export const forgotPasswordRequest = async (email) => {
    const {data} = await $host.post('api/auth/forgot_password', {email} );
    return data;
}

// Завершение сброса пароля с использованием кода
export const resetPassword = async (email, Code, newPassword) => {
    const {data} = await $host.post('api/Auth/reset_password', {email, Code, newPassword});
    return data;
};

export const fetchProfile = async () => {
    const response = await $authHost.get(`api/Profile`);
    return response.data;
};

// Метод для получения всех адресов пользователя
export const fetchAddresses = async () => {
    const response = await $authHost.get(`api/Address/me`);
    return response.data;
};

// Метод для получения всех заказов пользователя
export const fetchOrders = async (userId) => {
    const response = await $authHost.get(`api/Order/me`)
    return response.data;
};

export const createOrder = async (paymentIntentId) => {
    const {data} = await $authHost.post('api/order/create_order', {paymentIntentId} );
    return data;
}

export const fetchReviews = async (productId) => {
    const response = await $authHost.get(`api/Review/`, {
        params: { productId }
    });
    return response;
}

export const submitReview = async ({ text, rating, productId, userId }) => {
    try {
        await $authHost.post('api/review', {
            text,
            rating,
            productId,
            UserId: userId,
        });
    } catch (error) {
        console.error("Ошибка при отправке отзыва:", error);
        throw error; // Если нужно обработать ошибку на уровне вызова
    }
};
