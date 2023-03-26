import './Products.css'
import React, {useEffect, useState} from "react";
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
    // Función para manejar el cambio de página
    const handlePageChange = (newPage: number) => {
        if (newPage >= 0 && newPage < totalPages) {
            setActivePage(newPage);
            let updatePageProps = {...props2}
            updatePageProps.pagination = newPage;

            getProducts(updatePageProps, newPage)
        }
    }
    let params = useParams();
    let brand = params.brand;


    const ProductCardsLoading = () => {
        let products = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return (
            <div key="wrapperLoad" className="wrapper-grid">
                {
                    products.map((item, index) =>
                        <ProductCardLoading key={`${item}load${index}`}/>
                    )
                }

            </div>
        )

    };

    const [products, setProducts] = useState<IProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setActivePage] = useState<number>(0);

    const [props2, setProps2] = useState<IProductPageProps>({
        description: props.description,
        elementsSize: props.elementsSize,
        id:props.id,
        name: props.name,
        pagination: props.pagination,
        productId: ""
    });

    const getProducts = async (props: IProductPageProps, page: number) => {
        let totalProds = 0;
        if (props.pagination !== page) {
            props2.pagination = page
            props.pagination = page
        }


        let products = await getProductsFromCategory(props2);
        if (brand !== undefined) {
            props2.name = brand;
            products = await getProductsFromBrand(props2);
        } else if (brand == undefined) {
            products = await getProductsFromCategory(props)
            console.log(products)
        }
        setProps2(props2)
        setLoading(false)
        setProducts(products.products)
        return products;

    };

    const initializePage = async (pageParam: number) => {
        //a este metodo se llama cada vez que renderizamos el componente por primera vez o al cambiar la pagina
        // llama al get products, con el id de categoria cogido de las props y el  num de pagina del estado
        // getProducts(props, pageParam)
        //si page es 0 (inicial) y props.pagination es null,
        console.log({props})
        function compare( a:any, b:any ) {
            if ( a.name < b.name ){
                return -1;
            }
            if ( a.name > b.name ){
                return 1;
            }
            return 0;
        }
        let productsAndPaginationProps = await getProducts(props, pageParam);
        let productsfecth = productsAndPaginationProps.products.sort(compare);
        setTotalPages(Math.ceil( productsAndPaginationProps.totalItems / props.elementsSize));
        setActivePage(productsAndPaginationProps.currentPage)
        let productsSorted = [...products]
        productsSorted = productsSorted.sort(compare);

            if(products.length < 1){
                setProducts(productsfecth);
            } else {
            }


    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        setLoading(true);
        initializePage(page).then(() => setLoading(false))
    }, [page, props]);
    const showSpinner = (loading || products.length < 1);

    return (
        <LayoutBase>

        <AnimatedPage  className={"s22"}>
            <AnimatePresence>
            <motion.div
            initial={{opacity: 1}}
            animate={{opacity: 1}}
            exit={{opacity: 1}}
            >
            <div className="titleProducts">

                <h1>CATALOGO DE {props.name}</h1>
                <h2>{props.description}</h2>
            </div>
        </motion.div>
        </AnimatePresence>
            <div id={"content"}>

                 <div   className={"prods"}>
                 <div hidden={true}>
                 <ProductCardsLoading/>
                 </div>

                     <ProductCardsListResponsive    products={products}/>


                 </div>


                 <div className="pagination">
                 <h1>Pagina {(page == 0 ? 1 : page)}</h1>
                 <button
                 onClick={() => handlePageChange(page - 1)}
                 disabled={page === 0}
                 className={page === 0 ? "disabled" : ""}
                 >
                 &laquo; Anterior
                 </button>
                 {Array.from({length: totalPages}, (_, index) => (
                <button
                key={index}
                onClick={() => handlePageChange(index)}
                className={index === page ? "active" : ""}
                >
            {index + 1}
                </button>
                ))}
                 <button
                 onClick={() => handlePageChange(page + 1)}
                 disabled={page === totalPages - 1}
                 className={page === totalPages - 1 ? "disabled" : ""}
                 >
                 Siguiente &raquo;
                 </button>
                 </div>
            </div>
        </AnimatedPage>
</LayoutBase>
);

}

export default Products;