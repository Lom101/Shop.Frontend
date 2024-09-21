import { makeAutoObservable } from "mobx";

export default class CartStore {
    constructor() {
        this._cartItems = [];
        makeAutoObservable(this);
    }

    addToCart(product) {
        this._cartItems.push(product);
    }

    removeFromCart(productId) {
        this._cartItems = this._cartItems.filter(item => item.id !== productId);
    }
    
    get cartItems() {
        return this._cartItems; // Геттер для доступа к cartItems
    }

    get totalItems() {
        return this._cartItems.length; // Правильно
    }
}
