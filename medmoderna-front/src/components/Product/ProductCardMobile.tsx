import {IProductProps} from "../../models/IProductProps";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import "./ProductCardMobile.css";

const ProductCardMobile = (props: IProductProps) => {
    const [showButton, setShowButton] = useState<boolean>(false);
    let imageSource;
    console.log({propsPrev: props})
    if (props.imgSrc.startsWith("http")) {
        imageSource = props.imgSrc;
    } else {
        imageSource = `data:image/png;base64,${props.imgSrc}`;
        }
    return (<>

        <div onMouseLeave={() => {
            setShowButton(false)

        }} onMouseOver={(event) => {
            setShowButton(true)
        }} onMouseEnter={() => {
            setShowButton(true)
        }}
             className="cardMobile" key="cardMobile">

            <div className="imgBox" onMouseLeave={() => {
                setShowButton(false)

            }} onMouseOver={(event) => {
                setShowButton(true)
            }} onMouseEnter={() => {
                setShowButton(true)
            }}>
                <img onMouseLeave={() => {
                    setShowButton(false)

                }} onMouseOver={(event) => {
                    setShowButton(true)
                }} onMouseEnter={() => {
                    setShowButton(true)
                }}
                    src={imageSource}
                    alt="mouse corsair"/>
            </div>

            <div onMouseLeave={() => {
                setShowButton(false)

            }} onMouseOver={(event) => {
                setShowButton(true)
            }} onMouseEnter={() => {
                setShowButton(true)
            }} className="contentBox">
                <h3>{props.name}</h3>


                     <Link className="button-85" to={`/product/${props.productId}`}> <span>Ver</span> </Link>



            </div>

        </div>

    </>)
};

export default ProductCardMobile;