import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCardNew.css";
import { IProductProps } from "../../../models/IProductProps";
import logo1 from "../../../assets/logo4blanco.svg"
import logo2 from "../../../assets/logo4svg.svg"
import {FaShoppingCart} from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { motion } from "framer-motion";
import {AiOutlineEye} from "react-icons/ai";

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
};
interface IProductCardProps extends IProductProps {
    maxLines: number;
    maxCharsPerLine: number;
    mobileVersion?: boolean
    index: number;
    blur:string;
}

const ProductCardNew: React.FC<IProductCardProps> = ({ name, productId,  description, price, imgSrc, maxLines, maxCharsPerLine, index, blur, mobileVersion }) => {
    const [spans, setSpans] = useState<JSX.Element[]>([]);
    const [logo, setLogo] = useState<string>(logo1);

    const lines = description.split("\n");
    const shortenedLines = lines.slice(0, maxLines).map((line) => {
        if (line.length > maxCharsPerLine) {
            return `${line.substring(0, maxCharsPerLine)}...`;
        }
        return line;
    });
    const shortenedDescription = shortenedLines.join("\n");
    useEffect(() => {
        const createSpans = (text: string) => {
            const midIndex1 = Math.floor(text.length / 3);
            const midIndex2 = Math.floor(text.length * 2 / 3);
            const firstHalf = text.slice(0, midIndex1);
            const secondHalf = text.slice(midIndex1, midIndex2);
            const thirdHalf = text.slice(midIndex2);

            const lines = [
                <span key="0" className="typewriter-text typewriter-text-0">{firstHalf}</span>,
                <span key="1" className="typewriter-text typewriter-text-1">{secondHalf}</span>,
                <span key="2" className="typewriter-text typewriter-text-2">{thirdHalf}</span>
            ];

            setSpans(lines);
        };

        createSpans(shortenedDescription);
    }, [shortenedDescription]);


    const showNotification = (message:any) => {
        toast(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <>
            <motion.div
                className={!mobileVersion ? "prod-card-new" : "prod-card-mobile"}
                style={{ backdropFilter: `blur(${blur})` }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 * index }}
                onMouseEnter={() => setLogo(logo2)} // Cambia el logo cuando el mouse sale del área
                onMouseLeave={() => setLogo(logo1)} // Cambia el logo cuando el mouse sale del área

            >
                <div className={!mobileVersion ? "prod-card-new-logo" : "prod-card-mobile-logo"}>
                    <div className="rotating-border"></div>
                    <img src={logo} alt="Logo" className={!mobileVersion ? "prod-card-new-logo-img" : "prod-card-mobile-logo-img"} />
                </div>
                <div className="working">
                </div>
                <div className="working2">
                </div>
                <img src={`${imgSrc}`} alt={name} className={!mobileVersion ? "prod-card-new-img" : "prod-card-mobile-img"} />
                <div className={!mobileVersion ? "prod-card-new-info" : "prod-card-mobile-info"}>
                    <h3 className="typewriter-text-0">{name}</h3>
                    <p>{spans}</p>
                    <div className={!mobileVersion ? "prod-details-new" : "prod-details-mobile"}>
                        <div className={!mobileVersion ? "prod-price-new" : "prod-price-mobile"}><span>{price.toFixed(2)}€</span></div>
                        <div className={!mobileVersion ? "prod-card-new-button-container" : "prod-card-mobile-button-container"}>
                            <button className={!mobileVersion ? "prod-card-new-button details-button" : "prod-card-mobile-button details-button-mobile"}>
                                <AiOutlineEye size="30" />
                            </button>
                            <button className={!mobileVersion ? "prod-card-new-button cart-button" : "prod-card-mobile-button cart-button-mobile"}>
                                <FaShoppingCart size="30" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
            <ToastContainer />
        </>
    );
};

export default ProductCardNew;
