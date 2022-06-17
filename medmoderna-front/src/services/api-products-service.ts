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
