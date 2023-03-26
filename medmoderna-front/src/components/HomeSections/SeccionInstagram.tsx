import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SeccionInstagram.css';
import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";
import { VIDEO_LINK_3, VIDEO_POSTER_1 } from "../../WebParameters";
import LayoutBase from "../LayoutBase/LayoutBase";
import IframeCards from "../IframesCards/IframeCards";

interface SeccionInstagramProps {
    title: string;
    height: string;
    videoSrc: string;
    igPosts: string[];
    cardWidth: string;
    cardHeight: string;
    mobileStack?: boolean;
    hasVideo?: boolean;
}



const SeccionRedesSociales: React.FC<SeccionInstagramProps> = ({ title, height, videoSrc, igPosts, cardWidth,cardHeight, mobileStack, hasVideo }) => {
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

        <SeccionResponsiveVideoBackground responsive={false} hasVideo={false} videoSrc={videoSrc} title={title} height={height} mobileStack={mobileStack} hideContentContainer={true}>


                <AnimatePresence>
                    <IframeCards igPosts={igPosts}/>
                </AnimatePresence>
                <></>
        </SeccionResponsiveVideoBackground>

    );
};

export default SeccionRedesSociales;
