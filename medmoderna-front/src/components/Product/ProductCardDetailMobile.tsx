import {IProductProps} from "../../models/IProductProps";
import React, {useEffect, useState} from "react";
import './ProductCardDetailMobile.css'
import {AnimatePresence, motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import {API_URL} from "../../config";
import ReactWhatsapp from "react-whatsapp";
import {RiWhatsappFill} from "react-icons/ri";

const ProductCardDetailMobile = (props: IProductProps) => {
    let params = useParams();
    let id = params.id;
    let editLink = `/edit/${id}`
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
    }, [props]);

    return <>
        {(loading) ?         <AnimatePresence>
                <motion.div className="detailSection"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 2}}
                    exit={{opacity: 1}}>

                    <div className="titleDetail">


                        <h1>{props.name}</h1>

                        <div className="imgBoxDetail">
                            <img
                                src={`data:image/png;base64,${props.imgSrc}`}
                                alt="image"/>
                        </div>
                        <h2 >{props.description}</h2>
                        <span className="waMobile">
                                         {/*@ts-ignore*/}
                            <ReactWhatsapp
                                style={{backgroundColor: "transparent", border: "none"}}
                                number="+34601185250" message={"Hola malaraza"}>
                                        <RiWhatsappFill size={50} className='iconRRSS'/>
                                    </ReactWhatsapp>
                        Pídenoslo por whatsapp 😁
                                </span>
                        <h3 style={{fontSize: "2rem", textAlign: "center"}}>DESDE <span style={{
                            color: "#0dd47c",
                            fontWeight: "bolder",

                        }}>{props.price}</span> EUR</h3>

                    </div>


                </motion.div>
            </AnimatePresence>

            : <div style={{height: "0vh"}}></div>}


    </>
};

export default ProductCardDetailMobile;