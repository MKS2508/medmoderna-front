import React, {useEffect, useState} from 'react'
import {IoIosShirt} from 'react-icons/io'
import {useLocation, useNavigate} from 'react-router-dom'
import './SideBar.css'
import 'font-awesome/css/font-awesome.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import {config} from "@fortawesome/fontawesome-svg-core";
import {FaBong, FaCannabis, FaJoint} from "react-icons/fa";
import {RiPlantFill} from "react-icons/ri";
import {GiLightBulb} from "react-icons/gi";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {AiOutlinePlusCircle} from "react-icons/all";
import MenuItem from "./MenuItem";

const SideBar = () => {

    config.autoAddCss = true; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [isVisible, setIsVisible] = useState(true);
    const [pageState, setPageState] = useState("");

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
    useEffect(() => {
        setPageState(page);
    }, [page]);


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
            <>
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

                                <nav className="sideBarNavigation" onClick={() =>{ page =  getCurrentPage();}}>
                                    <motion.ul className="ul-item" onClick={() =>{ page =  getCurrentPage();}} onMouseEnter={() =>{ page =  getCurrentPage();}}>
                                        {menuItems.map((item, index) => (

                                            <MenuItem

                                                key={index}
                                                item={item}
                                                index={index}
                                                page={pageState}
                                                navigate={navigate}
                                            />
                                        ))}
                                    </motion.ul>
                                </nav>

                            </motion.div></> : <></>
                    }


                </AnimatePresence>
            </>


        </>
    )
}

export default SideBar