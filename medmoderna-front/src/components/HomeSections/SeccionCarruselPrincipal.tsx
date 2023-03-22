import React, {RefObject, useEffect, useRef, useState} from 'react';
import {Carousel} from 'react-responsive-carousel';
import {AnimatePresence, motion} from 'framer-motion';

import poster from "../../assets/poster.png";
import LoadingPage from "../LoadingPage/LoadingPage";
import {
    IMAGEN_CARRUSEL_1,
    IMAGEN_CARRUSEL_2,
    IMAGEN_CARRUSEL_3,
    LOGO_CARRUSEL,
    VIDEO_LINK_4
} from "../../WebParameters";


const SeccionCarruselPrincipal = () => {
    const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
        const [status, setStatus] = useState(false);
        console.log("1")

        useEffect(() => {
            console.log("2")
            const updateStatus = (images: HTMLImageElement[]) => {
                setStatus(
                    images.map((image) => image.complete).every((item) => item === true)
                );
            };

            if (!ref?.current) return;

            const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));
            console.log("LLEGA")
            console.log({imagesLoaded})
            if (imagesLoaded.length === 0) {
                setStatus(true);
                return;
            }

            imagesLoaded.forEach((image) => {
                image.addEventListener("load", () => updateStatus(imagesLoaded), {
                    once: true
                });
                image.addEventListener("error", () => updateStatus(imagesLoaded), {
                    once: true
                });
            });
            console.log("LLEGA2")

            return;
        }, [ref]);

        return status;
    };
    const wrapperRef = useRef<HTMLDivElement>(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);
    return (<>

            <div hidden={true}>
                <LoadingPage logoSrc={"a"}/>
            </div>

        <section id={"seccionCarruselPrincipal"}>
                <div className="logoHome" style={{position:"absolute", zIndex:1, top: "80%", left: "50%", transform: "translate(-50%, -50%)"}}>
                    <AnimatePresence>

                    <motion.img
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0.3}}
                        transition={{duration: 4}}
                        src={LOGO_CARRUSEL}
                        alt={"logo"}
                        width={"350px"}
                    />
                    </AnimatePresence>

                </div>

            <div className="ParallaxVideo"  ref={wrapperRef}>
                <Carousel
                    animationHandler={"slide"}
                    infiniteLoop={true}
                    autoPlay={true}
                    className={"carruseltop"}
                    interval={5000}
                    width={"100vw"}
                    showThumbs={false}
                    showIndicators={false}
                    showArrows={false}
                    stopOnHover={false}
                >
                    <div className={"bgimg-1"}>
                        <img src={IMAGEN_CARRUSEL_1} alt={"fondo1"}/>
                    </div>
                    <div className={"bgimg-1"}>
                        <img src={IMAGEN_CARRUSEL_2} alt={"fondo2"}/>
                    </div>
                    <div className={"bgimg-1"}>
                        <img src={IMAGEN_CARRUSEL_3} alt={"fondo3"}/>
                    </div>
                    <div className="video-container">
                        <video autoPlay muted loop playsInline  width={"100%"} height={"100%"}>
                            <source
                                type="video/mp4"
                                src={VIDEO_LINK_4}
                            />
                        </video>
                    </div>

                </Carousel>


            </div>
        </section>
        </>
    );
};

export default SeccionCarruselPrincipal;
