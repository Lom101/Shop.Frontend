import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        // Параметры фильтрации
        this._products = [];
        this._categories = [];
        this._brands = [];
        this._sizes = [];
        this._colors = [];
        this._minPrice = null;
        this._maxPrice = null;

        // Выбранные параметры фильтрации
        this._selectedCategory = '';
        this._selectedBrand = '';
        this._selectedSizes = [];
        this._selectedColor = '';
        this._selectedMinPrice = null;
        this._selectedMaxPrice = null;
        this._selectedInStock = true;

        // Параметры пагинации
        this._totalCount = 0;
        this._pageNumber = 1;
        this._pageSize = 12;

        makeAutoObservable(this);
    }

    reset() {
        this._products = [];
        this._categories = [];
        this._brands = [];
        this._sizes = [];
        this._colors = [];
        this._minPrice = null;
        this._maxPrice = null;
        this._selectedCategory = '';
        this._selectedBrand = '';
        this._selectedSizes = [];
        this._selectedColor = '';
        this._selectedMinPrice = null;
        this._selectedMaxPrice = null;
        this._selectedInStock = true;
        this._totalCount = 0;
        this._pageNumber = 1;
        this._pageSize = 12;
    }

    // Методы установки
    setCategories(categories) {
        this._categories = categories;
    }

    setProducts(products) {
        this._products = products;
        this.setTotalCount(products.length); // Обновление общего количества
    }

    setBrands(brands) {
        this._brands = brands;
    }

    setSizes(sizes) {
        this._sizes = sizes;
    }

    setColors(colors) {
        this._colors = colors;
    }

    setMinPrice(minPrice) {
        this._minPrice = minPrice;
    }
    setMaxPrice(maxPrice) {
        this._maxPrice = maxPrice;
    }

    setSelectedCategory(category) {
        this._selectedCategory = category;
        this.setPage(1); // Сброс страницы
    }

    setSelectedBrand(brand) {
        this._selectedBrand = brand;
    }

    setSelectedSizes(sizes) {
        this._selectedSizes = sizes || [];
    }

    setSelectedColor(color) {
        this._selectedColor = color;
    }

    setSelectedMinPrice(price) {
        this._selectedMinPrice = price;
    }

    setSelectedMaxPrice(price) {
        this._selectedMaxPrice = price;
    }

    setSelectedInStock(inStock) {
        this._selectedInStock = inStock;
    }

    setPage(pageNumber) {
        this._pageNumber = pageNumber;
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    // Геттеры
    get categories() {
        return this._categories;
    }

    get products() {
        return this._products;
    }

    get brands() {
        return this._brands;
    }

    get sizes() {
        return this._sizes;
    }

    get colors() {
        return this._colors;
    }
    get minPrice() {
        return this._minPrice;
    }
    get maxPrice() {
        return this._maxPrice;
    }
    get selectedCategory() {
        return this._selectedCategory;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get selectedSizes() {
        return this._selectedSizes;
    }

    get selectedColor() {
        return this._selectedColor;
    }

    get selectedMinPrice() {
        return this._selectedMinPrice;
    }

    get selectedMaxPrice() {
        return this._selectedMaxPrice;
    }

    get selectedInStock() {
        return this._selectedInStock;
    }

    get pageNumber() {
        return this._pageNumber;
    }

    get totalCount() {
        return this._totalCount;
    }

    get pageSize() {
        return this._pageSize;
    }


}
