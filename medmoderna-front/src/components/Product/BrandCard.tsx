import {IProductProps} from "../../models/IProductProps";
import "./BrandCard.css";
import React from "react";

const BrandCard = (props: {name: string, imgSrc: string}) => {

    return <>

        <div className="brandCard" key="card" style={{ backgroundSize: "cover"}}>
            <img src={props.imgSrc} alt={"img"} width="100%" height="95%"/>
        </div>

    </>
};

export default BrandCard;