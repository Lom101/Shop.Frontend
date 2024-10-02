import { makeAutoObservable } from "mobx";
import {fetchAddresses, fetchOrders} from "../http/userAPI";
import {jwtDecode} from "jwt-decode";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = null;
        this._addresses = [];
        this._orders = [];
        this.loadInitialData();
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setAddresses(addresses) {
        this._addresses = addresses;
    }

    setOrders(orders){
        this._orders = orders;
    }

    async loadInitialData() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.setIsAuth(true);
            const decoded = jwtDecode(token);
            const userData = {
                id: decoded.Id,
                email: decoded.email,
            };
            this.setUser(userData);

            try {
                console.log('Id пользователя перед отправкой запроса', this.user.id);
                const addresses = await fetchAddresses(this.user.id); // Используем await
                this.setAddresses(addresses);
                console.log('Адреса юзера', this.addresses);
            } catch (error) {
                console.error('Ошибка при загрузке адресов:', error);
            }

            try {
                console.log('Id пользователя перед отправкой запроса', this.user.id);
                const orders = await fetchOrders(this.user.id); // Используем await
                this.setOrders(orders);
                console.log('Заказы юзера', this.addresses);
            } catch (error) {
                console.error('Ошибка при загрузке заказов:', error);
            }
        }
    }

    async fetchAddresses() {
        try {
            const addresses = await fetchAddresses(this.user.id); // Замените на свой API
            this.setAddresses(addresses);
        } catch (error) {
            console.error('Ошибка при загрузке адресов:', error);
        }
    }


    isAdmin() {
        const token = localStorage.getItem('authToken');
        if (!token) return false;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'Admin';
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }

    get addresses() {
        return this._addresses;
    }

    get orders(){
        return this._orders;
    }
}

