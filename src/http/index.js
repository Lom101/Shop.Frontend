import axios from 'axios'
import { refreshToken } from './userAPI';

// обычные запросы
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// Запросы с токеном (получаем через интерцептор)
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})  

$authHost.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

$authHost.interceptors.response.use(
    response => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const newToken = await refreshToken();
          $authHost.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
          return $authHost(originalRequest);
        } catch (refreshError) {
          // Логика обработки ошибок при обновлении токена (например, перенаправление на страницу входа)
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

export {
    $host, $authHost
}