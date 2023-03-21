import React from "react";
import "./SeccionMarcas.css";
import BrandCard from "../Product/BrandCard";

interface ISeccionMarcasProps {
    title: string;
    videoSrc: string;
}

const SeccionMarcas: React.FC<ISeccionMarcasProps> = ({ title, videoSrc }) => {
    return (
        <section id="seccionMarcas">
            <section>
                <div className="marcas-title">
                    <h1>{title}</h1>
                </div>
            </section>
            <div className="bgimg-marcasSection">
                <div className="video-container-background-marcas">
                    <video autoPlay muted loop playsInline>
                        <source
                            type="video/mp4"
                            src={videoSrc}
                        />
                    </video>
                </div>
            </div>

            <div className="brandcards-container">
                <div className="brandcard-item">
                    <BrandCard
                        name="CANNA"
                        imgSrc="http://akjacks.com/images/sale/Canna/Canna-logo.png"
                    />
                </div>
                <div className="brandcard-item">
                    <BrandCard
                        name="MEDICINA MODERNA"
                        imgSrc="https://i.ibb.co/x8NJ89x/banner.png"
                    />
                </div>
                <div className="brandcard-item">
                    <BrandCard
                        name="GROW THE JUNGLE"
                        imgSrc="https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png"
                    />
                </div>
            </div>
            <div className="brandcards-container">
                <div className="brandcard-item">
                    <BrandCard
                        name="RAW"
                        imgSrc="https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png"
                    />
                </div>
                <div className="brandcard-item">
                    <BrandCard
                        name="GORILLA GRILLZ"
                        imgSrc="https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png"
                    />
                </div>
                <div className="brandcard-item">
                    <BrandCard
                        name="GROTEK"
                        imgSrc="https://www.led-grower.eu/user/categories/orig/grotek-logo.png"
                    />
                </div>
            </div>
        </section>
    );
};

export default SeccionMarcas;
