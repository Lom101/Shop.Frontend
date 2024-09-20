import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;  
        this._user = {};
        this.loadInitialData();
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }
    
    loadInitialData(){
        // Получаем информацию о пользователе из локального хранилища при инициализации
        const savedUser = localStorage.getItem('authToken');
        console.log("токен - ", savedUser);
        if (savedUser) {
            this.setIsAuth(true);
        }
    };

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
}

