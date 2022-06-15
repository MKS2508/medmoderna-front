import './Home.css'
import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import {Col, Row} from 'antd';
import {InstagramEmbed, FacebookEmbed} from 'react-social-media-embed';
import ProductCard from "../../components/Product/ProductCard";

const AddressMap = () => {
    return (
        <div className="google-map-code">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5886.208184788902!2d-2.420187248556861!3d42.46807477334467!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa6f5617fabcc60ac!2sMedicina%20Moderna%20Growshop!5e0!3m2!1ses-419!2ses!4v1655328560324!5m2!1ses-419!2ses"
                width="800" height="600" frameBorder="0" style={{border: 0}} allowFullScreen={false} aria-hidden="false"
                tabIndex={0}/>
        </div>
    );
}
const Home = () => {
    return (<>
            <div className="title">
                <h1>{"BIENVENIDO A MEDICINA MODERNA"}</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>

                <p style={{maxWidth:"500px", fontSize:"1.2rem"}}>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor, euismod sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a, augue natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod, velit sociosqu posuere potenti integer auctor lobortis ad nascetur molestie.
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor, euismod sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a, augue natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod, velit sociosqu posuere potenti integer auctor lobortis ad nascetur molestie.     Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor, euismod sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a, augue natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod, velit sociosqu posuere potenti integer auctor lobortis ad nascetur molestie.
                    Lorem ipsum dolor sit amet consectetur adipiscing elit, curae a cum integer at auctor, euismod sapien mus donec tempor mauris. Ad himenaeos scelerisque morbi convallis, torquent eros a, augue natoque per. Sed tempus urna vel iaculis montes leo dignissim nostra quam fermentum euismod, velit sociosqu posuere potenti integer auctor lobortis ad nascetur molestie.</p>
                <InstagramEmbed url="https://www.instagram.com/p/COi_Ep9nW2A/?hl=es" width={460}/>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', marginTop: "3rem",paddingTop:"2rem", backgroundColor:"whitesmoke"}}>
                <h1>Algunos de nuestros productos</h1>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', backgroundColor:"whitesmoke"}}>
                <h2>{" < CBD > "}</h2>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: "2rem", backgroundColor:"whitesmoke" }}>
                <div style={{marginRight: "30px", marginTop: "30px"}}>
                    <ProductCard productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                 imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}/>
                </div>

                <div style={{marginRight: "30px", marginTop: "30px"}}>
                    <ProductCard productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                 imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}/>
                </div>
                <div style={{marginRight: "30px", marginTop: "30px"}}>
                    <ProductCard productId={1} name={"Librillo Raw Black 1 1/4"} description={""}
                                 imgSrc={"https://www.purpleexpressonline.com/wp-content/uploads/2021/07/RAWBLACK1-4.png"}/>
                </div>
            </div>



            <div style={{display: 'flex', justifyContent: 'center', marginTop: "3rem",paddingTop:"2rem"}}>
                <h2>Puedes encontrarnos en <a href={"https://goo.gl/maps/V8UuLN7WnG8rMHiM6"}>Avenida de Mendavia, Nº16 Pabellón 2, 26009 Logroño, La Rioja</a></h2>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: "2rem"}}>
                <AddressMap/>
            </div>


            <div style={{display: 'flex', justifyContent: 'center', paddingTop: "0.5rem", backgroundColor:"whitesmoke", marginTop:"3rem"}}>
                <h2>Abrimos de lunes a viernes de 9:30 - 14:30 y de 16:30 - 20:00</h2>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', paddingTop: "0.5rem", backgroundColor:"whitesmoke"}}>
                <h3>Abrimos los sábados de 9:30 - 14:30</h3>
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