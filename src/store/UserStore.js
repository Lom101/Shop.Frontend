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
        // Попробуйте получить информацию о пользователе из локального хранилища при инициализации
        const savedUser = localStorage.getItem('authToken');
        console.log("токен - ", savedUser);
        if (savedUser) {
            this.setIsAuth(true);
        }
    };

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}

