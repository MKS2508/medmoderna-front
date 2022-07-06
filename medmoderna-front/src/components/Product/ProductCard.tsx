import {IProductProps} from "../../models/IProductProps";
import React from "react";
import {Link} from "react-router-dom";

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
                <Link className="buy" to={`/product/${props.productId}`}> Ver Detalles </Link>
            </div>

        </div>

    </>
};

export default ProductCard;