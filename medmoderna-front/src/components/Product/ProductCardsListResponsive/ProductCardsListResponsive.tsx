import React from 'react';
import './ProductCardsListResponsive.css';
import {IProductProps} from "../../../models/IProductProps";
import logo from '../../../assets/logo4.png';
import Modal from 'react-modal';
import ProductCardDetail from "../ProductCardDetail";
import ProductCardNew from "../../Product/ProductCardNew/ProductCardNew";
import ProductCardDetailResponsive from '../ProductCardDetailResponsive/ProductCardDetailResponsive';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


type ProductCardsListResponsiveProps = {
    products: IProductProps[];
}


const ProductCardsListResponsive: React.FC<ProductCardsListResponsiveProps> = ({ products }) => {




    // @ts-ignore
    return (<>

        <div className="shopping-list">
            {products.map(item => (<>

                <ProductCardNew
                    key={item.name}
                    imgSrc={item.imgSrc}
                    description={item.description}
                    price={item.price}
                    productId={item.productId}
                    name={item.name}
                    brand={item.brand}
                    category={item.category}
                    maxLines={1} maxCharsPerLine={90}                />

            </>))}
        </div>
    </>);
};

export default ProductCardsListResponsive;
