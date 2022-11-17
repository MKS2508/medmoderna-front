import './Home.css'
import LazyLoad from 'react-lazy-load';

import React, {useEffect, useState} from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import {Button, Col, Row} from 'antd';
import {FacebookEmbed} from 'react-social-media-embed';
import ProductCard from "../../components/Product/ProductCard";
import ProductCardHome from "../../components/Product/ProductCardHome";
import {AnimatePresence, motion} from 'framer-motion';
import BrandCard from "../../components/Product/BrandCard";
import {IProductProps} from '../../models/IProductProps';
import logo from '../../assets/logo3.png'
import banner from '../../assets/banner.png'
import {RiInstagramFill, RiWhatsappFill} from "react-icons/ri";
import {FaFacebookSquare} from "react-icons/fa";
import ReactWhatsapp from "react-whatsapp";
import {IoLogoWhatsapp} from "react-icons/io";
import videoBack from "../../assets/4K cannabis 004 - San Rafael'71 Tangerine Dream .mp4";
import gifBack from "../../assets/back.gif";
import poster from "../../assets/poster.png";
import ProductCardMobile from "../../components/Product/ProductCardMobile";

const videoBackUrlFromGithub = "https://github.com/MKS2508/medmoderna-front/raw/master/medmoderna-front/src/assets/4K%20cannabis%20004%20-%20San%20Rafael'71%20Tangerine%20Dream%20.mp4";
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

const HomeProducts = (data: { products: IProductProps[] }) => {
    return <div className={"HomeProductsSection"}>
        {
            data.products.map((item) =>
                <>
                    <div style={{marginRight: "30px", marginTop: "30px"}}>
                        <ProductCardHome productId={item.productId} name={item.name} price={item.price}
                                         description={item.description}
                                         imgSrc={item.imgSrc}
                                         brand={item.brand}/>
                    </div>
                </>
            )
        }
    </div>
}
const HomeProductsMobile = (data: { products: IProductProps[] }) => {
    return <div className={"productsWrapperMobile"}>
        {
            data.products.map((item) =>
                <>
                    <div style={{marginRight: "30px", marginTop: "30px"}}>
                        <ProductCardMobile productId={item.productId} name={item.name} price={item.price}
                                           description={item.description}
                                           imgSrc={item.imgSrc}
                                           brand={item.brand}/>
                    </div>
                </>
            )
        }
    </div>
}

const Home = () => {
    const homeProds: IProductProps[] = [{
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50.0
    }, {
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50
    }, {
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50.0
    }, {
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50.0
    }, {
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50
    }, {
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50.0
    }, {
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50.0
    },{
        description: "",
        name: "GROTEK MONSTER BLOOM",
        imgSrc: "https://latahullaverde.com/wp-content/uploads/2020/12/latahullaverde-Fertilizantes-Grotek-Monster-Bloom-130gr.jpg.png",
        brand: "GROTEK",
        price: 50.0
    },];
    const postsUrls = ["https://www.instagram.com/p/Ckqxnp9DKZx/embed", "https://www.instagram.com/p/COi_Ep9nW2A/embed", "https://www.instagram.com/p/CjpsbJkAaQl/embed", "https://www.instagram.com/p/CeTSXK1sDpU/embed", "https://www.instagram.com/p/CdbJE9pDOtR/embed", "https://www.instagram.com/p/CfGzFDFMkoW/embed", "https://www.instagram.com/p/Ce6EsEQMa_A/embed"];
    const [igPost, setIgPost] = useState<string>("https://www.instagram.com/p/COi_Ep9nW2A/embed");
    const [fbPost, setFbPost] = useState<string>("https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid024VCQ8PL6NxmVcJPRxrYbSZmbXTZxfosYuRdQWCWewSV78vbi39djjbNoBx43KLXLl%26id%3D110763457854490&show_text=true&width=300");
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [isVisible, setIsVisible] = useState(true);


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


    return (<>

            <div>
                <div className="">

                    <div className="ParallaxVideo">

                        <video autoPlay muted loop playsInline poster={poster}>

                            <source type="video/mp4" src={videoBackUrlFromGithub}/>
                        </video>
                        <div className={(!isVisible && window.screen.width < 440) ? "captionWithSidebar" : "caption"}>

                            <span className="border">
                        <div>
                            <AnimatePresence>
                                 <motion.img className={"logoHome"}
                                             initial={{opacity: 0,}}
                                             animate={{opacity: 1}}
                                             exit={{opacity: 0.3}}
                                             transition={{duration: 2}}
                                             src={"https://raw.githubusercontent.com/MKS2508/medmoderna-front/master/medmoderna-front/src/assets/logo3.png"}
                                             alt={"logo"} width={"350px"}/>
                            </AnimatePresence>

                        </div>
                    </span>
                        </div>
                    </div>

                </div>

                <div className="section">
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>

                        <p style={{maxWidth: "500px", fontSize: "1.2rem"}}>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor,
                            euismod
                            sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a,
                            augue
                            natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod,
                            velit
                            sociosqu posuere potenti integer auctor lobortis ad nascetur molestie.
                            Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor,
                            euismod
                            sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a,
                            augue
                            natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod,
                            velit
                            sociosqu posuere potenti integer auctor lobortis ad nascetur molestie. Lorem ipsum dolor sit
                            amet
                            consectetur adipiscing elit, curae a cum integer at auctor, euismod sapien mus donec tempor
                            mauris.
                            Ad himenaeos scelerisque morbi convallis, torquent eros a, augue natoque per. Sed tempus
                            urna vel
                            iaculis montes leo dignissim nostra quam fermentum euismod, velit sociosqu posuere potenti
                            integer
                            auctor lobortis ad nascetur molestie.
                            Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor,
                            euismod
                            sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a,
                            augue
                            natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod,
                            velit
                            sociosqu posuere potenti integer auctor lobortis ad nascetur molestie.</p>


                        <AnimatePresence>

                            <div>
                                <motion.iframe
                                    className="iframeIg"
                                    initial={{opacity: 0, scale: 0.7, borderRadius: "20%", height: 400, marginTop: 30}}
                                    animate={{opacity: 1, scale: 1, borderRadius: "10px", height: 720}}
                                    exit={{opacity: 0.3}}
                                    transition={{duration: 1.5}}
                                    key={igPost} width="460" height={720} src={igPost}
                                    frameBorder="0"/>
                            </div>

                        </AnimatePresence>

                    </div>
                    <div className="bgimg-3">
                        <div className="caption">
                        <span className="border2">
                            <div>
                                <h2>Puedes contactarnos a traves de Whatsapp</h2>
                                <h4>Te lo llevamos a casa en pedidos superiores a 50 EUR</h4>

                            </div>
                        </span>
                        </div>
                    </div>

                    <section>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: "3rem",
                            paddingTop: "2rem",
                            backgroundColor: "whitesmoke"
                        }}>
                            <h1>Algunos de nuestros productos ☘️</h1>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: "whitesmoke"}}>
                            <h2>{" < CBD > "}</h2>
                        </div>

                        <HomeProducts products={homeProds}></HomeProducts>


                    </section>


                    <div style={{display: 'flex', justifyContent: 'center', marginTop: "3rem", paddingTop: "2rem"}}>
                        <h2>Puedes encontrarnos en <a href={"https://goo.gl/maps/V8UuLN7WnG8rMHiM6"}>Avenida de
                            Mendavia, Nº16
                            Pabellón 2, 26009 Logroño, La Rioja</a></h2>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: "2rem", borderRadius: "20%"}}>
                        <AddressMap/>
                    </div>
                    <div className="bgimg-2">
                        <div className="caption">
                        <span className="border2">
                            <div>
                                <h2>Te esperamos! 🚀</h2>
                            </div>
                        </span>
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: "2rem",
                        backgroundColor: "whitesmoke"
                    }}>
                        <h1>Algunas de nuestras marcas</h1>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: "2rem",
                        backgroundColor: "whitesmoke"
                    }}>
                        <div style={{marginRight: "30px", marginTop: "30px"}}>

                            <BrandCard name={"CANNA"}
                                       imgSrc={"http://akjacks.com/images/sale/Canna/Canna-logo.png"}
                            />
                        </div>
                        <div style={{marginRight: "30px", marginTop: "30px"}}>
                            <BrandCard name={"MEDICINA MODERNA"}
                                       imgSrc={"https://i.ibb.co/x8NJ89x/banner.png"}
                            />
                        </div>
                        <div style={{marginRight: "30px", marginTop: "30px"}}>
                            <BrandCard name={"GROW THE JUNGLE"}
                                       imgSrc={"https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png"}
                            />
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: "2rem",
                        backgroundColor: "whitesmoke"
                    }}>
                        <div style={{marginRight: "30px", marginTop: "15px", marginBottom: "50px"}}>

                            <BrandCard name={"RAW"}
                                       imgSrc={"https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png"}
                            />
                        </div>
                        <div style={{marginRight: "30px", marginTop: "15px"}}>
                            <BrandCard name={"GORILLA GRILLZ"}
                                       imgSrc={"https://www.gorillagrillz.com/wp-content/uploads/2021/02/Gorilla-Grillz_Blanco-e1612635853486-300x200.png"}
                            />
                        </div>
                        <div style={{marginRight: "30px", marginTop: "15px"}}>
                            <BrandCard name={"GROTEK"}
                                       imgSrc={"https://www.led-grower.eu/user/categories/orig/grotek-logo.png"}
                            />
                        </div>
                    </div>


                </div>
                {/*pc*/}
                <section className="mobile">
                    <div className="mobileSectionFull" style={{backgroundColor: "#EAE6E6FF", height: "100rem"}}>
                        <h1>Algunos de nuestros productos ☘️</h1>

                        <HomeProductsMobile products={homeProds}></HomeProductsMobile>

                    </div>
                    <div className="mobileSectionSeparator">
                    </div>

                    <div className="mobileSectionFull" style={{backgroundColor: "white", height: "700px"}}>
                        <h1>¿Dónde estamos? 📍</h1>
                        <div
                            style={{display: 'flex', justifyContent: 'center', borderRadius: "20%"}}>
                            <AddressMapMobile/>
                        </div>

                    </div>
                    <div className="mobileSectionSeparator">
                    </div>
                    <div className="mobileSectionFull" style={{paddingTop: 0, height: "600px"}}>
                        <div>
                            <AnimatePresence>
                                <h1 style={{paddingTop: "5vh", paddingBottom: "5vh"}}>Nuestras RRSS 💚</h1>
                                <motion.iframe
                                    className="iframeIg"
                                    initial={{opacity: 0, scale: 1, height: "500",}}
                                    animate={{opacity: 1, scale: 1, height: "500",}}
                                    exit={{opacity: 0.3}}
                                    transition={{duration: 1}}
                                    key={igPost} width="100%" height="100%" src={igPost}
                                    frameBorder="0"/>
                            </AnimatePresence>

                        </div>

                    </div>
                    <div className="mobileSectionFull" style={{paddingTop: "7rem", height: "700px"}}>
                        <div>
                            <AnimatePresence>

                                <motion.iframe
                                    className="iframeIg"
                                    initial={{opacity: 0, scale: 1, height: "680"}}
                                    animate={{opacity: 1, scale: 1, height: "680"}}
                                    exit={{opacity: 0.3}}
                                    transition={{duration: 1.5}}
                                    key={fbPost} width="100%" height="100%" src={fbPost}
                                    frameBorder="0"/>
                            </AnimatePresence>

                        </div>

                    </div>
                    <div className="mobileSectionSeparator">

                    </div>
                    <div className="mobileSectionHalf" style={{height: "500px"}}>
                        <h1>Nuestras Marcas 💚</h1>

                        <div className="mobileBrands">

                            <div>
                                <BrandCard name={"RAW"}
                                           imgSrc={"https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png"}
                                />
                            </div>
                            <div>
                                <BrandCard name={"GORILLA GRILLZ"}
                                           imgSrc={"https://www.gorillagrillz.com/wp-content/uploads/2021/02/Gorilla-Grillz_Blanco-e1612635853486-300x200.png"}
                                />
                            </div>

                        </div>
                    </div>
                    <div style={{backgroundColor: "#EAE6E6FF", height: "400px"}} className="mobileSectionHalf">


                        <div className="mobileBrands">
                            <div>
                                <BrandCard name={"GROTEK"}
                                           imgSrc={"https://www.led-grower.eu/user/categories/orig/grotek-logo.png"}
                                />
                            </div>
                            <div>

                                <BrandCard name={"CANNA"}
                                           imgSrc={"http://akjacks.com/images/sale/Canna/Canna-logo.png"}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="mobileSectionHalf">


                        <div className="mobileBrands">
                            <div>
                                <BrandCard name={"MEDICINA MODERNA"}
                                           imgSrc={"https://i.ibb.co/x8NJ89x/banner.png"}
                                />
                            </div>
                            <div>
                                <BrandCard name={"GROW THE JUNGLE"}
                                           imgSrc={"https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png"}
                                />
                            </div>
                        </div>
                    </div>
                </section>

            </div>


            {/* <div style={{display: 'flex', justifyContent: 'center'}}>

                <FacebookEmbed
                    url="https://www.facebook.com/110763457854490/photos/a.129307232666779/347631650834335/?type=3&theater"
                    width={400}/>
            </div>*/}

        </>


    )
}

export default Home