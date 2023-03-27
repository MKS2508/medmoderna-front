import { API_URL } from '../config';
import axios from 'axios';
import { IProductPageProps } from '../models/IProductPageProps';
import { IProductProps } from '../models/IProductProps';
import { toast } from 'react-toastify';

const buildUrl = (base: string, params: Record<string, string | number>) =>
    Object.entries(params).reduce(
        (url, [key, value], index) => `${url}${index === 0 ? '?' : '&'}${key}=${value}`,
        base
    );

const request = async <T>(url: string): Promise<T> => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error on ${url}`);
        }
    } catch (error: any) {
        handleError(error);
        throw error;
    }
};

export const handleError = (error: any) => {
    toast(`Error: ${error.message}`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    console.error(new Error(error));
};

const fetchProducts = async (
    endpoint: string,
    props: IProductPageProps
): Promise<{ products: IProductProps[]; totalItems: number; currentPage: number }> => {
    const apiUrl = buildUrl(`${API_URL}${endpoint}`, {
        page: props.pagination || 0,
        size: props.elementsSize || 40,
    });

    return await request<{ products: IProductProps[]; totalItems: number; currentPage: number }>(
        apiUrl
    );
};

export const getProductsFromCategory = async (
    props: IProductPageProps
): Promise<{ products: IProductProps[]; totalItems: number; currentPage: number }> => {
    return await fetchProducts(`/products/category/${props.name}`, props);
};

export const getProductsFromBrand = async (
    props: IProductPageProps
): Promise<{ products: IProductProps[]; totalItems: number; currentPage: number }> => {
    return await fetchProducts(`/products/brand/${props.name}`, props);
};

// ... (resto de las funciones de la API sin cambios)
export const getProductsFromQuery = async (
    query: string
): Promise<IProductProps[]> => {
    const apiUrl = buildUrl(`${API_URL}/products/search/${query}`, {
        page: 0,
        size: 30,
    });

    const { products } = await request<{ products: IProductProps[] }>(apiUrl);
    return products;
};

export const getAllProducts = async (
    p: { size: number; page: number }
): Promise<IProductProps[]> => {
    const apiUrl = buildUrl(`${API_URL}/products/`, {
        page: p.page,
        size: p.size,
    });
    const { products } = await request<{ products: IProductProps[] }>(apiUrl);
    return products;
};


export const getProductById = async (
    id?: any
): Promise<IProductProps> => {
    const apiUrl = `${API_URL}/products/${id}`;

    const product = await request<IProductProps>(apiUrl);
    return product;
};


// Aquí puedes agregar los métodos postProduct, editProduct y deleteProduct que se mantienen sin cambios



export const postProduct = async (formData: FormData, token?: string): Promise<IProductProps> => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            } as Record<string, string>,
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await axios.post(`${API_URL}/products`, formData, config);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al crear el producto');
        }
    } catch (error: any) {
        handleError(error);
        throw error;
    }
};
export const editProduct = async (
    productId: string,
    updatedProduct: IProductProps,
    token?: string
): Promise<IProductProps> => {
    try {
        const response = await axios.put(`${API_URL}/products/${productId}`, updatedProduct, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error('Error al actualizar el producto');
        }
    } catch (error: any) {
        handleError(error);
        throw error;
    }
};

export const deleteProduct = async (productId: string, token?: string): Promise<void> => {
    try {
        const response = await axios.delete(`${API_URL}/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200) {
            throw new Error('Error al eliminar el producto');
        }
    } catch (error: any) {
        handleError(error);
        throw error;
    }
};
