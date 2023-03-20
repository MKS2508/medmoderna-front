import { IProductProps } from "../../models/IProductProps";
import "./BrandCard.css";
import React from "react";
import { IBrandProps } from "../../models/IBrandProps";
import { Link } from "react-router-dom";

const BrandCard = (props: IBrandProps) => {
    return (
        <div className="brandCard" key="card">
            <Link to={props.name} className="brandCard-link">
                <img src={props.imgSrc} alt={"img"} className="brandCard-img" />
            </Link>
        </div>
    );
};

export default BrandCard;
