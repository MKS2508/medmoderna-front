import React, { useEffect, useState } from "react";
import "./SeccionResponsiveVideoBackground.css";
import axios from "axios";
import {VIDEO_LINK_3, VIDEO_POSTER_1} from "../../WebParameters";
import LazyLoad from "react-lazyload";
import LayoutBase from "../LayoutBase/LayoutBase";

interface ISeccionResponsiveVideoBackgroundProps {
    title: any;
    videoSrc?: string;
    height: string;
    isVideoFetched?: (fetched: boolean) => void;
    children: React.ReactNode[];
    mobileStack?: boolean;
    posterSrc?:string;
    hasVideo?: boolean;
    responsive? : boolean;
    hideContentContainer?: boolean;
    useAutoHeightContent?: boolean; // Nueva propiedad
}


const VideoComponent = (props: ISeccionResponsiveVideoBackgroundProps) => {
    const { videoSrc, posterSrc, height, hasVideo } = props;

    if (hasVideo == false) {
        return null;
    }

    return (
        <div className="video-container2" >
            <video autoPlay muted loop playsInline
                poster={posterSrc}
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};


const SeccionResponsiveVideoBackground: React.FC<ISeccionResponsiveVideoBackgroundProps> = ({ title, responsive, videoSrc, height, isVideoFetched, children, mobileStack, hasVideo, hideContentContainer, useAutoHeightContent }) => {
    const [videoData, setVideoData] = useState<Blob | null>(null);
    const [responsiveHeight, setResponsiveHeight] = useState(height);

    const fetchVideo = async () => {
        try {
            if (typeof videoSrc === "string") {
                let response = await axios.get(videoSrc, {responseType: 'blob'});
                setVideoData(response.data);
                if (isVideoFetched) {
                    isVideoFetched(true);
                } // Llama a la función cuando se obtiene el video
            }

        } catch (error) {
            console.warn("Error al obtener el video sin proxy:", error);

            // Intenta obtener el video utilizando el proxy solo si falla la primera petición
            try {
                const proxyUrl = '';
                const response = await axios.get(proxyUrl + videoSrc, { responseType: 'blob' });
                setVideoData(response.data);
                if (isVideoFetched) {
                    isVideoFetched(true);
                } // Llama a la función cuando se obtiene el video
            } catch (proxyError) {
                console.error("Error al obtener el video con proxy:", proxyError);
            }
        }
    };

    useEffect(() => {
        fetchVideo();
    }, [videoSrc]);


    const renderChildren = () => {
        const half = Math.ceil(children.length / 2);
        return [children.slice(0, half), children.slice(half)];
    }

    const updateDimensions = () => {
        console.log({responsive: window.innerWidth})

             if (window.innerWidth <= 768) {
            console.log({responsive: "Dispositivo : Iphone XR"})
            setResponsiveHeight('50vh');
        } else {
            //setResponsiveHeight('50vh');
            // setResponsiveHeight(height);
        }
    };
    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);


    const [firstHalf, secondHalf] = renderChildren();
    const singleContainer = children.length <= 2;

    return (
        <section
            className="seccion-responsive-video-background"
            style={{
                height: mobileStack && responsive ? responsiveHeight : height,
            }}
        >
            <LayoutBase useBaseAutoHeightHeader={true}>
                <section>
                    <div className="categorias-title">
                        <h1>{title}</h1>
                    </div>
                </section>
            </LayoutBase>
            {!hideContentContainer && ( // Usar la nueva propiedad para mostrar u ocultar el contenedor{!hideContentContainer && (
                <LayoutBase useBaseFullHeight={!useAutoHeightContent} useBaseAutoHeightHeader={useAutoHeightContent}>
                    <div className="content-container">
                        <div className={`bgimg-categories${mobileStack ? " mobile-stack" : ""}`}>
                            {singleContainer ? (
                                <div
                                    className={`categorias-container${
                                        mobileStack ? " categorias-container-mobile" : ""
                                    }`}
                                >
                                    {children.map((child) => child)}
                                </div>
                            ) : (
                                <>
                                    <div
                                        className={`categorias-container${
                                            mobileStack ? " categorias-container-mobile" : ""
                                        }`}
                                    >
                                        {firstHalf.map((child) => child)}
                                    </div>
                                    <div
                                        className={`categorias-container${
                                            mobileStack ? " categorias-container-mobile" : ""
                                        }`}
                                    >
                                        {secondHalf.map((child) => child)}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </LayoutBase>
            )}
            {/* ... (El resto del código es igual) */}
            <div className="video-container2">
                {hasVideo ? (
                    <LazyLoad>
                        <VideoComponent
                            title={title}
                            hasVideo={hasVideo}
                            children={children}
                            posterSrc={VIDEO_POSTER_1}
                            videoSrc={videoSrc}
                            height={height}
                        />
                    </LazyLoad>
                ) : (
                    <>
                        {children}
                    </>
                )}
            </div>

            <LayoutBase isBottom={true}>
                <section>
                    <div className="categorias-bottom"></div>
                </section>
            </LayoutBase>
        </section>
    );
};

export default SeccionResponsiveVideoBackground;
