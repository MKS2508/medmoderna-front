import React, { useEffect, useState } from "react";
import "./SeccionMarcas.css";
import BrandCard from "../Product/BrandCard";
import axios from "axios";
import LazyLoad from "react-lazyload";

interface ISeccionMarcasProps {
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void; // Nueva propiedad
}

const SeccionMarcas: React.FC<ISeccionMarcasProps> = ({ title, videoSrc , isVideoFetched}) => {
    const [videoData, setVideoData] = useState<Blob | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                let response = await axios.get(videoSrc, { responseType: 'blob' });
                setVideoData(response.data);
                isVideoFetched(true); // Llama a la función cuando se obtiene el video
            } catch (error) {
                console.warn("Error al obtener el video sin proxy:", error);

                // Intenta obtener el video utilizando el proxy solo si falla la primera petición
                try {
                    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                    const response = await axios.get(proxyUrl + videoSrc, { responseType: 'blob' });
                    setVideoData(response.data);
                    isVideoFetched(true); // Llama a la función cuando se obtiene el video
                } catch (proxyError) {
                    console.error("Error al obtener el video con proxy:", proxyError);
                }
            }
        };

        fetchVideo();
    }, [videoSrc]);


    return (
        <section id="seccionMarcas">
            <section>
                <div className="marcas-title">
                    <h1>{title}</h1>
                </div>
            </section>
            <div className="bgimg-marcasSection">
                <div className="video-container-background-marcas">
                    {videoData && (
                        <LazyLoad>
                            <video autoPlay muted loop playsInline>
                                <source type="video/mp4" src={URL.createObjectURL(videoData)} />
                            </video>
                        </LazyLoad>
                    )}
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
