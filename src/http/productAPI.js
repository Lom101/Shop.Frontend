import {$host, $authHost} from './index';

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category);
    return data;
}

export const fetchCategories= async () => {
    const {data} = await $host.get('api/category');
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product);
    return data;
}

export const fetchProductsByCategory = async (categoryId, page, limit = 4) => {
    // console.log('Fetching products by category:', categoryId);
    const {data} = await $host.get('api/product/filterByCategory', {
        params: {categoryId, page, limit}
    });
    // console.log('Data received:', data); // Добавьте это для отладки
    return data;
};

// if category === null -> return count of all products without filtration
export const fetchTotalCountOfProductsWithFiltration = async (categoryId) => {
    const {data} = await $host.get('api/product/totalCountInCategory', {
        params: {categoryId}
    });
    return data;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id);
    return data;
}
