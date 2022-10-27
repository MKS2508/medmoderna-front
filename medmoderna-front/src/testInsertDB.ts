const axios = require('axios');
const IProductProps = require('./models/IProductProps');
const data = require('./output.json');


console.log({jsonData: JSON.stringify(data)})


 const postProduct = async (newProduct: typeof IProductProps): Promise<typeof IProductProps> => {
    //si se le pasa tanmanio usa una url o otra
    const testingURL = "http://localhost:8080/api"
    return new Promise<typeof IProductProps>((async (resolve, reject) => {
        try {
            const response = await axios.post(testingURL, newProduct);
            const product: typeof IProductProps =  response.data;
            console.warn({product, response});
            (product) ? resolve(product) : reject(new Error(`404 on ${testingURL}`))
        } catch (e:any) {
            console.log(new Error(e));
            reject(e)
        }

    }));
}
