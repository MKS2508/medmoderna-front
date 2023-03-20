import React from "react";
import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import "./CategoryCard.css";

interface ICategoryProps {
    name: string;
    link: string;
    Icon: IconType;
}

const CategoryCard = (props: ICategoryProps) => {
    const { Icon } = props;

    return (
        <div className="categoryCard">
            <Link to={props.link} className="categoryCard-link">
                <Icon className="categoryCard-icon" />
                <span className="categoryCard-text">{props.name}</span>
            </Link>
        </div>
    );
};

export default CategoryCard;
