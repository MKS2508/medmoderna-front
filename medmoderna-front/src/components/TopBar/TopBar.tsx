import React, {useState} from 'react'
import {
    IoMdBookmark,
    IoMdCall,
    IoMdChatboxes,
    IoMdClipboard,
    IoMdClose,
    IoMdHammer,
    IoMdHome,
    IoMdMenu,
    IoIosShirt,
    IoLogoWhatsapp
} from 'react-icons/io'
import {Link} from 'react-router-dom'
import './TopBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import {config} from "@fortawesome/fontawesome-svg-core";
import {ReactSVG} from 'react-svg'
import {FaCannabis, FaBong, FaJoint, FaFacebookSquare} from "react-icons/fa";
import {RiPlantFill, RiInstagramFill} from "react-icons/ri";
import {GiLightBulb} from "react-icons/gi";

import logo from '../../assets/LOGOSVG3.svg'

import banner from "../../assets/banner.png";
import ReactWhatsapp from "react-whatsapp";
import {AnimatePresence, motion} from "framer-motion";

const TopBar = () => {
    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [active, setActive] = useState(true)

    const activateNav = () => {
        setActive(!active)
    }

    return (<>
        <AnimatePresence>

        <motion.div initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 1.4}}
                    className={active ? 'topBar' : 'topBar-mobile'} >

                    <p className="topbarText">Puedes encontrarnos en Avenida de Mendavia, Nº16 Pabellón 2, 26009 Logroño, La Rioja</p>
                    <div style={{borderRadius: "10px"}}>
                        <form>

                            <input className={"searchBar"} placeholder={"Buscar.."} type={"search"}/>
                            <button className={"searchBarButton"} type="submit"><i className="fa fa-search"></i></button>

                        </form>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIcon">

                                <span className="wa">
                                         {/*@ts-ignore*/}
                                    <ReactWhatsapp style={{border: "none", backgroundColor: "#EAE6E6FF"}}
                                                   number="+34601185250" message={"Hola malaraza"}>
                                        <IoLogoWhatsapp size={30} className='iconRRSS'/>
                                    </ReactWhatsapp>
                                </span>

                        </div>
                        <div className="instaIcon">
                            <a href="https://www.instagram.com/medicinamoderna_growshop/?hl=es">
                                <RiInstagramFill size={30} className='iconRRSS'/>
                            </a>
                        </div>
                        <div className="faceIcon">
                            <a href="https://www.facebook.com/Medicina-Moderna-Growshop-110763457854490/">
                                <FaFacebookSquare size={30} className='iconRRSS'/>
                            </a>
                        </div>
                    </div>

            </motion.div>
        </AnimatePresence>

        </>
    )
}

export default TopBar