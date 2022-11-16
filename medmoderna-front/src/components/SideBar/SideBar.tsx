import React, {useEffect, useState} from 'react'
import {IoIosShirt, IoLogoWhatsapp} from 'react-icons/io'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import './SideBar.css'
import 'font-awesome/css/font-awesome.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import {config} from "@fortawesome/fontawesome-svg-core";
import {FaBong, FaCannabis, FaExpandAlt, FaFacebookSquare, FaJoint} from "react-icons/fa";
import {RiInstagramFill, RiPlantFill} from "react-icons/ri";
import {GiLightBulb} from "react-icons/gi";
import logo from '../../assets/logo4.png'
import banner from '../../assets/banner.png'
import {AnimatePresence, motion} from "framer-motion";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromQuery} from "../../services/api-products-service";
import ReactTooltip from 'react-tooltip';


const SideBar = () => {

    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [active, setActive] = useState(false)
    const [mobileMode, setMobileMode] = useState(false)

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

        if (window.location.pathname != "/") {
            setIsVisible(false)
        }

        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);

    }, [])

    const getCurrentPage = (): string => {
        const location = useLocation();
        console.warn({location: location.pathname});
        return location.pathname;
    };

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
    let page = getCurrentPage();

    const mob = checkMobileMode();

    //TODO: IMPORTANTE FALTA ESTILO ACTIVE LIST ITEM SELECTED
    return (<>
            <div>
                <AnimatePresence>
                    {
                        (!isVisible) ? <>
                            <motion.div initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        transition={{duration: 1}}
                                        className={active ? 'header' : 'header-mobile'} onMouseLeave={closeNav}>

                                {/*(!active) ? <div className="logo" onClick={() => navigate("/")}>
                                        <img width="110%" alt="logo" src={logo}/>
                                    </div> :
                                    <div className="banner" onClick={() => navigate("/")}>
                                        <img width="100%" height="85%" alt="logo" src={banner}/>
                                    </div>
                                */}


                                <nav>
                                    <ul className={active ? 'ul-item' : 'ul-item oicon'}>
                                        {!mob && !active ?
                                            <li className="expandIcon" onClick={activateNav}>
                                                <FaExpandAlt className='icon'/>
                                            </li> : <></>}

                                        <li onClick={() => navigate("/CULTIVO")} className={(page.startsWith("/CULTIVO")) ? "itemActive":""}>
                                            <RiPlantFill className={(page.startsWith("/CULTIVO") ? "iconActive":"icon")}/>
                                            <Link to="/CULTIVO"> CULTIVO </Link>
                                        </li>


                                        <li onClick={() => navigate("/ILUMINACION")} className={(page.startsWith("/ILUMINACION")) ? "itemActive":""}>
                                            <GiLightBulb className={(page.startsWith("/ILUMINACION")) ? "iconActive":"icon"}/>
                                            <Link to="/ILUMINACION">ILUMINACION</Link>
                                        </li>

                                        <li onClick={() => navigate("/CBD")} className={(page.startsWith("/CBD") && !active) ? "itemActive":""}>
                                            <FaCannabis className={(page.startsWith("/CBD") && !active) ? "iconActive":"icon"}/>

                                            <Link className='customspan' to='/CBD'>CBD</Link>

                                        </li>


                                        <li onClick={() => navigate("/MARCAS")} className={(page.startsWith("/MARCAS")) ? "itemActive":""}>
                                            <a data-tip="React-tooltip">

                                            </a>
                                            <FaBong className={(page.startsWith("/MARCAS")) ? "iconActive":"icon"}/>

                                            <Link to="/MARCAS">MARCAS</Link>
                                            <ReactTooltip place="top" type="dark" effect="float"/>


                                        </li>


                                        <li onClick={() => navigate("/PARAFERNALIA")} className={(page.startsWith("/PARAFERNALIA")) ? "itemActive":""}>
                                            <FaJoint className={(page.startsWith("/PARAFERNALIA")) ? "iconActive":"icon"}/>
                                            <Link to="/PARAFERNALIA">PARAFERNALIA</Link>

                                        </li>
                                        <li onClick={() => navigate("/ROPA")} className={(page.startsWith("/ROPA")) ? "itemActive":""}>
                                            <IoIosShirt className={(page.startsWith("/ROPA")) ? "iconActive":"icon"}/>
                                            <Link to="/ROPA">ROPA</Link>

                                        </li>




                                    </ul>
                                </nav>

                            </motion.div></> : <></>
                    }


                </AnimatePresence>
            </div>


        </>
    )
}

export default SideBar