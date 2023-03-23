import React, { useEffect, useState } from "react";
import "./SeccionResponsiveVideoBackground.css";
import axios from "axios";
import {VIDEO_LINK_3, VIDEO_POSTER_1} from "../../WebParameters";
import LazyLoad from "react-lazyload";

interface ISeccionResponsiveVideoBackgroundProps {
    title: any;
    videoSrc?: string;
    height: string;
    isVideoFetched?: (fetched: boolean) => void;
    children: React.ReactNode[];
    mobileStack?: boolean; // Agrega esta línea
    posterSrc?:string;
}

const VideoComponent = (props: any) => {
    const { videoSrc, posterSrc } = props;

    if (!videoSrc || videoSrc.length < 1) {
        return null;
    }

    return (
        <div className="video-container">
            <video
                width="100%"
                height="auto"
                poster={posterSrc}
                controls
            >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};


const SeccionResponsiveVideoBackground: React.FC<ISeccionResponsiveVideoBackgroundProps> = ({ title, videoSrc, height, isVideoFetched, children, mobileStack }) => {
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
        if (window.innerWidth <= 386) {
            console.log({responsive: "Dispositivo : S8 Ultra"})
            setResponsiveHeight('160vh');
        } else if (window.innerWidth <= 389) {
            console.log({responsive: "Dispositivo : Iphone SE"})
            setResponsiveHeight('160vh');
        } else if (window.innerWidth <= 400) {
            console.log({responsive: "Dispositivo : Iphone 12 Pro"})
            setResponsiveHeight('130vh');
        } else if (window.innerWidth <= 415) {
            console.log({responsive: "Dispositivo : Iphone XR"})
            setResponsiveHeight('130vh');
        } else {
            setResponsiveHeight(height);
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
        <section className="seccion-responsive-video-background" style={{ height: (mobileStack) ? responsiveHeight : height}}>
            <section>
                <div className="categorias-title">
                    <h1>{title}</h1>
                </div>
            </section>
            <div className="content-container">
                <div className="bgimg-categories">
                    {singleContainer ? (
                        <div className={`categorias-container${mobileStack ? " categorias-container-mobile" : ""}`}>
                            {children.map((child) => child)}
                        </div>
                    ) : (
                        <>
                            <div className={`categorias-container${mobileStack ? " categorias-container-mobile" : ""}`}>
                                {firstHalf.map((child) => child)}
                            </div>
                            <div className={`categorias-container${mobileStack ? " categorias-container-mobile" : ""}`}>
                                {secondHalf.map((child) => child)}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="video-container2">

                {videoData && (
                    <LazyLoad>
                        <VideoComponent className="videoAbajo" posterSrc={VIDEO_POSTER_1}  videoSrc={VIDEO_LINK_3}/>
                    </LazyLoad>
                )}
            </div>

            <section>
                <div className="categorias-bottom">
                </div>
            </section>
        </section>
    );
};

export default SeccionResponsiveVideoBackground;
