import React from 'react';
import './SeccionFacebook.css';
import {FacebookEmbed} from 'react-social-media-embed';
import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";
import BrandCard from "../Product/BrandCard";
import {FACEBOOK_LINK_1, FACEBOOK_LINK_2} from "../../WebParameters";

interface SeccionFacebookProps {

    cardWidth: number;
    title: string;
    height: string
    videoSrc: string;
    facebookUrls:string[];
}

const SeccionFacebook: React.FC<SeccionFacebookProps> = ({ facebookUrls, cardWidth , title, videoSrc, height}) => {
    return (
        <>

            <SeccionResponsiveVideoBackground videoSrc={videoSrc} title={title} height={height} mobileStack={true}
                                              isVideoFetched={(fetched) =>{console.log('Video fetched:', fetched)}}>

                {facebookUrls.map((facebookUrl) => (
                    <FacebookEmbed url={facebookUrl} width={cardWidth} />

                ))}


            </SeccionResponsiveVideoBackground>
            </>

    );
};

export default SeccionFacebook;
