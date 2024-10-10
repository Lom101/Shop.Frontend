import { makeAutoObservable } from "mobx";
import { fetchAddresses, fetchOrders } from "../http/userAPI";
import { jwtDecode } from "jwt-decode";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = null;
        this._addresses = [];
        this._orders = [];
        this.loadInitialData();
        makeAutoObservable(this);
    }

    reset() {
        this._isAuth = false;
        this._user = null;
        this._addresses = [];
        this._orders = [];
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

    setOrders(orders) {
        this._orders = orders;
    }

    async loadInitialData() {
        const token = localStorage.getItem('authToken');
        if (token) {
            this.setIsAuth(true);
            const decoded = jwtDecode(token);
            this.setUser({ id: decoded.Id, email: decoded.email });
            await this.fetchUserData();
        }
    }

    async fetchUserData() {
        const userId = this.user.id;

        try {
            const [addresses, orders] = await Promise.all([
                fetchAddresses(userId),
                fetchOrders(userId),
            ]);
            this.setAddresses(addresses);
            this.setOrders(orders);
        } catch (error) {
            console.error('Ошибка при загрузке данных пользователя:', error);
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

    get orders() {
        return this._orders;
    }
}
