import React, { useEffect, useState } from "react";
import "./SeccionCategorias.css";
import { FaCannabis, FaTshirt, FaCapsules, FaHandHoldingWater, FaLightbulb } from "react-icons/fa";
import CategoryCard from "../CategoryCard/CategoryCard";
import { ICategoryProps } from "../../models/ICategoryProps";

import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";

// En SeccionCategorias.tsx
interface ISeccionCategoriasProps {
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void;
    height: string;
    categories: ICategoryProps[];
}

const SeccionCategorias: React.FC<ISeccionCategoriasProps> = ({ title, videoSrc, isVideoFetched , height, categories}) => {


    return (
        <SeccionResponsiveVideoBackground
            title={title}
            videoSrc={videoSrc}
            height={(window.innerWidth >= 768) ? height : "40vh"}
            hasVideo={true} hideContentContainer={false} useAutoHeightContent={false}
            isVideoFetched={(fetched) =>{isVideoFetched(fetched) ;console.log('Video fetched:', fetched)}}
        >
            {categories.map((category) => (
                <CategoryCard
                    key={category.name}
                    name={category.name}
                    link={category.link}
                    Icon={category.icon}
                />
            ))}
        </SeccionResponsiveVideoBackground>

    );
};

export default SeccionCategorias;
