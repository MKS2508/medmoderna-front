import React, {useEffect, useState} from 'react'

import {Link, useNavigate} from 'react-router-dom'
import './TopBar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import 'font-awesome/css/font-awesome.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
// @ts-ignore
import ScrollText from 'react-scroll-text'

import {config} from "@fortawesome/fontawesome-svg-core";
import {ReactSVG} from 'react-svg'
import {FaCannabis, FaBong, FaJoint, FaFacebookSquare} from "react-icons/fa";
import {RiPlantFill, RiInstagramFill, RiWhatsappFill, RiShoppingCart2Fill, RiUser2Fill} from "react-icons/ri";
import {GiLightBulb} from "react-icons/gi";

import logo from '../../assets/logo4.png'

import banner from "../../assets/banner.png";
import ReactWhatsapp from "react-whatsapp";
import {AnimatePresence, motion} from "framer-motion";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromQuery, postProduct} from "../../services/api-products-service";
import {ReactSearchAutocomplete} from 'react-search-autocomplete'
import ProductCard from "../Product/ProductCard";
import ProductCardList from "../Product/ProductCardList";

const TopBar = () => {
    let navigate = useNavigate();

    config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<IProductProps[]>([]);
    const [placeholderStr, setPlaceholderStr] = useState<string>("Encuentra lo que buscas");
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
        const interval = setInterval(() => {
            //debugger;
            let actualPlaceholder = placeholderStr
            actualPlaceholder = actualPlaceholder + ".";
            if (actualPlaceholder == "Encuentra lo que buscas....") {
                setPlaceholderStr("Encuentra lo que buscas");
            } else {
                setPlaceholderStr(actualPlaceholder);
            }
        }, 400);
        return () => clearInterval(interval);
    }, [placeholderStr]);

    useEffect(() => {


        if (items.length < 1) {
            let searchedProducts: IProductProps[] = [];
            getProductsFromQuery(" ").then((result) => {
                searchedProducts = result;
                setItems(searchedProducts);
            })
        }
        if (window.location.pathname != "/") {
            setIsVisible(false)
        }

        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);

    }, [])

    const handleOnSearch = async (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        setSearchQuery(string);

        if (string.length > 3) {
            const searchedProducts = await getProductsFromQuery(string);
            setItems(searchedProducts)
            console.log({searchedProducts})
        }

    }

    const handleOnHover = (result: any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item: any) => {
        // the item selected
        window.location.href = `/product/${item.productId}`
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{display: 'block', textAlign: 'left'}}>
                <ProductCardList key={item.name} imgSrc={item.imgSrc}
                                 description={item.description} price={item.price}
                                 productId={item.productId} name={item.name} brand={item.brand}
                                 category={item.category}/></span>

            </>
        )
    }


    return (<>

            <AnimatePresence>

                <div key={"searchBarWrap"}
                     className={"searchBar"}>
                    <ReactSearchAutocomplete
                        key={"searchBar"}
                        items={items}
                        styling={{
                            backgroundColor: "rgba(31,30,30,0.79)",
                            border: "none",
                            placeholderColor: "#e0e2e3",
                            color: "white",
                            hoverBackgroundColor: "#1F1E1E"
                        }}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder={placeholderStr}
                    />
                </div>
                {(!isVisible) ?
                    <>
                        <motion.div initial={{opacity: 0}}
                                    key={"miniHeader"}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.6}}
                                    className="miniHeader">

                                <h3 key={"text"}>
                                    <a href={""} style={{color: "inherit"}}>
                                        Puedes encontrarnos en Avenida de Mendavia, Nº16 Pabellón 2, 26009 Logroño, La
                                        Rioja
                                    </a>
                                </h3>
                        </motion.div>
                        <motion.div initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    key={"tpbar"}
                                    transition={{duration: 1}}
                                    className={active ? 'topBar' : 'topBar-mobile'}>

                        </motion.div>
                    </> : <></>

                }
                {
                    (true) ? <div key={"logoBanner"} className="logoBanner" onClick={() => {
                        navigate("/");
                        setIsVisible(false);
                        window.scroll(0, 0)
                    }}>
                        <img alt="logo" src={logo}/>
                    </div> : <></>
                }

                <div key={"topbarIcons"} className="topbarIcons">
                    <div className="topbarIcon2">
                        <RiUser2Fill size={46} className='iconRRSS'/>
                    </div>
                    <div className="topbarIcon">
                        <RiShoppingCart2Fill size={46} className='iconRRSS'/>
                    </div>
                    <div className="instaIcon">
                        <a href="https://www.instagram.com/medicinamoderna_growshop/?hl=es">
                            <RiInstagramFill size={50} className='iconRRSS'/>
                        </a>
                    </div>
                    <div className="faceIcon">
                        <a href="https://www.facebook.com/Medicina-Moderna-Growshop-110763457854490/">
                            <FaFacebookSquare size={46} className='iconRRSS'/>
                        </a>
                    </div>
                </div>

            </AnimatePresence>


        </>
    )
}

export default TopBar