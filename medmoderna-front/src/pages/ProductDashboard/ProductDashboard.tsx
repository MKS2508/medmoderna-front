import './ProductDashboard.css';
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";
import {postProduct, getProductById} from "../../services/api-products-service";
import spinner from "../../assets/spinner.svg"
import spinner2 from "../../assets/spinner3.svg"
import {AnimatePresence, motion} from 'framer-motion';
import ProductCard from "../../components/Product/ProductCard";
import {useParams} from "react-router-dom";
import ProductCardDetail from "../../components/Product/ProductCardDetail";


const ProductDashboard = (props: IProductPageProps) => {
    let params = useParams();

    console.log({params: useParams(), id: params.id})
    const variants = {
        hidden: {
            opacity: 0
        },
        visible: ({delay = 1}) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 2,
                staggerChildren: 4,
            }
        })
    }


    const [product, setProduct] = useState<IProductProps>({
        brand: "",
        category: "",
        description: "",
        imgSrc: "",
        name: "",
        price: 0,
        productId: ""
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [page, setActivePage] = useState<number>(0);
    const [productName, setProductName] = useState<string>("");
    const [productImage, setProductImage] = useState<string>("");
    const [productDesc, setProductDesc] = useState<string>("");
    const [productBrand, setProductBrand] = useState<string>("");
    const [productId, setProductId] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);


    const getProduct = async () => {

        //62ab79bd884a403ab04e7625
        let product = await getProductById(params.id);

        return product;

    };
    const initializePage = async (pageParam: number) => {
        //a este metodo se llama cada vez que renderizamos el componente por primera vez o al cambiar la pagina
        // llama al get products, con el id de categoria cogido de las props y el  num de pagina del estado
        // getProducts(props, pageParam)
        //si page es 0 (inicial) y props.pagination es null,
        console.log({props})
        setProduct(await getProduct());
    }

    useEffect(() => {
        setLoading(true);
        initializePage(page).then(() => setLoading(false))
    }, [page, props]);
    const showSpinner = (loading);
    const handleChangeName = (event: any) => {
        setProductName(event.target.value);
    }
    const handleChangeImage = (event: any) => {
        setProductImage(event.target.value);
    }
    const handleChangeDesc = (event: any) => {
        setProductDesc(event.target.value);
    }
    const handleChangePrice = (event: any) => {
        setProductPrice(event.target.value);
    }
    const handleChangeProductId = (event: any) => {
        setProductId(event.target.value);
    }
    const handleChangeBrand = (event: any) => {
        setProductBrand(event.target.value);
    }
    const handleChangeCategory = (event: any) => {
        setProductCategory(event.target.value);
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        alert('A product was submitted: ' + productName);
        const defProduct: IProductProps = {
            productId: productId,
            brand: productBrand,
            category: productCategory,
            description: productDesc,
            imgSrc: productImage,
            name: productName,
            price: productPrice,
        }
        await postProduct(defProduct)
        console.log({defProduct});
    }
    return (
        <>
            {
                <>
                    <ProductCard name={productName} description={productName} imgSrc={productImage}
                                 brand={productBrand}/>
                    <div style={{display: "flex", justifyContent: "center", position: "relative", top: "50vh"}}>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Name:
                                <input type="text" value={productName} onChange={(event) => handleChangeName(event)}/>
                            </label>
                            <label>
                                Description:
                                <textarea value={productDesc} onChange={(event) => handleChangeDesc(event)}/>
                            </label>
                            <label>
                                Image:
                                <input type="url" value={productImage} onChange={(event) => handleChangeImage(event)}/>
                            </label>
                            <label>
                                Brand:
                                <input type="text" value={productBrand} onChange={(event) => handleChangeBrand(event)}/>
                            </label>
                            <label>
                                Category:
                                <input type="text" value={productCategory}
                                       onChange={(event) => handleChangeCategory(event)}/>
                            </label>
                            <label>
                                PRODUCT ID:
                                <input type="text" value={productCategory}
                                       onChange={(event) => handleChangeProductId(event)}/>
                            </label>
                            <label>
                                Price:
                                <input type="number" value={productPrice}
                                       onChange={(event) => handleChangePrice(event)}/>
                            </label>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </>
            }

        </>
    );

}

export default ProductDashboard;