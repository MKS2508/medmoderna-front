import React from "react";
import { motion } from "framer-motion";
import "./ProductCardDetailResponsive.css";
import {Link} from "react-router-dom";
import logo from "../../../assets/logo4.png"
import { PayPalButton } from "react-paypal-button-v2";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {RiInstagramFill, RiShoppingCart2Fill} from "react-icons/ri";
import {FaCcMastercard, FaCcVisa} from "react-icons/fa";

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
            <div className="background-images">
                <div className="background-image1">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image2">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image3">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image4">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image5">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image6">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image7">
                    <img src={logo} width={150}/>
                </div>
                <div className="background-image8">
                    <img src={logo} width={150}/>
                </div>
            </div>

            <motion.div
                className="product-card-detail-responsive"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >

                    <nav className="navbar">
                        <ul className="navbar-menu">
                            <li><Link className="nav-link" to={`/${category}`}><span className="boldi">Volver a la categoría de productos de {category}</span></Link></li>
                            <li><Link className="nav-link" to={`/${brand}`}><span className="boldi">Mas productos de la marca {brand}</span></Link> </li>
                        </ul>
                    </nav>




                <div className="container">

                    <div className="imgBx">

                        <img
                            src={`${imgSrc}`}
                            alt={name}
                            className="product-image"
                        />
                    </div>
                    <div className="details">

                        <div className="content">
                            <h2>
                                {name}
                                <br />
                                <span><Link   to={"/" + brand} > <span style={{ textDecoration: "none", color: "71B957FF", fontWeight: 900}} >{brand}</span></Link></span>
                            </h2>
                            <p >{(description.length > 748) ? "texto demasiado largo arreglar jeje" : description}</p>
                            <p className="product-price">{price.toFixed(2)}€</p>
                            <p className="product-id">Product ID: {productId}</p>
                            <p className="product-category">Categoría: <Link  to={"/" + category} > <span  >{category}</span></Link></p>
                            <p className="product-colors">
                                Tamaños disponibles:
                                <span className="red"></span>
                                <span className="orange"></span>
                            </p>
                            <button className="glass-button">
                                <span>Añadir al carrito <RiShoppingCart2Fill/></span>
                            </button>
                        </div>

                    </div>
                    <div className="acceptedPaymentsMobile">
                        <div className="acceptedPaymentsHeader">Métodos de pago aceptados</div>

                        <div className="acceptedPaymentsItem">
                            <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                                 alt="Botón de PayPal"/>
                        </div>
                        <div className="acceptedPaymentsItem">
                            <img src="https://www.bisbatdeterrassa.org/parroquies/santissima-trinitat/logo-bizum.png/@@images/image.png"
                                 alt="Botón de Bizum" width={120}/>
                        </div>
                        <div className="acceptedPaymentsItem">
                                <span><FaCcVisa size={"80"}/>   {" "}
                                    <FaCcMastercard size={"80"}/></span>
                        </div>

                    </div>

                </div>
                <div className="acceptedPaymentsBig">
                    <div className="acceptedPaymentsHeader">Métodos de pago aceptados</div>

                    <div className="acceptedPaymentsItem">
                        <img src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/PP_logo_h_100x26.png"
                             alt="Botón de PayPal"/>
                    </div>
                    <div className="acceptedPaymentsItem">
                        <img src="https://www.bisbatdeterrassa.org/parroquies/santissima-trinitat/logo-bizum.png/@@images/image.png"
                             alt="Botón de Bizum" width={120}/>
                    </div>
                    

                    <div className="acceptedPaymentsItem">
                                <span><FaCcVisa size={"80"}/>   {" "}
                                    <FaCcMastercard size={"80"}/></span>
                    </div>

                </div>


            </motion.div>
        </>

    );
};

export default ProductCardDetailResponsive;
