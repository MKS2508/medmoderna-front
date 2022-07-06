import {IProductProps} from "../../models/IProductProps";
import React from "react";
import './ProductCardDetail.css'
import {AnimatePresence, motion} from "framer-motion";
import {Link} from "react-router-dom";

const ProductCardDetail = (props: IProductProps) => {

    return <>
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <div className="bar">
                    <h3 style={{fontSize: "2rem", textAlign: "start"}}>
                        <Link to={`/${props.category}`} > <span
                            style={{color: "#0dd47c", fontWeight: "bolder",}}>{props.category}</span></Link> {">"}
                        <Link to={`/MARCAS/${props.brand}`} > <span
                            style={{color: "#0dd47c", fontWeight: "bolder",}}>{props.brand}</span> </Link></h3>
                </div>
                <div className="titleDetail">



                    <h1>{props.name}</h1>

                    <div className="imgBoxDetail">
                        <img
                            src={`data:image/png;base64,${props.imgSrc}`}
                            alt="mouse corsair"/>
                    </div>
                    <h2 style={{maxWidth: "50vw"}}>{props.description}</h2>
                    <h3 style={{fontSize: "2rem", textAlign: "center"}}>DESDE <span style={{
                        color: "#0dd47c",
                        fontWeight: "bolder",

                    }}>{props.price}</span> EUR</h3>


                </div>


            </motion.div>
        </AnimatePresence>


    </>
};

export default ProductCardDetail;