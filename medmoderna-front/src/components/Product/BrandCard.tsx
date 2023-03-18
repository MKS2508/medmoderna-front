import {IProductProps} from "../../models/IProductProps";
import "./BrandCard.css";
import React from "react";
import {IBrandProps} from "../../models/IBrandProps";
import {Link} from "react-router-dom";

const BrandCard = (props: IBrandProps) => {

    return <>
            <div className="brandCard" key="card" style={{ backgroundSize: "cover"}}>
                <Link to={props.name}>
                    <img src={props.imgSrc} alt={"img"} width="100%" height="95%"/>
                </Link>
            </div   >


    </>
};

export default BrandCard;