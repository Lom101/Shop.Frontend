import {$host, $authHost} from './index';
import { jwtDecode } from 'jwt-decode';

export const registration = async (email, username, password) => {
    try {
      const response = await $host.post('api/Auth/registration', { email, username, password });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      return jwtDecode(token);
    } catch (error) {
        // // Проверяем, если ошибка это ошибка от сервера (например, ошибка HTTP)
        // if (error.response) {
        //     // Сервер ответил с кодом состояния, который не в диапазоне 2xx
        //     console.error('Server Error:', error.response.data.message || error.response.statusText);
        //     throw new Error(error.response.data.message || 'Server error');
        // } else if (error.request) {
        //     // Запрос был отправлен, но ответ не был получен
        //     console.error('Network Error:', error.request);
        //     throw new Error('Network error');
        // } else {
        //     // Что-то пошло не так при настройке запроса
        //     console.error('Error:', error.message);
        //     throw new Error(error.message || 'Unknown error');
        // }
    }
};
  

export const login = async (email, password) => {
    try {
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
    } catch (error) {
        console.log('Данные ошибки:', error);
        if (error instanceof Error) {
            throw new Error(`${error}`);
        } 
    }
  };
  

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
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
};

export const addAddress = async (addressData) => {
    const response = await $authHost.post('/api/address', addressData);
    return response;
};

// Метод для получения всех адресов пользователя
export const fetchAddresses = async (userId) => {
    const response = await $authHost.get(`api/Address/get_by_user_id`, {
        params: { userId }
    });
    return response.data;
};

export const createOrder = async (order) => {
    const {data} = await $authHost.post('api/order', order);
    return data;
}

// Метод для получения всех заказов пользователя
export const fetchOrders = async (userId) => {
    const response = await $authHost.get(`api/Order/get_by_user_id`, {
        params: { userId }
    });
    return response.data;
};