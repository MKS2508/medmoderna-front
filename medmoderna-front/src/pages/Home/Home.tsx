import './Home.css'
import React, {useEffect, useState} from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import {Button, Col, Row} from 'antd';
import {FacebookEmbed} from 'react-social-media-embed';
import ProductCard from "../../components/Product/ProductCard";
import ProductCardHome from "../../components/Product/ProductCardHome";
import {AnimatePresence, motion} from 'framer-motion';
import parallax1 from '../../assets/parallax1.jpg';
import parallax2 from '../../assets/parallax2.jpg';
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
const Home = () => {
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
                <div className="bgimg-1">
                    <div className="caption">
                        <span className="border">
                            <div>
                                <h1>{"BIENVENIDO A MEDICINA MODERNA"}</h1>
                                <h2>¡Tu Grow Shop de confianza en Logroño!</h2>
                            </div>
                        </span>
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
                        <div style={{display: 'flex', justifyContent: 'center', backgroundColor: "whitesmoke"}}>
                            <h2>{" < CBD > "}</h2>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            paddingTop: "2rem",
                            backgroundColor: "whitesmoke"
                        }}>
                            <div style={{marginRight: "30px", marginTop: "30px"}}>

                                <ProductCardHome productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                                 imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}
                                                 brand={"RAW"}/>
                            </div>

                            <div style={{marginRight: "30px", marginTop: "30px"}}>
                                <ProductCardHome productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                                 imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}
                                                 brand={"RAW"}/>
                            </div>
                            <div style={{marginRight: "30px", marginTop: "30px"}}>
                                <ProductCardHome productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                                 imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}
                                                 brand={"RAW"}/>
                            </div>
                        </div>

                    </section>


                    <div style={{display: 'flex', justifyContent: 'center', marginTop: "3rem", paddingTop: "2rem"}}>
                        <h2>Puedes encontrarnos en <a href={"https://goo.gl/maps/V8UuLN7WnG8rMHiM6"}>Avenida de
                            Mendavia, Nº16
                            Pabellón 2, 26009 Logroño, La Rioja</a></h2>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: "2rem", borderRadius: "20%"}}>
                        <AddressMap/>
                    </div>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: "3rem",
                        paddingTop: "2rem",
                        backgroundColor: "whitesmoke"
                    }}>
                        <h1>Algunas de nuestras marcas</h1>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', backgroundColor: "whitesmoke"}}>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: "2rem",
                        backgroundColor: "whitesmoke"
                    }}>
                        <div style={{marginRight: "30px", marginTop: "30px"}}>

                            <ProductCardHome productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                             imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}
                                             brand={"RAW"}/>
                        </div>

                        <div style={{marginRight: "30px", marginTop: "30px"}}>
                            <ProductCardHome productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                             imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}
                                             brand={"RAW"}/>
                        </div>
                        <div style={{marginRight: "30px", marginTop: "30px"}}>
                            <ProductCardHome productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                             imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}
                                             brand={"RAW"}/>
                        </div>
                    </div>


                </div>

                <div className="bgimg-2">
                    <div className="caption">
                        <span className="border">
                            <div>
                                <h2>Te esperamos! 🚀</h2>
                            </div>
                        </span>
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