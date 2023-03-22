import { API_URL } from "../config";
import axios from "axios";
import { IProductPageProps } from "../models/IProductPageProps";
import { IProductProps } from "../models/IProductProps";
import {toast} from "react-toastify";

const buildUrl = (base: string, params: Record<string, string | number>) =>
    Object.entries(params).reduce((url, [key, value], index) => {
        return `${url}${index === 0 ? "?" : "&"}${key}=${value}`;
    }, base);

const request = async <T>(url: string): Promise<T> => {
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Error on ${url}`);
        }
    } catch (error: any) {
        console.error(new Error(error));
        throw error;
    }
};

export const getProductsFromCategory = async (
    props: IProductPageProps
): Promise<IProductProps[]> => {
    const apiUrl = buildUrl(`${API_URL}/products/category/${props.name}`, {
        page: (props.pagination ? props.pagination : 0),
        size: props.elementsSize || 40,
    });

    const { products } = await request<{ products: IProductProps[] }>(apiUrl);
    return products;
};

export const getProductsFromBrand = async (
    props: IProductPageProps,
    brand: string
): Promise<IProductProps[]> => {
    const apiUrl = buildUrl(`${API_URL}/products/brand/${brand}`, {
        page: (props.pagination ? props.pagination : 0),
        size: props.elementsSize || 40,
    });

    const { products } = await request<{ products: IProductProps[] }>(apiUrl);
    return products;
};

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
export const getAllProducts = async (    p: {size:number, page:number},
): Promise<IProductProps[]> => {
    const apiUrl = buildUrl(`${API_URL}/products/`, {
        page: p.page,
        size: p.size,
    });
    const { products } = await request<{ products: IProductProps[] }>(apiUrl);
    return products;
};
export const getImagesFromQuery = async (
    query: string
): Promise<any[]> => {
    const apiUrl = `${API_URL}/products/images/${query}`;

    const { images } = await request<{ images: any[] }>(apiUrl);
    return images;
};

export const getProductById = async (
    id?: any
): Promise<IProductProps> => {
    const apiUrl = `${API_URL}/products/${id}`;

    const product = await request<IProductProps>(apiUrl);
    return product;
};

export const getHomeProducts = async (
    ids: string[]
): Promise<IProductProps[]> => {
    const products = await Promise.all(ids.map(getProductById));
    return products;
};

// ...
// Aquí puedes agregar los métodos postProduct, editProduct y deleteProduct que se mantienen sin cambios
// ...

export const postProduct= async (newProduct: IProductProps): Promise<IProductProps> => {
    const apiUrl = `${API_URL}/products/`;
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => formData.append(key, value));
    console.log(newProduct)
    return new Promise<IProductProps>(async (resolve, reject) => {
        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const product: IProductProps = response.data;
            toast("Producto creado correctamente ✅", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            product ? resolve(product) : reject(new Error(`404 on ${apiUrl}`));
        } catch (e: any) {
            toast("Error al crear producto ❌", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(new Error(e));
            reject(e);
        }
    });
};


export const editProduct = async (id: any, newProduct: IProductProps): Promise<IProductProps> => {
    const apiUrl = `${API_URL}/products/${id}`;
    const formData = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => formData.append(key, value));

    return new Promise<IProductProps>(async (resolve, reject) => {
        try {
            const response = await axios.put(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const product: IProductProps = response.data;
            product ? resolve(product) : reject(new Error(`404 on ${apiUrl}`));
            toast(`Producto con id ${id} editado correctamente ✅`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e: any) {
            toast(`Error al editar el producto con id ${id}  ❌ `, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(new Error(e));
            reject(e);
        }
    });
};



export const deleteProduct = async (id: string): Promise<void> => {
    const apiUrl = `${API_URL}/products/${id}`;

    return new Promise<void>(async (resolve, reject) => {
        try {
            const response = await axios.delete(apiUrl);
            if (response.status === 200) {
                toast(`Producto con id ${id} eliminado correctamente ✅`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resolve();
            } else {
                toast(`Error al eliminar el producto con id ${id} ❌`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                reject(new Error(`Error al eliminar el producto con id ${id} en ${apiUrl}`));
            }
        } catch (e: any) {
            console.log(new Error(e));
            reject(e);
        }
    });
};
