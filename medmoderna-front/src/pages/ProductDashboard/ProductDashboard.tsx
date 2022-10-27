import './ProductDashboard.css';
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";
import {postProduct, getProductById, editProduct} from "../../services/api-products-service";
import spinner from "../../assets/spinner.svg"
import spinner2 from "../../assets/spinner3.svg"
import {AnimatePresence, motion} from 'framer-motion';
import ProductCard, {ProductCardPreview} from "../../components/Product/ProductCard";
import {useParams} from "react-router-dom";
import ProductCardDetail from "../../components/Product/ProductCardDetail";


const ProductDashboard = (props: IProductPageProps) => {
    let params = useParams();
    let editMode = (params.id !== undefined);

    console.log({params: useParams(), id: params.id, editMode})
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
    const [productName, setProductName] = useState<string>("Nombre");
    const [productImage, setProductImage] = useState<string>("");
    const [productDesc, setProductDesc] = useState<string>("");
    const [productBrand, setProductBrand] = useState<string>("");
    const [productId, setProductId] = useState<string>("");
    const [productCategory, setProductCategory] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(10);


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
        console.log({prod: await  getProduct()})
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

    const handleSubmitPost = async (event: any) => {
        event.preventDefault();
        const defProduct: IProductProps = {
            productId: productId,
            brand: productBrand,
            category: productCategory,
            description: productDesc,
            imgSrc: productImage,
            name: productName,
            price: productPrice,
        }
        await postProduct(defProduct);
        alert('A product was submitted: ' + productName);

        console.log({defProduct});
    }
    const handleSubmitEdit = async (event: any) => {
        event.preventDefault();
        const defProduct: IProductProps = {
            productId: productId,
            brand: productBrand,
            category: productCategory,
            description: productDesc,
            imgSrc: productImage,
            name: productName,
            price: productPrice,
        }
        await editProduct(params.id,defProduct);
        alert('A product was edited: ' + productName);
        console.log({defProduct});
    }
    return (
        <div className="background">
            {
                <>
                    <div style={{paddingTop:"8vw"}}></div>

                    <div className="cardForm">

                        <form onSubmit={(editMode) ? handleSubmitEdit : handleSubmitPost}>
                            <div style={{display:"flex", justifyContent:"center"}}>

                            <h2>Nuevo Producto</h2>
                            </div>
                            <div style={{display:"flex", justifyContent:"center"}}>
                                <ProductCardPreview name={productName} price={productPrice} description={productName} imgSrc={(editMode) ? product.imgSrc : productImage}
                                             brand={(editMode) ? product.brand : productBrand}/>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <input placeholder="Nombre" type="text" value={ productName}
                                               onChange={(event) => handleChangeName(event)}/>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <input placeholder="Imagen" type="url" value={ productImage}
                                               onChange={(event) => handleChangeImage(event)}/>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <input type="text" value={productBrand} placeholder="Marca"
                                               onChange={(event) => handleChangeBrand(event)}/>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <input type="text" value={productCategory} placeholder="Categoria"
                                               onChange={(event) => handleChangeCategory(event)}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <input type="text" value={productId} placeholder="ID Producto"
                                               onChange={(event) => handleChangeProductId(event)}/>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <input type="number" value={(editMode) ? product.price :productPrice} placeholder="Precio"
                                               onChange={(event) => handleChangePrice(event)}/>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="form-group">
                                        <textarea value={productDesc} placeholder="Description" rows={3}
                                                  onChange={(event) => handleChangeDesc(event)}/>
                                    </div>
                                </div>

                                <div className="col">
                                    <input type="submit" value={(editMode) ? "EDITAR" : "CREAR"}/>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div style={{paddingTop:"8vw"}}></div>

                </>


            }

        </div>
    );

}

export default ProductDashboard;