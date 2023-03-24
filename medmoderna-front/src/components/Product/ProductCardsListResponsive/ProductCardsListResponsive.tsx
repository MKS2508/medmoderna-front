import React from 'react';
import './ProductCardsListResponsive.css';
import {IProductProps} from "../../../models/IProductProps";
import logo from '../../../assets/logo4.png';
import Modal from 'react-modal';
import ProductCardNew from "../../Product/ProductCardNew/ProductCardNew";
import ProductCardDetailResponsive from '../ProductCardDetailResponsive/ProductCardDetailResponsive';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";


type ProductCardsListResponsiveProps = {
    products: IProductProps[];
    isHome: boolean;
}


const ProductCardsListResponsive: React.FC<ProductCardsListResponsiveProps> = ({ products, isHome }) => {




    // @ts-ignore
    return (<>
        {     <div className="shopping-list">
                {products.map((item, index) => (<>
                    <ProductCardNew
                        blur={"3px"}
                        key={item.name + "_" + Math.floor(Math.random() * 100401).toString()}
                        imgSrc={item.imgSrc}
                        description={item.description}
                        price={item.price}
                        productId={item.productId}
                        name={item.name}
                        brand={item.brand}
                        category={item.category}
                        maxLines={2} maxCharsPerLine={70} index={index}                    /> <
                        ProductCardNew
                        blur={"3px"}
                        key={item.name + "_" + Math.floor(Math.random() * 100401).toString()}
                        imgSrc={item.imgSrc}
                        description={item.description}
                        price={item.price}
                        productId={item.productId}
                        name={item.name}
                        brand={item.brand}
                        category={item.category}
                        maxLines={2} maxCharsPerLine={70} index={index}      mobileVersion={true}              />

                </>))}
            </div>
        }
    </>);
};

export default ProductCardsListResponsive;
