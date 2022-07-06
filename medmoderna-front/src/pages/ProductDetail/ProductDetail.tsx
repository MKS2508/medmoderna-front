import './ProductDetail.css';
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromBrand, getProductsFromCategory, getProductById} from "../../services/api-products-service";
import spinner from "../../assets/spinner.svg"
import spinner2 from "../../assets/spinner3.svg"
import {AnimatePresence, motion} from 'framer-motion';
import ProductCard from "../../components/Product/ProductCard";
import {useParams} from "react-router-dom";
import ProductCardDetail from "../../components/Product/ProductCardDetail";


const ProductDetail = (props: IProductPageProps) => {
    let params  = useParams();

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

    return (
        <>


            {
                <>
                    <AnimatePresence>
                        <div className="center" hidden={!showSpinner}>
                            <img src={spinner2} className="filter-green" width="200vh" alt="spinner"/>
                        </div>
                    </AnimatePresence>

                    <div style={{display:"flex", justifyContent: "center"}}>
                        <ProductCardDetail key={product.name} imgSrc={product.imgSrc}
                                     description={product.description} price={product.price}
                                     productId={product.productId} name={product.name} brand={product.brand} category={product.category}/>
                    </div>

                </>
            }

        </>
    );

}

export default ProductDetail;