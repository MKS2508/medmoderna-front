import React, { useEffect, useState } from "react";
import "./SeccionCategorias.css";
import { FaCannabis, FaTshirt, FaCapsules, FaHandHoldingWater, FaLightbulb } from "react-icons/fa";
import CategoryCard from "../CategoryCard/CategoryCard";
import LazyLoad from "react-lazyload";
import axios from "axios";

interface ISeccionCategoriasProps {
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void; // Nueva propiedad
}

const SeccionCategorias: React.FC<ISeccionCategoriasProps> = ({ title, videoSrc, isVideoFetched }) => {
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
        <section className="seccion-categorias">
            <section>
                <div className="categorias-title">
                    <h1>{title}</h1>
                </div>
            </section>
            <div className="bgimg-categories">
                <div className="video-container2">
                    {videoData && (
                        <LazyLoad>
                            <video className="videoAbajo" autoPlay muted loop playsInline>
                                <source type="video/mp4" src={URL.createObjectURL(videoData)} />
                            </video>
                        </LazyLoad>
                    )}
                </div>
            </div>
            <div className="categorias-container">
                <CategoryCard name="PARAFERNALIA" link="/parafernalia" Icon={FaCannabis} />
                <CategoryCard name="ROPA" link="/ropa" Icon={FaTshirt} />
                <CategoryCard name="CBD" link="/cbd" Icon={FaCapsules} />
            </div>
            <div className="categorias-spacer">
                <CategoryCard name="CULTIVO" link="/cultivo" Icon={FaHandHoldingWater} />
                <CategoryCard name="ILUMINACION" link="/iluminacion" Icon={FaLightbulb} />
            </div>
        </section>
    );
};

export default SeccionCategorias;
