import {$host, $authHost} from './index';

export const createCategory = async (category) => {
    const {data} = await $authHost.post('api/category', category);
    return data;
}

export const createProduct = async (product) => {
    const {data} = await $authHost.post('api/product', product);
    return data;
}

export const fetchOneProduct = async (id) => {
    const {data} = await $host.get('api/product/' + id);
    return data;
}

export const fetchCategories= async () => {
    const {data} = await $host.get('api/category');
    return data;
}

export const fetchProductFilterOptions = async () => {
    const {data} = await $host.get('api/product/filter_options');
    return data;
}

export const fetchFilteredPagedProducts = async (
    pageNumber = 1,
    pageSize = 12,
    categoryId,
    brandId,
    sizeIds, // Массив идентификаторов размеров
    colorIds, // Массив идентификаторов цветов
    minPrice,
    maxPrice,
    inStock
) => {
    // Преобразуем массив sizeIds в строку формата sizeIds=1&sizeIds=2
    const sizeIdParams = sizeIds?.map(id => `sizeIds=${id}`).join('&') || '';

    // Формируем объект параметров фильтрации
    const filterParams = {
        pageNumber,
        pageSize,
        ...(typeof categoryId === 'number' && { categoryId }),
        ...(typeof brandId === 'number' && { brandId }),
        ...(minPrice !== undefined && minPrice !== null && !isNaN(minPrice) && { minPrice: String(minPrice) }),
        ...(maxPrice !== undefined && maxPrice !== null && !isNaN(maxPrice) && { maxPrice: String(maxPrice) }),
        ...(typeof inStock === 'boolean' && { inStock }),
        ...(colorIds && colorIds.length !== 0 && { colorIds }), // Аналогично для colorIds
    };

    // Добавляем sizeIdParams в параметры, если он не пустой
    const queryString = Object.entries(filterParams)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

    const url = `api/product/filtered_paged?${queryString}${sizeIdParams ? '&' + sizeIdParams : ''}`;

    const { data } = await $host.get(url);

    return data;
};

export const fetchReviewsOnProductPage = async (productId) => {
    const response = await $authHost.get(`api/Review/all`, {
        params: { productId }
    });
    return response.data;
}