import {IProductProps} from "../../models/IProductProps";
import React from "react";

const ProductCardHome = (props: IProductProps) => {

    return <>

        <div className="card" key="card">

            <div className="imgBox">
                <img
                    src={`${props.imgSrc}`}
                    alt="mouse corsair"/>
            </div>

            <div className="contentBox">
                <h3>{props.name}</h3>
                <h2 className="price">{props.price}€</h2>
                <a href="#" className="buy">Ver Detalles</a>
            </div>

        </div>

    </>
};

export default ProductCardHome;