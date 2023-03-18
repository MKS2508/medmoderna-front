import React from 'react';
import './ProductCardsListResponsive.css';
import {IProductProps} from "../../../models/IProductProps";
import logo from '../../../assets/logo4.png';
import Modal from 'react-modal';
import ProductCardDetail from "../ProductCardDetail";
import ProductCardDetailResponsive from '../ProductCardDetailResponsive/ProductCardDetailResponsive';
import { Link } from 'react-router-dom';


type ProductCardsListResponsiveProps = {
    products: IProductProps[];
}


const ProductCardsListResponsive: React.FC<ProductCardsListResponsiveProps> = ({ products }) => {




    return (
        <div className="shopping-list">
            {products.map(item => (


                <div key={item.productId} className="shopping-item">
                    <img src={logo} className={"imageContainer"} alt={ "logo"}/>

                    <img src={`data:image/png;base64,${item.imgSrc}`} alt={item.name} className="item-image" />
                    <div className="item-details">
                        <div className="item-name">{item.name}</div>
                        <div className="item-price-and-button">
                            {/*@ts-ignore*/}
                            <div className="item-price" ><p className="card-price">{item.price.toFixed(2)}€</p></div>
                            <Link className="item-button" to={`/product/${item.productId}`}><i className="gg-info"></i></Link>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
};

export default ProductCardsListResponsive;
