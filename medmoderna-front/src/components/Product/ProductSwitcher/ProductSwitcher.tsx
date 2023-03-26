import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "./ProductSwitcher.css";
import {IProductProps} from "../../../models/IProductProps";
import ProductCardsListResponsive from "../ProductCardsListResponsive/ProductCardsListResponsive";

interface IProductSwitcherProps {
    homeProds: any[]; // Reemplaza 'any' con el tipo adecuado para tus productos
}
export const HomeProducts = (data: { products: IProductProps[] }) => {
    return (<ProductCardsListResponsive  products={data.products}/>)
}
const categories = ["CBD", "ROPA", "PARAFERNALIA", "CULTIVO", "ILUMINACIÓN"];

const ProductSwitcher: React.FC<IProductSwitcherProps> = ({ homeProds }) => {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        setIndex((prevIndex) => (prevIndex + 1) % categories.length);
    };

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
    };

    return (
        <div className="productSwitcher">
            <button className="switcherButton" onClick={handlePrev}>
                <FaChevronLeft />
            </button>
            <button className="switcherButton" onClick={handleNext}>
                <FaChevronRight />
            </button>
            <motion.h1
                className="switcherTitle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                key={index}
            >
                {categories[index]}
            </motion.h1>

            <HomeProducts products={homeProds} />
        </div>
    );
};

export default ProductSwitcher;
