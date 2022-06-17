import {IProductProps} from "../../models/IProductProps";
import React from "react";

const ProductCard = (props: IProductProps) => {

    return <>

        <div className="card" key="card">

            <div className="imgBox">
                <img
                    src={`data:image/png;base64,${props.imgSrc}`}
                    alt="mouse corsair"/>
            </div>

            <div className="contentBox">
                <h3>{props.name}</h3>
                <h2 className="price">{props.price}.00€</h2>
                <a href="#" className="buy">Ver Detalles</a>
            </div>

        </div>

    </>
};

export default ProductCard;