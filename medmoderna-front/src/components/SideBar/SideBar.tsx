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
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromQuery} from "../../services/api-products-service";
import ReactTooltip from 'react-tooltip';
import {AiOutlinePlusCircle} from "react-icons/all";
import MenuItem from "./MenuItem";


const SideBar = () => {

    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
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

    const sidebarVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },

    };


    let page = getCurrentPage();


    const menuItems = [
        {
            title: "CULTIVO",
            path: "/CULTIVO",
            icon: <RiPlantFill />,
        },
        {
            title: "ILUMINACION",
            path: "/ILUMINACION",
            icon: <GiLightBulb />,
        },
        {
            title: "CBD",
            path: "/CBD",
            icon: <FaCannabis />,
        },
        {
            title: "MARCAS",
            path: "/MARCAS",
            icon: <FaBong />,
        },
        {
            title: "PARAFERNALIA",
            path: "/PARAFERNALIA",
            icon: <FaJoint />,
        },
        {
            title: "ROPA",
            path: "/ROPA",
            icon: <IoIosShirt />,
        },
        {
            title: "ADMIN",
            path: "/ADMIN",
            icon: <AiOutlinePlusCircle />,
        },
    ];

    return (<>
            <div>
                <AnimatePresence>
                    {
                        (!isVisible) ? <>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={sidebarVariants}
                                transition={{ duration: 1 }}
                                className={"header-mobile"}
                            >


                                <nav>
                                    <motion.ul className="ul-item oicon">
                                        {menuItems.map((item, index) => (
                                            <MenuItem
                                                key={index}
                                                item={item}
                                                index={index}
                                                page={page}
                                                navigate={navigate}
                                            />
                                        ))}
                                    </motion.ul>                                </nav>

                            </motion.div></> : <></>
                    }


                </AnimatePresence>
            </div>


        </>
    )
}

export default SideBar