import './ProductDashboard.css';
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";
import {editProduct, getImagesFromQuery, getProductById, postProduct} from "../../services/api-products-service";
import {ProductCardPreview} from "../../components/Product/ProductCard";
import {useParams} from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import ProductCardMobile from "../../components/Product/ProductCardMobile";


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
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [images, setImages] = useState<any[]>([]);
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

    const getRelatedImages = async (title: string): Promise<any[]> => {

        return await getImagesFromQuery(title);

    };


    const initializePage = async (pageParam: number) => {
        //a este metodo se llama cada vez que renderizamos el componente por primera vez o al cambiar la pagina
        // llama al get products, con el id de categoria cogido de las props y el  num de pagina del estado
        // getProducts(props, pageParam)
        //si page es 0 (inicial) y props.pagination es null,
        let product = await getProduct();
        setProduct(product);
        //setProductName(product.name)


    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
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
        await editProduct(params.id, defProduct);
        alert('A product was edited: ' + productName);
        console.log({defProduct});
    }
    return (
        <AnimatedPage>
            <div className="background">
                {
                    <>
                        <div style={{paddingTop: "8vw"}}></div>

                        <div className="cardForm">

                            <form onSubmit={(editMode) ? handleSubmitEdit : handleSubmitPost}>
                                <div style={{display: "flex", justifyContent: "center"}}>

                                    <h2>Nuevo Producto</h2>
                                </div>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <ProductCardPreview name={(editMode) ? product.name : productName}
                                                        price={productPrice} description={productName}
                                                        imgSrc={productImage}
                                                        brand={(editMode) ? product.brand : productBrand}/>

                                </div>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <ProductCardMobile name={(editMode) ? product.name : productName}
                                                       price={productPrice} description={productName}
                                                       imgSrc={(productImage.length > 1) ? productImage : `https://static.wixstatic.com/media/ca863c_8922c3cdc76f4d51bcaaeac397b9e09e~mv2.png/v1/fit/w_500,h_500,q_90/file.png`}
                                                       brand={(editMode) ? product.brand : productBrand}/>
                                </div>

                                <div className={"mobileButtons"}></div>
                                <div className={"bigButtons"}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="row">
                                                <div className="col">
                                                    <div className={"buttons"}>

                                                        <button onClick={async () => {
                                                            let imagesRelated = await getRelatedImages(productName);
                                                            console.warn({imagesRelated})
                                                            await setImages(imagesRelated);
                                                            await setProductImage(imagesRelated[0].url)
                                                            await setImageIndex(0);
                                                            console.warn({img: imagesRelated[0].url})
                                                        }} className="button-24">Search Images 🔎
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={"buttons"}>
                                                <button disabled={(imageIndex == 0)} onClick={async () => {
                                                    let actualIndex = imageIndex;
                                                    await setProductImage(images[actualIndex - 1].url)
                                                    await setImageIndex(actualIndex - 1)
                                                }} className="button-24"> Prev Image
                                                </button>
                                                <button onClick={async () => {
                                                    let actualIndex = imageIndex;
                                                    await setProductImage(`http://localhost:4567/?url=${images[actualIndex].url}`)
                                                }} className="button-25"> Remove Background 🧙🏻‍♂️️
                                                </button>
                                                <button disabled={(imageIndex == images.length)} onClick={async () => {
                                                    let actualIndex = imageIndex;
                                                    await setProductImage(images[actualIndex + 1].url)
                                                    await setImageIndex(actualIndex + 1)
                                                }} className="button-24"> Next Image
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">

                                    <div className="col">
                                        <div className="form-group">
                                            <input placeholder="Nombre" type="text" value={productName}
                                                   onChange={(event) => handleChangeName(event)}/>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="form-group">
                                            <input placeholder="Imagen" type="url" value={productImage}
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
                                            <input type="number" value={(editMode) ? product.price : productPrice}
                                                   placeholder="Precio"
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
                        <div style={{paddingTop: "8vw"}}></div>

                    </>


                }

            </div>

        </AnimatedPage>
    );

}

export default ProductDashboard;