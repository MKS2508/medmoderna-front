import React, {useEffect, useState} from 'react'
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
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromQuery, postProduct} from "../../services/api-products-service";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import ProductCard from "../Product/ProductCard";
import ProductCardList from "../Product/ProductCardList";

const TopBar = () => {
    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<IProductProps[]>([]);





    return (<>
            <AnimatePresence>
                <motion.div initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.6}}
                            className="miniHeader">
                    <h3>
                        <a href={""} style={{color: "inherit"}}>
                            <span style={{fontSize: 17}}>📍</span> Puedes encontrarnos en Avenida de Mendavia, Nº16
                            Pabellón 2, 26009 Logroño, La Rioja <span style={{fontSize: 17}}></span>
                        </a>
                    </h3>

                </motion.div>
                <motion.div initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 1}}
                            className={active ? 'topBar' : 'topBar-mobile'}>



                    <div className="topbarIcons">

                    </div>

                </motion.div>
            </AnimatePresence>

        </>
    )
}

export default TopBar