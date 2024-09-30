import { makeAutoObservable } from "mobx";

export default class CartStore {
    constructor() {
        this._cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        makeAutoObservable(this);
    }

    addToCart(product, modelId, sizeId) {
        const cartItem = {
            productId: product.id,
            modelId: modelId,
            sizeId: sizeId,
            name: product.name,
            model: product.models.find(model => model.id === modelId),
            size: product.models.find(model => model.id === modelId)?.sizes.find(size => size.id === sizeId),
            quantity: 1
        };

        const existingItem = this._cartItems.find(
            item => item.productId === product.id && item.modelId === modelId && item.sizeId === sizeId
        );

        if (existingItem) {
            existingItem.quantity += 1; // Increase the quantity if it exists
        } else {
            this._cartItems.push(cartItem); // Otherwise, add it to the cart
        }

        this.saveCart();
    }

    removeFromCart(productId, modelId, sizeId) {
        this._cartItems = this._cartItems.filter(
            item => !(item.productId === productId && item.modelId === modelId && item.sizeId === sizeId)
        );
        this.saveCart();
    }

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this._cartItems));
    }

    get cartItems() {
        return this._cartItems;
    }

    get totalItems() {
        return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    }
}
