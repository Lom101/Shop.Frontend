import { makeAutoObservable } from "mobx";

// Класс CartStore управляет состоянием корзины покупок
export default class CartStore {
    constructor() {
        // Инициализация корзины из localStorage или пустого массива, если данные отсутствуют
        this._cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        // MobX делает свойства и методы реактивными
        makeAutoObservable(this);
    }

    // Метод для добавления товара в корзину
    addToCart(product, modelId, sizeId) {
        // Поиск выбранной модели и размера
        const model = product.models.find(model => model.id === modelId);
        const size = model?.sizes.find(size => size.id === sizeId);

        // Формирование нового объекта товара для корзины
        const cartItem = {
            productId: product.id,
            modelId: modelId,
            sizeId: sizeId,
            name: product.name,
            model: model,
            size: size,
            quantity: 1 // Начальное количество — 1
        };

        // Поиск товара в корзине, если он уже добавлен
        const existingItem = this._cartItems.find(
            item => item.productId === product.id && item.modelId === modelId && item.sizeId === sizeId
        );

        // Если товар уже есть в корзине, увеличиваем его количество
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Если товара нет в корзине, добавляем новый элемент
            this._cartItems.push(cartItem);
        }

        // Сохранение корзины в localStorage
        this.saveCart();
    }

    // Метод для удаления товара из корзины
    removeFromCart(productId, modelId, sizeId) {
        // Фильтрация корзины, удаление элемента с заданным productId, modelId и sizeId
        this._cartItems = this._cartItems.filter(
            item => !(item.productId === productId && item.modelId === modelId && item.sizeId === sizeId)
        );
        // Сохранение изменений в localStorage
        this.saveCart();
    }

    // Метод для сохранения корзины в localStorage
    saveCart() {
        try {
            // Сериализация корзины в JSON и сохранение в localStorage
            localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
        } catch (error) {
            // Обработка ошибки при сохранении
            console.error("Error saving cart items:", error);
        }
    }

    // Метод для очистки корзины
    clearCart() {
        // Очищаем массив корзины
        this._cartItems = [];
        // Сохраняем пустую корзину в localStorage
        this.saveCart();
    }

    reset() {
        this._cartItems = [];
        localStorage.removeItem('cartItems'); // Удаление данных из localStorage
    }

    // Геттер для получения списка товаров в корзине
    get cartItems() {
        return this._cartItems;
    }

    // Метод для увеличения количества определённого товара в корзине
    increaseQuantity(productId, modelId, sizeId) {
        // Поиск товара в корзине
        const existingItem = this._cartItems.find(
            item => item.productId === productId && item.modelId === modelId && item.sizeId === sizeId
        );
        // Увеличение количества, если товар найден
        if (existingItem) {
            existingItem.quantity += 1;
            // Сохранение изменений в корзине
            this.saveCart();
        }
    }

    // Метод для уменьшения количества товара в корзине
    decreaseQuantity(productId, modelId, sizeId) {
        // Поиск товара в корзине
        const existingItem = this._cartItems.find(
            item => item.productId === productId && item.modelId === modelId && item.sizeId === sizeId
        );
        // Если товар найден и его количество больше 1, уменьшаем количество
        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity -= 1;
        } else {
            // Если количество товара 1 или меньше, удаляем товар из корзины
            this.removeFromCart(productId, modelId, sizeId);
        }
        // Сохранение изменений в корзине
        this.saveCart();
    }

    // Геттер для получения общего количества товаров в корзине
    get totalItems() {
        // Суммируем количество каждого товара в корзине
        return this._cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    // Геттер для получения общей суммы товаров в корзине
    get totalPrice() {
        // Суммируем стоимость каждого товара с учётом его количества
        return this._cartItems.reduce((total, item) => {
            return total + item.quantity * item.model.price;
        }, 0);
    }
}
