import React, {useEffect, useState} from 'react'
import {IoIosShirt, IoLogoWhatsapp} from 'react-icons/io'
import {Link, useNavigate} from 'react-router-dom'
import './SideBar.css'
import 'font-awesome/css/font-awesome.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import {config} from "@fortawesome/fontawesome-svg-core";
import {FaBong, FaCannabis, FaExpandAlt, FaFacebookSquare, FaJoint} from "react-icons/fa";
import {RiInstagramFill, RiPlantFill} from "react-icons/ri";
import {GiLightBulb} from "react-icons/gi";
import logo from '../../assets/logo.png'
import banner from '../../assets/banner.png'

const SideBar = () => {
    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [active, setActive] = useState(false)
    const [mobileMode, setMobileMode] = useState(false)
    let navigate = useNavigate();
    const activateNav = () => {
        setActive(!active)
    }
    const closeNav = () => {
        setActive(false)
    }

    function getWindowDimensions() {
        const width = window.innerWidth
        const height = window.innerHeight
        return {
            width,
            height
        };
    }

    function useWindowDimensions() {

        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
        useEffect(() => {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);

            return () => window.removeEventListener('resize', handleResize);
        }, []);

        return windowDimensions;
    }

    const checkMobileMode = () => {
        const bol = (width <= 950);
        return bol;
        //setMobileMode(bol);
    }
    const {height, width} = useWindowDimensions();

    const mob = checkMobileMode();

    //TODO: IMPORTANTE FALTA ESTILO ACTIVE LIST ITEM SELECTED
    //TODO: LO DEL MENSAJE DE TELEGRAM
    return (<>
            <div>
                <div className={active ? 'header' : 'header-mobile'} onMouseLeave={closeNav}>

                    {(!active) ? <div className="logo" onClick={() => navigate("/")}>
                            <img width="100%" alt="logo" src={logo}/>
                        </div> :
                        <div className="banner" onClick={() => navigate("/")}>
                            <img width="100%" height="85%" alt="logo" src={banner}/>
                        </div>
                    }


                    <nav>
                        <ul className={active ? 'ul-item' : 'ul-item oicon'}>
                            {!mob && !active ?
                                <li className="expandIcon" onClick={activateNav}>
                                    <FaExpandAlt className='icon'/>
                                </li> : <></>}

                            <li onClick={() => navigate("/CULTIVO")}>
                                <RiPlantFill className='icon'/>
                                <Link to="/CULTIVO"> CULTIVO </Link>
                            </li>


                            <li onClick={() => navigate("/ILUMINACION")}>
                                <GiLightBulb className='icon'/>
                                <Link to="/ILUMINACION">ILUMINACION</Link>

                            </li>

                            <li onClick={() => navigate("/CBD")}>
                                <FaCannabis className='icon'/>

                                <Link className='customspan' to='/CBD'>CBD</Link>

                            </li>


                            <li onClick={() => navigate("/MARCAS")}>
                                <FaBong className='icon'/>
                                <Link to="/MARCAS">MARCAS</Link>

                            </li>


                            <li onClick={() => navigate("/PARAFERNALIA")}>
                                <FaJoint className='icon'/>
                                <Link to="/PARAFERNALIA">PARAFERNALIA</Link>

                            </li>
                            <li onClick={() => navigate("/ROPA")}>
                                <IoIosShirt className='icon'/>
                                <Link to="/ROPA">ROPA</Link>

                            </li>
                            <div className="rrssIcons">

                            </div>

                            <li>
                                <IoLogoWhatsapp className='icon'/>
                                <Link to="/CULTIVO"
                                >whatsapp</Link>

                            </li>
                            <li>
                                <RiInstagramFill className='icon'/>
                                <Link to="/CULTIVO"
                                >INSTAGRAM</Link>

                            </li>
                            <li>
                                <FaFacebookSquare className='icon'/>
                                <Link to="/CULTIVO"
                                >FACEBOOK</Link>

                            </li>


                        </ul>
                    </nav>

                </div>
            </div>


        </>
    )
}

export default SideBar