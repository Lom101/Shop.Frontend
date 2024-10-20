import {$authHost} from './index';

// Функция для получения категорий
export const fetchCategories = async () => {
    try {
        const response = await $authHost.get('/api/category');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении категорий: ' + error.message);
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await $authHost.delete(`/api/category/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при удалении категории:', error);
        throw error;
    }
};

export const updateCategory = async (id, category) => {
    try {
        const { data } = await $authHost.put(`/api/category/${id}`, category);
        return data;
    } catch (error) {
        console.error('Ошибка при создании категории:', error);
        throw error;
    }
};

export const createCategory = async (category) => {
    try {
        const { data } = await $authHost.post('/api/category', category);
        return data;
    } catch (error) {
        console.error('Ошибка при создании категории:', error);
        throw error;
    }
};

// Функция для получения продуктов
export const fetchProducts = async () => {
    try {
        const response = await $authHost.get('/api/product');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении продуктов: ' + error.message);
    }
};

export const createProduct = async (product) => {
    try {
        const { data } = await $authHost.post('/api/product', product);
        return data;
    } catch (error) {
        console.error('Ошибка при создании продукта:', error);
        throw error;
    }
};


// Функция для получения брендов
export const fetchBrands = async () => {
    try {
        const response = await $authHost.get('/api/brand');
        return response.data;
    } catch (error) {
        throw new Error('Ошибка при получении брендов: ' + error.message);
    }
}