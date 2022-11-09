import {REACT_APP_API_KEY, API_URL} from"../config"
import axios from "axios";
import {IProductPageProps} from "../models/IProductPageProps";
import {IProductProps} from "../models/IProductProps";

export const getProductsFromCategory = async (props: IProductPageProps): Promise<IProductProps[]> => {
    console.log({propsName: props.name})
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    const apiUrl = (!props.elementsSize) ? `${API_URL}/products/category/${props.name}?page=${props.pagination}&size=10` :`${API_URL}/products/category/${props.name}?page=0${props.pagination}&size=${props.elementsSize}`;
    const testingURL2 = `${testingURL}/${props.name}`;
    return new Promise<IProductProps[]>((async (resolve, reject) => {
        try {
            const response = await axios.get(apiUrl);
            const requestOK: boolean = (response.status === 200);
            const products: IProductProps[] = (requestOK) ? response.data.products : null;
            console.warn({products, requestOK, response});
            (products) ? resolve(products) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}
export const getProductsFromBrand = async (props: IProductPageProps, brand: string): Promise<IProductProps[]> => {
    console.log({propsName: props.name})
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    const apiUrl = (!props.elementsSize) ? `${API_URL}/products/brand/${brand}?page=${props.pagination}&size=10` :`${API_URL}/products/brand/${brand}?page=0${props.pagination}&size=${props.elementsSize}`;
    const testingURL2 = `${testingURL}/${props.name}`;
    return new Promise<IProductProps[]>((async (resolve, reject) => {
        try {
            const response = await axios.get(apiUrl);
            const products: IProductProps[] =  response.data.products;
            console.warn({products, response});
            (products) ? resolve(products) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}
export const getProductsFromQuery = async (query: string): Promise<IProductProps[]> => {
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    const apiUrl = `${API_URL}/products/search/${query}?page=${0}&size=30`;
    return new Promise<IProductProps[]>((async (resolve, reject) => {
        try {
            const response = await axios.get(apiUrl);
            const products: IProductProps[] =  response.data.products;
            console.warn({products, response});
            (products) ? resolve(products) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}
export const getProductById = async (id?: any): Promise<IProductProps> => {
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    const apiUrl = `${API_URL}/products/${id}`;
    return new Promise<IProductProps>((async (resolve, reject) => {
        try {
            const response = await axios.get(apiUrl);
            const product: IProductProps =  response.data;
            console.warn({product, response});
            (product) ? resolve(product) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}

export const getHomeProducts = async ( ids: string[] ): Promise<IProductProps[]> => {
// export const getHomeProducts = async ( ids: string[] , num: number): Promise<IProductProps[]> => {
    let promesas : Promise<IProductProps>[] = [];

    let products : IProductProps[] = [];
    
    return new Promise<IProductProps[]>((resolve, reject) =>{
        try{
            ids.map((id)=>{
                promesas.push(getProductById(id));
            })
    
            Promise.all(promesas).then( res => {
                products=res;
            }).catch(e => console.log(e))
            
            resolve(products);
        }
        catch (e:any) {
            console.log(new Error(e));
            reject(e);
        }
    })

}

export const postProduct = async (newProduct: IProductProps): Promise<IProductProps> => {
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    const apiUrl = `${API_URL}/products/`;
    return new Promise<IProductProps>((async (resolve, reject) => {
        try {
            const response = await axios.post(apiUrl, newProduct);
            const product: IProductProps =  response.data;
            console.warn({product, response});
            (product) ? resolve(product) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}
export const editProduct = async (id: any, newProduct: IProductProps): Promise<IProductProps> => {
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    const apiUrl = `${API_URL}/products/${id}`;
    return new Promise<IProductProps>((async (resolve, reject) => {
        try {
            const response = await axios.put(apiUrl, newProduct);
            const product: IProductProps =  response.data;
            console.warn({product, response});
            (product) ? resolve(product) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}
