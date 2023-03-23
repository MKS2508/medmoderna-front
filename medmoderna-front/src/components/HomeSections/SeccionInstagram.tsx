import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SeccionInstagram.css';
import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";
import { VIDEO_LINK_3, VIDEO_POSTER_1 } from "../../WebParameters";

interface SeccionInstagramProps {
    title: string;
    height: string;
    videoSrc: string;
    igPosts: string[];
    cardWidth: string;
    cardHeight: string;
    mobileStack?: boolean;
}



const SeccionRedesSociales: React.FC<SeccionInstagramProps> = ({ title, height, videoSrc, igPosts, cardWidth,cardHeight, mobileStack }) => {
    const [responsiveCardWidth, setResponsiveCardWidth] = useState(cardWidth);
    const [responsiveCardHeight, setResponsiveCardHeight] = useState(cardHeight);
    useEffect(() => {
        if (mobileStack)  updateDimensions();

        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    const updateDimensions = () => {
        console.log({ responsive: window.innerWidth });

        if (window.innerWidth <= 386) {
            console.log({ responsive: "Dispositivo : S8 Ultra" });
            setResponsiveCardWidth('280px');
            setResponsiveCardHeight('300px');
        } else if (window.innerWidth <= 389) {
            console.log({ responsive: "Dispositivo : iPhone SE" });
            setResponsiveCardWidth('280px');
            setResponsiveCardHeight('300px');
        } else if (window.innerWidth <= 400) {
            console.log({ responsive: "Dispositivo : iPhone 12 Pro" });
            setResponsiveCardWidth('280px');
            setResponsiveCardHeight('500px');
        } else if (window.innerWidth <= 415) {
            console.log({ responsive: "Dispositivo : iPhone XR" });
            setResponsiveCardWidth('280px');
            setResponsiveCardHeight('500px');
        } else {
            setResponsiveCardWidth(cardWidth);
            setResponsiveCardHeight(cardHeight);
        }
    };


    return (
        <SeccionResponsiveVideoBackground videoSrc={videoSrc} title={title} height={height} mobileStack={mobileStack}>
            {igPosts.map((igPost, index) => (
                <AnimatePresence key={index}>

                    <motion.iframe
                        className="iframeIg"
                        initial={{
                            opacity: 0,
                            scale: 0.7,
                            borderRadius: '20%',
                            height: 400,
                            marginLeft: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            borderRadius: '10px',
                            marginLeft: 30,
                            marginRight: 30,

                            height: 400,
                        }}
                        exit={{ opacity: 0.3 }}
                        transition={{ duration: 1.5 }}
                        key={igPost}
                        width={responsiveCardWidth}
                        height={responsiveCardHeight}
                        src={igPost}
                        frameBorder="0"
                        style={{ maxWidth: '100%', marginTop: "2rem" }} // Agregar esta línea para ajustar el ancho
                    />
                </AnimatePresence>
            ))}
        </SeccionResponsiveVideoBackground>
    );
};

export default SeccionRedesSociales;
