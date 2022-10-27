import {IProductProps} from "../../models/IProductProps";
import React, {useEffect, useState} from "react";
import './ProductCardDetail.css'
import {AnimatePresence, motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {API_URL} from "../../config";

const ProductCardDetail = (props: IProductProps) => {
    let params = useParams();
    let id = params.id;
    let editLink = `/edit/${id}`
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
    }, [props]);

    return <>
        {(!loading) ?         <AnimatePresence>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 0}}
                    exit={{opacity: 0}}
                >
                    <div className="bar" style={{position: "fixed", top: 0, left: 0}}>
                        <h3 style={{fontSize: "2rem", textAlign: "start"}}>
                            <Link to={`/${props.category}`}> <span
                                style={{color: "#0dd47c", fontWeight: "bolder",}}>{props.category}</span></Link> {">"}
                            <Link to={`/MARCAS/${props.brand}`}> <span
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

                        <button>
                            <Link to={editLink}> Edit </Link>
                        </button>
                    </div>


                </motion.div>
            </AnimatePresence>
            : <div style={{height: "0vh"}}></div>}


    </>
};

export default ProductCardDetail;