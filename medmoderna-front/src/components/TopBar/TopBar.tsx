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
import {Container, Navbar} from "react-bootstrap";
import logo from '../../assets/LOGOSVG3.svg'
import {CSSTransition} from "react-transition-group";
import banner from "../../assets/banner.png";

const TopBar = () => {
    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [active, setActive] = useState(true)

    const activateNav = () => {
        setActive(!active)
    }

    return (<>
            <div>

                <div className={active ? 'topBar' : 'topBar-mobile'}>


            <p>Estamos en el Poligono de La portalada</p>
            <p>Estamos en el Poligono de La portalada</p>

                </div>
            </div>


        </>
    )
}

export default TopBar