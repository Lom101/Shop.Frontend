import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        this._categories = [];
        this._products = [];
        this._selectedCategory = null;
        this._page = 1;
        this._countInPage = 0;
        this._totalCount = 0;
        this._limit = 4;
        makeAutoObservable(this);
    }

    setCategories(categories) {
        this._categories = categories;
    }

    setProducts(products) {
        console.log('Products set:', products); // Для отладки
        this._products = products;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
        this.setPage(1); // Переносим сброс страницы сюда
    }

    setPage(page) {
        this._page = page;
    }

    setCountInPage(countInPage) {
        console.log('countInPage set:', countInPage); // Для отладки
        this._countInPage = countInPage;
    }

    setTotalCount(totalCount) {
        console.log('TotalCount set:', totalCount); // Для отладки
        this._totalCount = totalCount;
    }

    get categories() {
        return this._categories;
    }

    get products() {
        return this._products;
    }

    get selectedCategory() {
        return this._selectedCategory;
    }

    get page() {
        return this._page;
    }

    get countInPage() {
        return this._countInPage;
    }
    
    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }
}
