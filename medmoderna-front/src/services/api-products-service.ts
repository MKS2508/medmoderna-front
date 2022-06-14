import {REACT_APP_API_KEY, API_URL} from"../config"
import axios from "axios";
import {IProductPageProps} from "../models/IProductPageProps";
import {IProductProps} from "../models/IProductProps";

export const getProductsFromCategoryID = async (props: IProductPageProps): Promise<IProductProps[]> => {
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:3000"
    const apiUrl = (!props.elementsSize) ? `${API_URL}/products/${props.name}/${props.pagination}` :`${API_URL}/products/${props.id}/${props.pagination}?size=${props.elementsSize}`;
    const testingURL2 = `${testingURL}/${props.name}`;
    return new Promise<IProductProps[]>((async (resolve, reject) => {
        try {
            const response = await axios.get(testingURL2);
            const requestOK: boolean = (response.status === 200);
           // const products: IProductProps[] = (requestOK) ? response.data.products : null;
            const products: IProductProps[] = (requestOK) ? response.data.products : null;
            console.log({products, requestOK, response});
            (products) ? resolve(products) : reject(new Error(`404 on ${apiUrl}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
  //  return axios.get(apiUrl).then(res=>res.data)
}
