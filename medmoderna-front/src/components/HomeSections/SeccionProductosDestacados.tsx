import React, { useEffect, useState } from "react";
import "./SeccionProductosDestacados.css";
import ProductSwitcher from "../Product/ProductSwitcher/ProductSwitcher";
import LazyLoad from "react-lazyload";
import axios from "axios";

interface IProductSwitcherProps {
    homeProds: any[]; // Reemplaza 'any' con el tipo adecuado para tus productos
    title: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void; // Nueva propiedad
}

const SeccionProductosDestacados: React.FC<IProductSwitcherProps> = ({ homeProds, videoSrc, title , isVideoFetched}) => {
    const [displayedProducts, setDisplayedProducts] = useState(homeProds);
    const [videoData, setVideoData] = useState<Blob | null>(null);

    const updateDisplayedProducts = () => {
        if (window.innerWidth <= 768) {
            setDisplayedProducts(homeProds.slice(0, 2));
        } else {
            setDisplayedProducts(homeProds);
        }
    };

    useEffect(() => {
        updateDisplayedProducts();
        window.addEventListener("resize", updateDisplayedProducts);

        return () => {
            window.removeEventListener("resize", updateDisplayedProducts);
        };
    }, [homeProds]);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                let response = await axios.get(videoSrc, { responseType: 'blob' });
                setVideoData(response.data);
                isVideoFetched(true); // Llama a la función cuando se obtiene el video

            } catch (error) {
                console.warn("Error al obtener el video sin proxy:", error);

                try {
                    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                    const response = await axios.get(proxyUrl + videoSrc, { responseType: 'blob' });
                    setVideoData(response.data);
                    isVideoFetched(true); // Llama a la función cuando se obtiene el video

                } catch (error) {
                    console.error("Error al obtener el video con proxy:", error);
                }
            }
        };

        fetchVideo();
    }, [videoSrc]);

    return (
        <section id={"seccionProductosDestacados"}>
            <section>
                <div className="productos-destacados-title">
                    <h1>{title}</h1>
                </div>
            </section>

            <section>
                <div className="bgimg-productsSection">
                    <div className="video-container-background-products">
                        {videoData && (
                            <LazyLoad>
                                <video autoPlay muted loop playsInline>
                                    <source type="video/mp4" src={URL.createObjectURL(videoData)} />
                                </video>
                            </LazyLoad>
                        )}
                    </div>
                </div>

                <div className="productos-destacados-spacer"></div>
                <div className="switcher-container"></div>
                <ProductSwitcher homeProds={displayedProducts}></ProductSwitcher>
            </section>
        </section>
    );
};

export default SeccionProductosDestacados;
