import './Home.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import React, {RefObject, useEffect, useRef, useState} from "react";
import ProductCardHome from "../../components/Product/ProductCardHome";
import {AnimatePresence, motion} from 'framer-motion';
import BrandCard from "../../components/Product/BrandCard";
import {IProductProps} from '../../models/IProductProps';
import logo from '../../assets/logo3.png'
import fondo from '../../assets/fondo1.png'
import fondo3 from '../../assets/fondo3.png'
import fondo2 from '../../assets/fondo2.png'
import {FacebookEmbed} from 'react-social-media-embed';

import poster from "../../assets/poster.png";
import videoHome from "../../assets/videohome.mp4";
import videoHome2 from "../../assets/VideoHomeAcortaco.mp4";
import ProductCardMobile from "../../components/Product/ProductCardMobile";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import ProductCardsListResponsive from "../../components/Product/ProductCardsListResponsive/ProductCardsListResponsive";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import {FaCannabis, FaCapsules, FaBong, FaTshirt, FaLightbulb, FaHandHoldingWater} from "react-icons/fa";
import ProductSwitcher from "../../components/Product/ProductSwitcher/ProductSwitcher";
import Footer from "../../components/Footer/Footer";
import SeccionProductosDestacados from "../../components/HomeSections/SeccionProductosDestacados";
import SeccionMarcas from "../../components/HomeSections/SeccionMarcas";
import SeccionCategorias from "../../components/HomeSections/SeccionCategorias";
import SeccionInstagram from "../../components/HomeSections/SeccionInstagram";
import SeccionMapa from "../../components/HomeSections/SeccionMapa";
import SeccionFacebook from "../../components/HomeSections/SeccionFacebook";
import {homeProds} from "../../assets/HomeProds/HomeProductsLists";
import SeccionTextoDescriptivo from "../../components/HomeSections/SeccionTextoDescriptivo";
import SeccionCarruselPrincipal from "../../components/HomeSections/SeccionCarruselPrincipal";


const videoBackUrlFromGithub = "https://github.com/MKS2508/medmoderna-front/raw/master/medmoderna-front/src/assets/4K%20cannabis%20004%20-%20San%20Rafael'71%20Tangerine%20Dream%20.mp4";
const videoBackUrlFromYt = "https://rr5---sn-h5qzened.googlevideo.com/videoplayback?expire=1679341167&ei=D2IYZMrDBcuO1gKAv7iQCg&ip=157.90.242.21&id=o-AA2C0anPp629L8_gkbxdDxa7cPbh1ZZEobx35fRHnhWN&itag=399&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C271%2C278%2C313%2C394%2C395%2C396%2C397%2C398%2C399%2C400%2C401&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ns=tzGqlaiIqYYNDAgCCLohwcAL&gir=yes&clen=21641026&dur=78.099&lmt=1609461168862480&keepalive=yes&fexp=24007246&c=WEB&txp=5431432&n=MaHWNrhCAR2xl8&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgC0mnT9ezpyG1rZyhWPKQAqd8CYuBBVcnN-KM7SMyh2wCID8zbpVYe9dkUdsxj8N5KqeYf8WpDHUGFMjb4Xzs5SsS&ratebypass=yes&rm=sn-4g5e6e7s&req_id=daf18eb411fa3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-h5nhv8pa-h5qe7l&cms_redirect=yes&cmsv=e&mh=b3&mip=81.9.208.14&mm=29&mn=sn-h5qzened&ms=rdu&mt=1679319232&mv=m&mvi=5&pl=21&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhAP6OKkUv44H92mJyjkBsaEmaa2e834AS-Aq9lGrsW5nWAiAnUCBrgfGeIDWahwIS3ahwqftdxuQJIQIXk3tLM5U2Cw%3D%3D";
const AddressMap = () => {
    return (
        <div className="google-map-code">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5886.208184788902!2d-2.420187248556861!3d42.46807477334467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa6f5617fabcc60ac!2sMedicina%20Moderna%20Growshop!5e0!3m2!1ses-419!2ses!4v1655328560324!5m2!1ses-419!2ses"
                width="800" height="600" frameBorder="0" style={{border: 0, borderRadius: "10%"}}
                allowFullScreen={false} aria-hidden="false"
                tabIndex={0}/>
        </div>
    );
}
const AddressMapMobile = () => {
    return (
        <div className="google-map-code">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5886.208184788902!2d-2.420187248556861!3d42.46807477334467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa6f5617fabcc60ac!2sMedicina%20Moderna%20Growshop!5e0!3m2!1ses-419!2ses!4v1655328560324!5m2!1ses-419!2ses"
                width="300" height="550" frameBorder="0" style={{border: 0, borderRadius: "5%"}}
                allowFullScreen={false} aria-hidden="false"
                tabIndex={0}/>
        </div>
    );
}

export const HomeProducts = (data: { products: IProductProps[] }) => {
    return (<ProductCardsListResponsive isHome={true} products={data.products}/>)
}
const HomeProductsMobile = (data: { products: IProductProps[] }) => {
    return <div className={"productsWrapperMobile"}>
        {
            data.products.map((item) =>
                <>
                    <div key={item.name} style={{marginRight: "30px", marginTop: "30px"}}>
                        <ProductCardMobile key={item.name} category={item.category} productId={item.productId}
                                           name={item.name}
                                           price={item.price}
                                           description={item.description}
                                           imgSrc={item.imgSrc}
                                           brand={item.brand}/>
                    </div>
                </>
            )
        }
    </div>
}
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

const Home = () => {

    const postsUrls = ["https://www.instagram.com/p/Ckqxnp9DKZx/embed", "https://www.instagram.com/p/COi_Ep9nW2A/embed", "https://www.instagram.com/p/CjpsbJkAaQl/embed", "https://www.instagram.com/p/CeTSXK1sDpU/embed", "https://www.instagram.com/p/CdbJE9pDOtR/embed", "https://www.instagram.com/p/CfGzFDFMkoW/embed", "https://www.instagram.com/p/Ce6EsEQMa_A/embed"];
    const [igPost, setIgPost] = useState<string>("https://www.instagram.com/p/COi_Ep9nW2A/embed");
    const [fbPost, setFbPost] = useState<string>("https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid024VCQ8PL6NxmVcJPRxrYbSZmbXTZxfosYuRdQWCWewSV78vbi39djjbNoBx43KLXLl%26id%3D110763457854490&show_text=true&width=300");
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [isVisible, setIsVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);


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


    return (


        <>

            <div hidden={imagesLoaded && !isLoading2}>
                <LoadingPage logoSrc={"a"}/>
            </div>


            <AnimatedPage>


                <div hidden={isLoading}  ref={wrapperRef}>

                    <SeccionCarruselPrincipal/>

                    {/* PC - Pantallas grandes */}
                    <div className="section">

                        <SeccionInstagram igPost={igPost} igPost2={igPost}/>

                        <SeccionTextoDescriptivo textoDescriptivo={"En Medicina Moderna Grow Shop encontrarás una amplia selección de productos para la cultura y el crecimiento de plantas, así como todas las herramientas que necesitas."}/>
                        <SeccionProductosDestacados homeProds={homeProds} title={"Más productos destacados"} videoSrc={"https://media.githubusercontent.com/media/MKS2508/medmoderna-front/master/medmoderna-front/src/assets/videohome.mp4"} />
                        <SeccionMapa />
                        <SeccionCategorias
                            title="Categorías"
                            videoSrc="https://media.githubusercontent.com/media/MKS2508/medmoderna-front/master/medmoderna-front/src/assets/videohome.mp4"
                        />

                        <SeccionFacebook url={"https://www.facebook.com/110763457854490/photos/a.129307232666779/347631650834335/?type=3&theater"} width={400} />

                        <SeccionMarcas
                            title="Algunas de nuestras marcas"
                            videoSrc="https://media.githubusercontent.com/media/MKS2508/medmoderna-front/master/medmoderna-front/src/assets/videohome.mp4"
                        />

                    </div>
                    {/* PC - Pantallas grandes */}

                    {/* Movil - Pantallas pequeñas */}
                    <section className="mobile">



                    </section>
                    {/* Movil - Pantallas pequeñas */}

                </div>

                <Footer/>

            </AnimatedPage>

        </>


    )
}

export default Home