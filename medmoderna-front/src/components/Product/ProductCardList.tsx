import {IProductProps} from "../../models/IProductProps";
import React from "react";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import './ProductCardList.css'

const ProductCardList = (props: IProductProps) => {
    const transition = {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
    };

    const variants = {
        initial: { opacity: 0, scale: 0.9 },
        enter: { opacity: 1, scale: 1, transition },
        exit: { opacity: 0, scale: 0.5, transition },
    };

    return (
        <motion.span
            key={props.name}
            className="product-card-list"
            initial="initial"
            animate="enter"
            exit="exit"
            variants={variants}
        >
            <img
                key={props.name}
                width={"50px"}
                src={`${props.imgSrc}`}
                alt={"item"}
            />
            <h4>{props.name}</h4>
        </motion.span>
    );
};


export default ProductCardList;