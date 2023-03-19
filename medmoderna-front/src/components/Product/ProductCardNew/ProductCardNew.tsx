import React from "react";
import { Link } from "react-router-dom";
import "./ProductCardNew.css";
import { IProductProps } from "../../../models/IProductProps";
import logo from "../../../assets/logo4.png"
import {AiFillEye, FaShoppingCart} from "react-icons/all";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

interface IProductCardProps extends IProductProps {
    maxLines: number;
    maxCharsPerLine: number;
}

const ProductCardNew: React.FC<IProductCardProps> = ({ name, productId,  description, price, imgSrc, maxLines, maxCharsPerLine }) => {
    const lines = description.split("\n");
    const shortenedLines = lines.slice(0, maxLines).map((line) => {
        if (line.length > maxCharsPerLine) {
            return `${line.substring(0, maxCharsPerLine)}...`;
        }
        return line;
    });
    const shortenedDescription = shortenedLines.join("\n");
    const showNotification = (message:any) => {
        toast(message, {
            position: "top-right",
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
            <ToastContainer />
            <div className="prod-card-new">
                <div className="prod-card-new-logo">
                    <img src={logo} alt="Logo" className="prod-card-new-logo-img" />
                </div>
                <img src={`data:image/png;base64,${imgSrc}`} alt={name} className="prod-card-new-img" />
                <div className="prod-card-new-info">
                    <h3>{name}</h3>
                    <p>{shortenedDescription}</p>
                    <div className="prod-details-new">
                        <div className="prod-price-new" style={{position: "absolute", bottom: "10px", left: "10px"}}>{price.toFixed(2)}€</div>
                        <button className="prod-btn-new" style={{position: "absolute", bottom: "10px", right: "10px"}}>
                            <Link to={`/product/${productId}`} >
                                <AiFillEye size={"20"}/>
                            </Link>
                        </button>
                        <button className="prod-btn-new"  style={{position: "absolute", bottom: "10px", right: "80px"}} onClick={() => showNotification("Añadido al carrito!")}>
                            <FaShoppingCart size={"20"}/>
                        </button>

                    </div>
                </div>
            </div>

        </>

    );
};

export default ProductCardNew;
