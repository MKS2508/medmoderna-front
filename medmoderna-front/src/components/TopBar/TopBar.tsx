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


    useEffect(() => {
        if (items.length < 1) {
            let searchedProducts: IProductProps[] = [];
            getProductsFromQuery(" ").then((result) => {
                searchedProducts = result;
                setItems(searchedProducts);
            })
        }


    }, [])

    const handleOnSearch = async (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
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
        console.log(item)
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: any) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>
                <ProductCardList key={item.name} imgSrc={item.imgSrc}
                                 description={item.description} price={item.price}
                                 productId={item.productId} name={item.name} brand={item.brand} category={item.category}/></span>

            </>
        )
    }


    const handleChangeSearch = (event: any) => {
        setSearchQuery(event.target.value);
    }

    return (<>
            <AnimatePresence>
                <motion.div initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 1}}
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
                            transition={{duration: 1.4}}
                            className={active ? 'topBar' : 'topBar-mobile'}>


                    <div style={{borderRadius: "10px"}}>
                        <form>
                            <div className={"container"}>
                                <ReactSearchAutocomplete
                                    items={items}
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    autoFocus
                                    formatResult={formatResult}
                                    placeholder={"Encuentra lo que buscas..."}
                                />
                                {/*<input className={"searchBar"} placeholder={"Buscar.."} type="text" value={searchQuery}
                                       onChange={(event) => handleChangeSearch(event)}/>*/}
                            </div>
                        </form>
                    </div>
                    <div className="topbarIcons">

                    </div>

                </motion.div>
            </AnimatePresence>

        </>
    )
}

export default TopBar