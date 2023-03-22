import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, { Suspense, lazy, RefObject, useEffect, useRef, useState } from 'react';
import {homeProds} from "../../assets/HomeProds/HomeProductsLists";

import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import LoadingPage from "../../components/LoadingPage/LoadingPage";

import Footer from "../../components/Footer/Footer";
// Importa los componentes usando React.lazy
const SeccionProductosDestacados = lazy(() => import('../../components/HomeSections/SeccionProductosDestacados'));
const SeccionMarcas = lazy(() => import('../../components/HomeSections/SeccionMarcas'));
const SeccionCategorias = lazy(() => import('../../components/HomeSections/SeccionCategorias'));
const SeccionInstagram = lazy(() => import('../../components/HomeSections/SeccionInstagram'));
const SeccionMapa = lazy(() => import('../../components/HomeSections/SeccionMapa'));
const SeccionFacebook = lazy(() => import('../../components/HomeSections/SeccionFacebook'));
const SeccionTextoDescriptivo = lazy(() => import('../../components/HomeSections/SeccionTextoDescriptivo'));
const SeccionCarruselPrincipal = lazy(() => import('../../components/HomeSections/SeccionCarruselPrincipal'));

import LazyLoadComponent from '../../components/LazyLoadComponent';
import LazyLoad from 'react-lazyload';
import {API_URL} from "../../config";



const useOnLoadImages = (ref: RefObject<HTMLElement>) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        const updateStatus = (images: HTMLImageElement[]) => {
            setStatus(
                images.map((image) => image.complete).every((item) => item === true)
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
                videos.map((video) => video.readyState >= 3).every((item) => item === true)
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

    const postsUrls = ["https://www.instagram.com/p/Ckqxnp9DKZx/embed", "https://www.instagram.com/p/COi_Ep9nW2A/embed", "https://www.instagram.com/p/CjpsbJkAaQl/embed", "https://www.instagram.com/p/CeTSXK1sDpU/embed", "https://www.instagram.com/p/CdbJE9pDOtR/embed", "https://www.instagram.com/p/CfGzFDFMkoW/embed", "https://www.instagram.com/p/Ce6EsEQMa_A/embed"];
    const [igPost, setIgPost] = useState<string>("https://www.instagram.com/p/COi_Ep9nW2A/embed");
    const [fbPost, setFbPost] = useState<string>("https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid024VCQ8PL6NxmVcJPRxrYbSZmbXTZxfosYuRdQWCWewSV78vbi39djjbNoBx43KLXLl%26id%3D110763457854490&show_text=true&width=300");
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

            <div hidden={imagesLoaded && !videosLoaded && !isLoading2 && videoMarcasFetched && videoProductosFetched  && videoCategoriasFetched  }>
                <LoadingPage logoSrc={"a"}/>
            </div>


            <AnimatedPage>
                <div hidden={false} ref={wrapperRef}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <SeccionCarruselPrincipal />
                    </Suspense>
                    {/* PC - Pantallas grandes */}
                    <div ref={videoContainerRef2} className="section">
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionInstagram igPost={igPost} igPost2={igPost} />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionTextoDescriptivo textoDescriptivo={"En Medicina Moderna Grow Shop encontrarás una amplia selección de productos para la cultura y el crecimiento de plantas, así como todas las herramientas que necesitas."} />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionProductosDestacados homeProds={homeProds} title={"Más productos destacados"} videoSrc={API_URL + "/videohome3.mp4"}
                                                        isVideoFetched={handleVideoProductosFetched}
                            />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionMapa />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionCategorias title="Categorías" videoSrc={API_URL + "/videohome3.mp4"}       isVideoFetched={handleVideoCategoriasFetched}/>
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionFacebook url={"https://www.facebook.com/110763457854490/photos/a.129307232666779/347631650834335/?type=3&theater"} width={400} />
                        </Suspense>

                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionMarcas
                                title="Algunas de nuestras marcas"
                                videoSrc="https://medmoderna.b-cdn.net/videohome3.mp4"
                                isVideoFetched={handleVideoMarcasFetched}
                            />
                        </Suspense>
                    </div>
                    {/* PC - Pantallas grandes */}

                    {/* Movil - Pantallas pequeñas */}
                    <section className="mobile">
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionInstagram igPost={igPost} igPost2={igPost} />
                        </Suspense>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionTextoDescriptivo textoDescriptivo={"En Medicina Moderna Grow Shop encontrarás una amplia selección de productos para la cultura y el crecimiento de plantas, así como todas las herramientas que necesitas."} />
                        </Suspense>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionProductosDestacados
                                isVideoFetched={handleVideoProductosFetched}
                                homeProds={homeProds} title={"Más productos destacados"} videoSrc={"https://medmoderna.b-cdn.net/videohome3.mp4"} />
                        </Suspense>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionMapa />
                        </Suspense>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionCategorias title="Categorías" videoSrc="https://medmoderna.b-cdn.net/videohome3.mp4"       isVideoFetched={handleVideoCategoriasFetched}/>
                        </Suspense>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionFacebook url={"https://www.facebook.com/110763457854490/photos/a.129307232666779/347631650834335/?type=3&theater"} width={280} />
                        </Suspense>
                        <Suspense fallback={<div>Loading...</div>}>
                            <SeccionMarcas
                                title="Algunas de nuestras marcas"
                                videoSrc="https://medmoderna.b-cdn.net/videohome3.mp4"
                                isVideoFetched={handleVideoMarcasFetched}
                            />
                        </Suspense>
                    </section>
                    {/* Movil - Pantallas pequeñas */}
                </div>
                <Footer />
            </AnimatedPage>

        </>


    )
}

export default Home