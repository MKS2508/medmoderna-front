import React from "react";
import { motion } from "framer-motion";
import "./ProductCardDetailResponsive.css";
import {Link} from "react-router-dom";

interface Props {
    key: string;
    imgSrc: string;
    description: string;
    price: number;
    productId: string;
    name: string;
    brand: string;
    category: string;
}

const ProductCardDetailResponsive: React.FC<Props> = ({
                                                          imgSrc,
                                                          description,
                                                          price,
                                                          productId,
                                                          name,
                                                          brand,
                                                          category,
                                                      }) => {
    return (
        <>
            <div className={"backButton"}>
                <Link to={`/${category}`}><i className="gg-arrow-left-o"></i></Link>
            </div>
            <motion.div
                className="product-card-detail-responsive"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                <div className="container">

                    <div className="imgBx">
                        <img
                            src={`data:image/png;base64,${imgSrc}`}
                            alt={name}
                            className="product-image"
                        />
                    </div>
                    <div className="details">
                        <div className="content">
                            <h2>
                                {name}
                                <br />
                                <span>{brand}</span>
                            </h2>
                            <p>{description}</p>
                            <p className="product-price">{price.toFixed(2)}€</p>
                            <p className="product-id">Product ID: {productId}</p>
                            <p className="product-category">Categoría: <Link to={"/" + category} >{category}</Link></p>
                            <p className="product-colors">
                                Tamaños disponibles:
                                <span className="red"></span>
                                <span className="orange"></span>
                            </p>
                            <button>Pídelo por Whatsapp</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>

    );
};

export default ProductCardDetailResponsive;
