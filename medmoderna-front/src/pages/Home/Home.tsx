import './Home.css'
import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import SideBar from "../../components/SideBar/SideBar";
import {Col, Row} from 'antd';

const Home = () => {
    return (<>
            <div className="center">
                <div className="title">
                    <h1>{"BIENVENIDO A MEDICINA MODERNA"}</h1>
                    <h2>Echa un vistazo a nuestro catalogo</h2>
                </div>


                <div className="wrapper-grid">


                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.gorillagrillz.com/wp-content/uploads/2021/02/WeddFF_1_FondoNUEVO-e1637581476626.jpg.webp'
                            alt='profile image' className="profile-img"/>
                        <p className="name">WEDDING CAKE FLOR CBD GORILLA GRILLZ</p>

                        <p className="description">Para los más golosos, esta flor de CBD aporta una dulzura con toques terrosos que combinado nos recuerdan a los dulces naturales, como el cacao o la vainilla.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.gorillagrillz.com/wp-content/uploads/2021/02/ForbFF_1_FondoNUEVO-e1637581649832.jpg.webp'
                            alt='profile image' className="profile-img"/>
                        <p className="name">FORBIDDEN FRUIT FLOR CBD GORILLA GRILLZ</p>

                        <p className="description">Después de innumerables combinaciones, surgió esta variedad de CBD tan única. Y es que ha heredado un perfil de terpenos tan bueno que se consideró que debería estar prohibida. ¿Y tú, qué opinas?</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.greenhand.es/productos/imagenes/img_14896_2b7ecacb1fc930a822bdd989a312c114_20.png'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Bandeja Donuts Raw</p>

                        <p className="description">Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW</p>
                        <p className="description">Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/21959-large_default/monster-bloom-130gr-grotek.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Monster Bloom 130gr Grotek</p>

                        <p className="description">Monster Bloom es un PK en polvo de alta calidad fabricado por Grotek, una marca puntera en la fabricación de fertilizantes para el cultivo de cannabis..</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://comerciovending.com/9-large_default/raw-slim.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Librillo RAW Classic 1 1/4</p>

                        <p className="description">Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.
                            Medidas del papel de fumar: 110 x 45 mm.
                            Caja de 50 librillos con 32 papelillos de fumar por librillo.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/27751-large_default/papel-raw-1-14-black.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Librillo RAW Black 1 1/4</p>
                        <p className="description">Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.
                            Medidas del papel de fumar: 110 x 45 mm.
                            Caja de 50 librillos con 32 papelillos de fumar por librillo.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/26989-large_default/synergy-400gr-grotek.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Synergy 400gr Grotek</p>
                        <p className="description">Synergy de Grotek es un concentrado de organismos beneficiosos a base de micorrizas. Además de mejorar las condiciones del suelo, mejora el desarrollo de las raíces y la capacidad para asimilar agua y nutrientes.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>                <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.gorillagrillz.com/wp-content/uploads/2021/02/WeddFF_1_FondoNUEVO-e1637581476626.jpg.webp'
                            alt='profile image' className="profile-img"/>
                        <p className="name">WEDDING CAKE FLOR CBD GORILLA GRILLZ</p>

                        <p className="description">Para los más golosos, esta flor de CBD aporta una dulzura con toques terrosos que combinado nos recuerdan a los dulces naturales, como el cacao o la vainilla.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.gorillagrillz.com/wp-content/uploads/2021/02/ForbFF_1_FondoNUEVO-e1637581649832.jpg.webp'
                            alt='profile image' className="profile-img"/>
                        <p className="name">FORBIDDEN FRUIT FLOR CBD GORILLA GRILLZ</p>

                        <p className="description">Después de innumerables combinaciones, surgió esta variedad de CBD tan única. Y es que ha heredado un perfil de terpenos tan bueno que se consideró que debería estar prohibida. ¿Y tú, qué opinas?</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.greenhand.es/productos/imagenes/img_14896_2b7ecacb1fc930a822bdd989a312c114_20.png'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Bandeja Donuts Raw</p>

                        <p className="description">Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW</p>
                        <p className="description">Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/21959-large_default/monster-bloom-130gr-grotek.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Monster Bloom 130gr Grotek</p>

                        <p className="description">Monster Bloom es un PK en polvo de alta calidad fabricado por Grotek, una marca puntera en la fabricación de fertilizantes para el cultivo de cannabis..</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://comerciovending.com/9-large_default/raw-slim.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Librillo RAW Classic 1 1/4</p>

                        <p className="description">Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.
                            Medidas del papel de fumar: 110 x 45 mm.
                            Caja de 50 librillos con 32 papelillos de fumar por librillo.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/27751-large_default/papel-raw-1-14-black.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Librillo RAW Black 1 1/4</p>
                        <p className="description">Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.
                            Medidas del papel de fumar: 110 x 45 mm.
                            Caja de 50 librillos con 32 papelillos de fumar por librillo.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/26989-large_default/synergy-400gr-grotek.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Synergy 400gr Grotek</p>
                        <p className="description">Synergy de Grotek es un concentrado de organismos beneficiosos a base de micorrizas. Además de mejorar las condiciones del suelo, mejora el desarrollo de las raíces y la capacidad para asimilar agua y nutrientes.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>                <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.gorillagrillz.com/wp-content/uploads/2021/02/WeddFF_1_FondoNUEVO-e1637581476626.jpg.webp'
                            alt='profile image' className="profile-img"/>
                        <p className="name">WEDDING CAKE FLOR CBD GORILLA GRILLZ</p>

                        <p className="description">Para los más golosos, esta flor de CBD aporta una dulzura con toques terrosos que combinado nos recuerdan a los dulces naturales, como el cacao o la vainilla.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.gorillagrillz.com/wp-content/uploads/2021/02/ForbFF_1_FondoNUEVO-e1637581649832.jpg.webp'
                            alt='profile image' className="profile-img"/>
                        <p className="name">FORBIDDEN FRUIT FLOR CBD GORILLA GRILLZ</p>

                        <p className="description">Después de innumerables combinaciones, surgió esta variedad de CBD tan única. Y es que ha heredado un perfil de terpenos tan bueno que se consideró que debería estar prohibida. ¿Y tú, qué opinas?</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.greenhand.es/productos/imagenes/img_14896_2b7ecacb1fc930a822bdd989a312c114_20.png'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Bandeja Donuts Raw</p>

                        <p className="description">Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW</p>
                        <p className="description">Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/21959-large_default/monster-bloom-130gr-grotek.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Monster Bloom 130gr Grotek</p>

                        <p className="description">Monster Bloom es un PK en polvo de alta calidad fabricado por Grotek, una marca puntera en la fabricación de fertilizantes para el cultivo de cannabis..</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://comerciovending.com/9-large_default/raw-slim.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Librillo RAW Classic 1 1/4</p>

                        <p className="description">Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.
                            Medidas del papel de fumar: 110 x 45 mm.
                            Caja de 50 librillos con 32 papelillos de fumar por librillo.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/27751-large_default/papel-raw-1-14-black.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Librillo RAW Black 1 1/4</p>
                        <p className="description">Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.
                            Medidas del papel de fumar: 110 x 45 mm.
                            Caja de 50 librillos con 32 papelillos de fumar por librillo.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                    <div className="container">
                        <div className='banner-img'></div>
                        <img
                            src='https://www.sativagrow.es/tienda/26989-large_default/synergy-400gr-grotek.jpg'
                            alt='profile image' className="profile-img"/>
                        <p className="name">Synergy 400gr Grotek</p>
                        <p className="description">Synergy de Grotek es un concentrado de organismos beneficiosos a base de micorrizas. Además de mejorar las condiciones del suelo, mejora el desarrollo de las raíces y la capacidad para asimilar agua y nutrientes.</p>
                        <button className='btn' onClick={() => {}}> ❤</button>
                    </div>
                </div>
            </div>

        </>


    )
}

export default Home