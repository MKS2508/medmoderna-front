import './Products.css'
import React, {useEffect, useRef, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromBrand, getProductsFromCategory} from "../../services/api-products-service";
import spinner from "../../assets/spinner.svg"
import spinner2 from "../../assets/spinner3.svg"
import {AnimatePresence, motion} from 'framer-motion';
import ProductCard, {ProductCardLoading} from "../../components/Product/ProductCard";
import {useParams} from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import ProductCardsListResponsive from "../../components/Product/ProductCardsListResponsive/ProductCardsListResponsive";
import LayoutBase from "../../components/LayoutBase/LayoutBase";


const Products = (props: IProductPageProps) => {
    const [totalPages, setTotalPages] = useState<number>(1);
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setActivePage] = useState<number>(0);
    const params = useParams();
    const brand = params.brand;

    const compare = (a: any, b: any) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };

    const getProducts = async (props: IProductPageProps, page: number) => {
        let products = await getProductsFromCategory(props);
        if (brand !== undefined) {
            props.name = brand;
            products = await getProductsFromBrand(props);
        } else if (brand === undefined) {
            products = await getProductsFromCategory(props);
        }
        return products;
    };


    const prevProps = useRef<IProductPageProps>(props);
    const prevPage = useRef<number>(page);

    useEffect(() => {
        const fetchData = async () => {
            if ( true) {
                setLoading(true);
                const productsAndPaginationProps = await getProducts(props, page);
                const productsFetch = productsAndPaginationProps.products.sort(compare);

                setTotalPages(Math.ceil(productsAndPaginationProps.totalItems / props.elementsSize));
                setActivePage(productsAndPaginationProps.currentPage);
                setProducts(productsFetch);
                setLoading(false);

                prevProps.current = props;
                prevPage.current = page;
            }
        };
        console.log("data fetched")
        fetchData();
    }, [page, props]);


    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setActivePage(newPage);
        }
    };

    return (
        <LayoutBase layoutWithMenuBars={true}>
            <AnimatedPage className={'s22'}>
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 1 }}
                    >
                        <div className="titleProducts">
                            <h1>CATALOGO DE {props.name}</h1>
                            <h2>{props.description}</h2>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <div id={'content'}>
                    <div className={'prods'}>
                        <ProductCardsListResponsive products={products} />
                    </div>

                    <div className="paginationProducts">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className={page === 0 ? 'disabled' : ''}
                        >
                            &laquo; Anterior
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index)}
                                className={index === page ? 'active' : ''}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages - 1}
                            className={page === totalPages - 1 ? 'disabled' : ''}
                        >
                            Siguiente &raquo;
                        </button>
                    </div>
                </div>
            </AnimatedPage>
        </LayoutBase>
    );
};

export default Products;

