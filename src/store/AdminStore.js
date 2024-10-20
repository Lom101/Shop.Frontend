import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify"; // Импортируем библиотеку уведомлений
import {
    fetchCategories, createCategory, deleteCategory, updateCategory,
    fetchProducts, createProduct,
    fetchBrands
} from "../http/adminAPI";

class AdminStore {
    constructor() {
        this.categories = [];
        this.products = [];
        this.brands = [];
        this.isLoading = false;
        this.error = null;
        makeAutoObservable(this);
    }

    // Метод для получения категорий
    async fetchCategories() {
        this.isLoading = true;
        try {
            this.categories = await fetchCategories();
        } catch (err) {
            this.error = err.message;
            toast.error(`Ошибка при загрузке категорий: ${err.message}`);
        } finally {
            this.isLoading = false;
        }
    }

    // Метод для удаления категории
    async deleteCategory(id) {
        try {
            await deleteCategory(id);
            this.categories = this.categories.filter(category => category.id !== id); // Удаляем категорию из локального состояния
            toast.success(`Категория с ID ${id} успешно удалена`);
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
            toast.error(`Ошибка при удалении категории: ${error.message}`);
        }
    }

    // Метод для изменения категории
    async updateCategory(updatedCategory) {
        const id = updatedCategory.id
        this.isLoading = true;
        this.error = null;
        try {
            const data = await updateCategory(updatedCategory.id, updatedCategory);
            // Находим индекс обновленной категории в локальном списке
            const index = this.categories.findIndex(category => category.id === id);
            if (index !== -1) {
                this.categories[index] = { ...this.categories[index], ...data };
            }
            toast.success(`Категория с ID ${id} успешно обновлена`);
        } catch (err) {
            this.error = 'Ошибка при обновлении категории: ' + (err.response?.data || err.message);
            console.error('Ошибка при обновлении категории:', err);
            toast.error(`Ошибка при обновлении категории: ${err.message}`);
        } finally {
            this.isLoading = false;
        }
    }

    // Метод для добавления категории
    async createCategory(category) {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await createCategory(category);
            //this.categories.push(data); // Добавляем категорию в локальный список
            await this.fetchCategories(); // Добавляем категорию в локальный список
            console.log('Категория успешно добавлена:', data);
            toast.success(`Категория с ID ${data.id} успешно добавлена`);
        } catch (err) {
            this.error = 'Ошибка при добавлении категории: ' + err.response.data ||  err.message;
        } finally {
            this.isLoading = false;
        }
    }

    // Метод для получения продуктов
    async fetchProducts() {
        this.isLoading = true;
        try {
            this.products = await fetchProducts();
        } catch (err) {
            this.error = err.message;
            toast.error(`Ошибка при загрузке продуктов: ${err.message}`);
        } finally {
            this.isLoading = false;
        }
    }

    // Метод для добавления продукта
    async createProduct(product) {
        this.isLoading = true;
        this.error = null;
        try {
            const data = await createProduct(product);
            //this.products.push(data); // Добавляем категорию в локальный список
            await this.fetchProducts(); // Добавляем категорию в локальный список
            console.log('Продукт успешно добавлен:', data);
            toast.success(`Продукт с ID ${data.id} успешно добавлена`);
        } catch (err) {
            this.error = 'Ошибка при добавлении продукта: ' + err.response.data ||  err.message;
        } finally {
            this.isLoading = false;
        }
    }

    // Метод для изменения продукта

    // Метод для удаления продукта


    // Метод для получения брендов
    async fetchBrands(){
        this.isLoading = true;
        try{
            this.brands = await fetchBrands();
        }
        catch (err) {
            this.error = err.message;
            toast.error(`Ошибка при загрузке брендов: ${err.message}`);
        } finally {
            this.isLoading = false;
        }
    }


}

const adminStore = new AdminStore();
export default adminStore;
