import {IProductProps} from "../../models/IProductProps";
import React from "react";
import {Link} from "react-router-dom";

const ProductCardList = (props: IProductProps) => {

    return <span style={{display: "inline-block"}}>


        <img width={"50px"} style={{display: "inline-block", float: "left", marginRight: "20px"}}
             src={`data:image/png;base64,${props.imgSrc}`}
             alt={"item"}
        />
        <h4 style={{color:"white"}}>{props.name}</h4>

    </span>
};
export const ProductCardPreview = (props: IProductProps) => {
    let imageSource;
    console.log({propsPrev: props})
    if (props.imgSrc.startsWith("http")) {
        imageSource = props.imgSrc;
    } else {
        imageSource = `data:image/png;base64,${props.imgSrc}`
    }
    return <>

        <div className="card" key="card">

            {(props.imgSrc.length < 1) ? <div className="imgBox">
                <img
                    src={`https://static.wixstatic.com/media/ca863c_8922c3cdc76f4d51bcaaeac397b9e09e~mv2.png/v1/fit/w_500,h_500,q_90/file.png`}
                    alt="No imagen"/>
            </div> : <div className="imgBox">
                <img
                    src={`${imageSource}`}
                    alt="No imagen"/>
            </div>}


            <div className="contentBox">
                <h3>{props.name}</h3>
                <h2 className="price">{props.price}€</h2>
                <div className="buy"> Ver Detalles</div>
                <div className="buy">Editar</div>
            </div>

        </div>

    </>
};

export default ProductCardList;