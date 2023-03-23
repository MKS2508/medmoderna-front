import React, { useEffect, useState } from "react";
import "./SeccionMarcas.css";
import BrandCard from "../Product/BrandCard";
import { IBrandProps } from "../../models/IBrandProps";
import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";

// En SeccionMarcas.tsx
interface ISeccionMarcasProps {
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void;
    height: string;
    mobileStack:boolean;
    brands: IBrandProps[];
}


const SeccionMarcas: React.FC<ISeccionMarcasProps> = ({ title, videoSrc , isVideoFetched, height, brands, mobileStack}) => {

    return (
        <SeccionResponsiveVideoBackground responsive={false} videoSrc={videoSrc} title={title} height={height} mobileStack={mobileStack}
                                          isVideoFetched={(fetched) =>{isVideoFetched(fetched) ;console.log('Video fetched:', fetched)}}>

            {brands.map((brand) => (
                <BrandCard
                    key={brand.name}
                    name={brand.name}
                    imgSrc={brand.imgSrc}
                />
            ))}


        </SeccionResponsiveVideoBackground>
    );
};

export default SeccionMarcas;
