import { makeAutoObservable } from "mobx";

export default class ProductStore {
    constructor() {
        // поля 
        this._products = [];
        this._categories = [];
        this._brands = [];
        this._sizes = [];
        this._colors = [];
        this._minPrice = null;
        this._maxPrice = null;
        this._inStock = true;

        // выбранные поля для фильтрации
        this._selectedCategory = '';
        this._selectedBrand = '';
        this._selectedSizes = [];
        this._selectedColor = '';
        this._selectedMinPrice = null;
        this._selectedMaxPrice = null;
        this._selectedInStock = true;

        // поля для пагинации
        this._totalCount = 0; // всего элементов
        this._pageNumber = 1; // номер выбранной страницы
        this._pageSize = 12; // количество элементов на странице
        makeAutoObservable(this);
    }
    // Сеттеры
    setCategories(categories) {
        this._categories = categories;
    }

    setProducts(products) {
        console.log('Products set:', products); // Для отладки
        this._products = products;
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

    setInStock(inStock) {
        this._inStock = inStock;
    }

    setSelectedCategory(category) {
        console.log('Selected category:', category?.id);
        this._selectedCategory = category;
        this.setPage(1); // Сброс страницы
    }

    setSelectedBrand(brand) {
        console.log('Selected brand:', brand?.id);
        this._selectedBrand = brand;
    }

    setSelectedSizes(sizes) {
        // Проверяем, является ли sizes массивом, и выводим все айдишники
        const sizeIds = sizes?.map(size => size.id) || []; // Получаем массив айдишников или пустой массив
        console.log('Selected sizes IDs:', sizeIds);
        this._selectedSizes = sizes;
    }

    setSelectedColor(color) {
        console.log('Selected color:', color?.id);
        this._selectedColor = color;
    }

    setSelectedMinPrice(price) {
        console.log('Selected min price:', price);
        this._selectedMinPrice = price;
    }

    setSelectedMaxPrice(price) {
        console.log('Selected max price:', price);
        this._selectedMaxPrice = price;
    }

    setSelectedInStock(inStock) {
        console.log('Selected in stock:', inStock);
        this._selectedInStock = inStock;
    }


    setPage(pageNumber) {
        this._pageNumber = pageNumber;
    }

    setTotalCount(totalCount) {
        console.log('TotalCount set:', totalCount); // Для отладки
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

    get inStock() {
        return this._inStock;
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