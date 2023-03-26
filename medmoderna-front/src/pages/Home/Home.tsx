import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, {lazy, RefObject, Suspense, useEffect, useRef, useState} from 'react';
import {homeProds} from "../../assets/HomeProds/HomeProductsLists";

import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

import Footer from "../../components/Footer/Footer";
import {
    BRANDS,
    CATEGORIES,
    FACEBOOK_LINK_1,
    FACEBOOK_LINK_2,
    INSTAGRAM_LINK_1,
    INSTAGRAM_LINK_2,
    INSTAGRAM_LINK_3,
    INSTAGRAM_LINK_4,
    SECCION_HOME_TEXTO_CATEGORIAS,
    SECCION_HOME_TEXTO_FACEBOOK,
    SECCION_HOME_TEXTO_INSTAGRAM,
    SECCION_HOME_TEXTO_MARCAS,
    SECCION_HOME_TEXTO_PRODUCTOS_DESTACADOS,
    TEXTO_DESCRIPTIVO,
    VIDEO_LINK_1,
    VIDEO_LINK_2,
    VIDEO_LINK_3
} from "../../WebParameters";
import LayoutBase from "../../components/LayoutBase/LayoutBase";
// Importa los componentes usando React.lazy
const SeccionProductosDestacados = lazy(() => import('../../components/HomeSections/SeccionProductosDestacados'));
const SeccionMarcas = lazy(() => import('../../components/HomeSections/SeccionMarcas'));
const SeccionCategorias = lazy(() => import('../../components/HomeSections/SeccionCategorias'));
const SeccionRedesSociales = lazy(() => import('../../components/HomeSections/SeccionInstagram'));
const SeccionMapa = lazy(() => import('../../components/HomeSections/SeccionMapa'));
const SeccionTextoDescriptivo = lazy(() => import('../../components/HomeSections/SeccionTextoDescriptivo'));
const SeccionCarruselPrincipal = lazy(() => import('../../components/HomeSections/SeccionCarruselPrincipal'));


const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const updateStatus = (images: HTMLImageElement[]) => {
            setStatus(
                images.map((image) => image.complete).every((item) => item)
            );
        };

        if (!ref?.current) return;

        const imagesLoaded = Array.from(ref.current.querySelectorAll("img"));
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

        return;
    }, [ref]);

    return status;
};
const useOnLoadVideos = (ref: RefObject<HTMLElement>) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const updateStatus = (videos: HTMLVideoElement[]) => {
            videos.map((vid)=>{
                console.log({title: vid.outerHTML,
                    stado: vid.readyState})

            })
            setStatus(
                videos.map((video) => video.readyState >= 3).every((item) => item)
            );
        };

        if (!ref?.current) return;

        const videosLoaded = Array.from(ref.current.querySelectorAll("video"));
        console.log(videosLoaded)
        if (videosLoaded.length === 0) {
            setStatus(true);
            return;
        }

        const handleLoadedMetadata = () => {
            updateStatus(videosLoaded);
        };

        videosLoaded.forEach((video) => {
            video.addEventListener("loadedmetadata", handleLoadedMetadata);
        });

        return () => {
            videosLoaded.forEach((video) => {
                video.removeEventListener("loadedmetadata", handleLoadedMetadata);
            });
        };
    }, [ref]);

    return status;
};

const Home = () => {

    const postsUrls = [INSTAGRAM_LINK_1, INSTAGRAM_LINK_2, INSTAGRAM_LINK_3, INSTAGRAM_LINK_4];
    const [igPost, setIgPost] = useState<string>(INSTAGRAM_LINK_1);
    const [textoDescriptivo, setTextoDescriptivo] = useState<string>(INSTAGRAM_LINK_1);
    const [fbPost, setFbPost] = useState<string>(FACEBOOK_LINK_1);
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    const [loadSeccionMarcas, setLoadSeccionMarcas] = React.useState(false);

    const handleSeccionMarcasVisible = () => {
        setLoadSeccionMarcas(true);
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);
    const videoContainerRef = useRef(null);
    const videoContainerRef2 = useRef(null);
    const videosLoaded = useOnLoadVideos(videoContainerRef);
    const videosLoaded2 = useOnLoadVideos(videoContainerRef2);


    useEffect(() => {
        if (videosLoaded) {
            // Realiza alguna acción cuando todos los videos estén cargados
            console.log("Todos los videos han sido cargados!!!!!! ❤️‍🔥");
        }
    }, [videosLoaded, videosLoaded2]);

    const listenToScroll = () => {
        let heightToHideFrom = 30;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            isVisible &&      // to limit setting state only the first time
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        if (window.location.pathname != "/") {
            setIsVisible(false)
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        const timer2 = setTimeout(() => {
            setIsLoading2(false);
        }, 3000);

        window.scrollTo(0, 0)

        if (videoUrl.length < 1) {
            let directUrl: any = undefined;
            //ytdl.getInfo("https://www.youtube.com/watch?v=R92eQiYabQQ").then((data) => {directUrl= data});
            console.log({directUrl})

        }

        const interval = setInterval(() => {
            console.log('This will run every 10 second!');

            let randomPost = setRandomPost(postsUrls);
            if (igPost !== randomPost) {
                //setIgPost(randomPost)
            } else {
                //setIgPost(setRandomPost(postsUrls))
            }
            if (window.location.pathname != "/") {
                setIsVisible(false)
            }

            window.addEventListener("scroll", listenToScroll);
            return () =>
                window.removeEventListener("scroll", listenToScroll);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const setRandomPost = (postsUrls: string[]) => {
        let randomPost = postsUrls[Math.floor(Math.random() * postsUrls.length)];
        //setIgPost(randomPost);
        return randomPost;
    };

    const [videoMarcasFetched, setVideoMarcasFetched] = useState(false);
    const [videoProductosFetched, setVideoProductosFetched] = useState(false);
    const [videoCategoriasFetched, setVideoCategoriasFetched] = useState(false);

    const handleVideoMarcasFetched = (fetched: boolean) => {
        setVideoMarcasFetched(fetched);
    };
    const handleVideoProductosFetched = (fetched: boolean) => {
        setVideoProductosFetched(fetched);
    };
    const handleVideoCategoriasFetched = (fetched: boolean) => {
        setVideoCategoriasFetched(fetched);
    };

    return (


        <>

            <div hidden={imagesLoaded/** && videoCategoriasFetched && videoProductosFetched && videoMarcasFetched **/ }>
                <LoadingPage logoSrc={"a"}/>
            </div>


            <AnimatedPage>
                <div hidden={false} ref={wrapperRef}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SeccionCarruselPrincipal />
                    </Suspense>
                    <div /*ref={videoContainerRef2} className={(window.innerWidth < 630) ? "mobei332le" : "see3232ction"}*/>


                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionRedesSociales hasVideo={false} igPosts={[igPost, igPost]} videoSrc={""}  height="90vh" cardWidth={"450px"} cardHeight={"600px"} mobileStack={false} title={SECCION_HOME_TEXTO_INSTAGRAM}/>
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionTextoDescriptivo height={60} textoDescriptivo={TEXTO_DESCRIPTIVO} />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionProductosDestacados mobileStack={false} hasVideo={true} height={"140vh"}  homeProds={homeProds} title={SECCION_HOME_TEXTO_PRODUCTOS_DESTACADOS} videoSrc={VIDEO_LINK_1}
                                                        isVideoFetched={handleVideoProductosFetched}
                            />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionMapa />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionCategorias  categories={CATEGORIES} title={SECCION_HOME_TEXTO_CATEGORIAS} videoSrc={VIDEO_LINK_2}  height={"60vh"}     isVideoFetched={handleVideoCategoriasFetched}/>
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionRedesSociales igPosts={[FACEBOOK_LINK_2, FACEBOOK_LINK_2]} videoSrc={""}  hasVideo={false} height="80vh" cardWidth={"450px"} cardHeight={"600px"} mobileStack={true} title={SECCION_HOME_TEXTO_FACEBOOK}/>
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionMarcas
                                height={"100vh"}

                                title={SECCION_HOME_TEXTO_MARCAS}
                                videoSrc={VIDEO_LINK_3}
                                brands={BRANDS}
                                mobileStack={true}
                                isVideoFetched={handleVideoMarcasFetched}
                            />
                        </Suspense>
                    </div>

                    </div>
                <Footer />
            </AnimatedPage>

        </>


    )
}

export default Home