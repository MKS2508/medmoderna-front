import React, { useEffect, useState } from "react";
import "./SeccionMarcas.css";
import BrandCard from "../Product/BrandCard";
import { IBrandProps } from "../../models/IBrandProps";
import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";

interface ISeccionMarcasProps {
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void;
    height: string;
    mobileStack:boolean;
    brands: IBrandProps[];
}

const SeccionMarcas: React.FC<ISeccionMarcasProps> = ({ title, videoSrc, isVideoFetched, height, brands, mobileStack }) => {
    const [useAutoHeightContent, setUseAutoHeightContent] = useState(false);

    const updateAutoHeightContent = () => {
        if (window.innerWidth <= 768) {
            setUseAutoHeightContent(true);
        } else {
            setUseAutoHeightContent(false);
        }
    };

    useEffect(() => {
        updateAutoHeightContent();
        window.addEventListener('resize', updateAutoHeightContent);

        return () => {
            window.removeEventListener('resize', updateAutoHeightContent);
        };
    }, []);

    return (
        <SeccionResponsiveVideoBackground
            responsive={false}
            videoSrc={videoSrc}
            title={title}
            height={(window.innerWidth >= 768) ? height : "95vh"}
            mobileStack={mobileStack}
            hasVideo={true}
            hideContentContainer={false}
            useAutoHeightContent={useAutoHeightContent}
            isVideoFetched={(fetched) => {
                isVideoFetched(fetched);
                console.log('Video fetched:', fetched);
            }}
        >
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
