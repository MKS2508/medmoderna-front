import './Home.css'
import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import { Button, Col, Row } from 'antd';
import { FacebookEmbed } from 'react-social-media-embed';
import ProductCard from "../../components/Product/ProductCard";
import ProductCardHome from "../../components/Product/ProductCardHome";
import { AnimatePresence, motion } from 'framer-motion';
import BrandCard from "../../components/Product/BrandCard";
import { IProductProps } from '../../models/IProductProps';
import logo from '../../assets/logo.png'
import banner from '../../assets/banner.png'
const AddressMap = () => {
    return (
        <div className="google-map-code">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5886.208184788902!2d-2.420187248556861!3d42.46807477334467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa6f5617fabcc60ac!2sMedicina%20Moderna%20Growshop!5e0!3m2!1ses-419!2ses!4v1655328560324!5m2!1ses-419!2ses"
                width="800" height="600" frameBorder="0" style={{ border: 0, borderRadius: "10%" }}
                allowFullScreen={false} aria-hidden="false"
                tabIndex={0} />
        </div>
    );
}

const HomeProducts = (data: { products: IProductProps[] }) => {
    return <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: "2rem",
        backgroundColor: "whitesmoke"
    }}>
        {
            data.products.map((item) =>
                <>
                    <div style={{ marginRight: "30px", marginTop: "30px" }}>
                        <ProductCardHome productId={item.productId} name={item.name} description={item.description}
                            imgSrc={item.imgSrc}
                            brand={item.brand} />
                    </div>
                </>
            )
        }
    </div>
}

const Home = () => {
    const homeProds: IProductProps[] = [];
    const postsUrls = ["https://www.instagram.com/p/COi_Ep9nW2A/embed", "https://www.instagram.com/p/CeTSXK1sDpU/embed", "https://www.instagram.com/p/CdbJE9pDOtR/embed", "https://www.instagram.com/p/CfGzFDFMkoW/embed", "https://www.instagram.com/p/Ce6EsEQMa_A/embed"];
    const [igPost, setIgPost] = useState<string>("https://www.instagram.com/p/COi_Ep9nW2A/embed");
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every 10 second!');

            let randomPost = setRandomPost(postsUrls);
            if (igPost !== randomPost) {
                setIgPost(randomPost)
            } else {
                setIgPost(setRandomPost(postsUrls))
            }

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
                    <video autoPlay muted loop>
                        <source src="https://rr11---sn-quxapm-3c2s.googlevideo.com/videoplayback?expire=1668027382&ei=lr9rY_-eEtuCvdIPiq2CuAU&ip=2001%3A41d0%3Ad%3A260c%3A%3A&id=o-AG8wL5ZT3rrwuo7CQ37-ZP0-ZQUvKCulliW5Y6R6sb7e&itag=22&source=youtube&requiressl=yes&mh=3O&mm=31%2C29&mn=sn-quxapm-3c2s%2Csn-25ge7nz6&ms=au%2Crdu&mv=m&mvi=11&pcm2cms=yes&pl=46&initcwndbps=813750&vprv=1&mime=video%2Fmp4&ns=PxZfO2D1wXsoczAgMaBEQTEJ&cnr=14&ratebypass=yes&dur=942.033&lmt=1598947165303117&mt=1668005335&fvip=1&fexp=24001373%2C24007246&c=TVHTML5_SIMPLY_EMBEDDED_PLAYER&txp=2216222&n=d9RJaOVVxr9FAg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRAIgSsfmlrffDeounvRB_Rm0ezSNOogx0QucHp0QEXtZJsACIAZOYCXZ8Opw_eR2CWJ13J_55SyB6JBIyWdSdo0Aod28&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRgIhAI-t_Zvtq6xWOtaW8oWLrcIVFomVMp5r0Gt1ZlO7ZIe8AiEA1MI-kFO86nTObOn7SELb2aeMLJ7a4fcTimj--_QnExE%3D&title=4K+cannabis+004+-+San+Rafael%2771+Tangerine+Dream+%23SQDC" type="video/mp4" />
                    </video>


                    <div className="caption">

                        <span className="border">
                        <div>
                            <img src={logo} alt={"logo"} width={"250px"}/>
                            <h2 style={{ color: "white" }}>{"Tu Grow de confianza en Logroño"}</h2>

                        </div>
                    </span>
                    </div>
                </div>

            </div>

            <div className="section">
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>

                    <p style={{ maxWidth: "500px", fontSize: "1.2rem" }}>
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
                                initial={{ opacity: 0, scale: 0.7, borderRadius: "20%", height: 400, marginTop: 30 }}
                                animate={{ opacity: 1, scale: 1, borderRadius: "10px", height: 720 }}
                                exit={{ opacity: 0.3 }}
                                transition={{ duration: 1.5 }}
                                key={igPost} width="460" height={720} src={igPost}
                                frameBorder="0" />
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
                        <h1>Algunos de nuestros productos</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: "whitesmoke" }}>
                        <h2>{" < CBD > "}</h2>
                    </div>

                    <HomeProducts products={homeProds} ></HomeProducts>


                </section>


                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "3rem", paddingTop: "2rem" }}>
                    <h2>Puedes encontrarnos en <a href={"https://goo.gl/maps/V8UuLN7WnG8rMHiM6"}>Avenida de
                        Mendavia, Nº16
                        Pabellón 2, 26009 Logroño, La Rioja</a></h2>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2rem", borderRadius: "20%" }}>
                    <AddressMap />
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
                    <div style={{ marginRight: "30px", marginTop: "30px" }}>

                        <BrandCard name={"CANNA"}
                            imgSrc={"http://akjacks.com/images/sale/Canna/Canna-logo.png"}
                        />
                    </div>
                    <div style={{ marginRight: "30px", marginTop: "30px" }}>
                        <BrandCard name={"MEDICINA MODERNA"}
                            imgSrc={"https://i.ibb.co/x8NJ89x/banner.png"}
                        />
                    </div>
                    <div style={{ marginRight: "30px", marginTop: "30px" }}>
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
                    <div style={{ marginRight: "30px", marginTop: "15px", marginBottom: "50px" }}>

                        <BrandCard name={"RAW"}
                            imgSrc={"https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png"}
                        />
                    </div>
                    <div style={{ marginRight: "30px", marginTop: "15px" }}>
                        <BrandCard name={"GORILLA GRILLZ"}
                            imgSrc={"https://www.gorillagrillz.com/wp-content/uploads/2021/02/Gorilla-Grillz_Blanco-e1612635853486-300x200.png"}
                        />
                    </div>
                    <div style={{ marginRight: "30px", marginTop: "15px" }}>
                        <BrandCard name={"GROTEK"}
                            imgSrc={"https://www.led-grower.eu/user/categories/orig/grotek-logo.png"}
                        />
                    </div>
                </div>


            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: "0.5rem",
                backgroundColor: "whitesmoke",
            }}>
                <h2>Abrimos de lunes a viernes de 9:30 - 14:30 y de 16:30 - 20:00</h2>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: "0.5rem",
                backgroundColor: "whitesmoke"
            }}>
                <h3>Abrimos los sábados de 9:30 - 14:30</h3>
            </div>
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