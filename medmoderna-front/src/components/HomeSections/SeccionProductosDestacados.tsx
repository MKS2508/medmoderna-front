import React, {useEffect, useState} from "react";
import "./SeccionProductosDestacados.css";
import SeccionResponsiveVideoBackground from "./SeccionResponsiveVideoBackground";
import ProductCardNew from "../Product/ProductCardNew/ProductCardNew";
import {CATEGORIES} from "../../WebParameters";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromCategory} from "../../services/api-products-service";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import { motion } from "framer-motion";

interface IProductSwitcherProps {
    homeProds: IProductProps[];
    title: string;
    height: string;
    videoSrc: string;
    isVideoFetched: (fetched: boolean) => void;
    mobileStack: boolean;
    hasVideo?: boolean
}

const SeccionProductosDestacados: React.FC<IProductSwitcherProps> = ({
                                                                         homeProds,
                                                                         videoSrc,
                                                                         title,
                                                                         isVideoFetched,
                                                                         height,
                                                                         mobileStack,hasVideo
                                                                     }) => {
    const [displayedProducts, setDisplayedProducts] = useState(homeProds);
    const [categoryIndex, setCategoryIndex] = useState(0);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getProductsFromCategory({
                    id: 0,
                    name: CATEGORIES[categoryIndex].name,
                    elementsSize: 5
                });
                setDisplayedProducts(result.products);
            } catch (error) {
                console.error("Error al obtener productos por categoría:", error);
            }
        };

        fetchProducts();
    }, [categoryIndex]);

    const handleNextCategory = () => {
        setCategoryIndex((prevIndex) => (prevIndex + 1) % CATEGORIES.length);
    };

    const handlePrevCategory = () => {
        setCategoryIndex((prevIndex) => (prevIndex - 1 + CATEGORIES.length) % CATEGORIES.length);
    };

    function useWindowSize() {
        const [windowSize, setWindowSize] = useState({
            width: 0,
            height: 0,
        });

        useEffect(() => {
            function handleResize() {
                // @ts-ignore
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }

            window.addEventListener("resize", handleResize);
            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return windowSize;
    }


    const windowSize = useWindowSize();

    // ...

    const getVisibleProducts = () => {
        if (windowSize.width <= 768) {
            return displayedProducts.slice(0, 1);
        } else {
            return displayedProducts;
        }
    };
    return (
        <section id={"seccionProductosDestacados"}>
            <SeccionResponsiveVideoBackground
                responsive={false}
                useAutoHeightContent={false}
                hasVideo={hasVideo}
                videoSrc={videoSrc}
                title={
                    <div>
                        <h1>{title}</h1>
                        <span className="category-switcher">

                        <motion.h2
                            className="animated-category-name"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            key={categoryIndex}
                        >
                        {CATEGORIES[categoryIndex].name}
                        </motion.h2>
                    <button className="switcher-button" onClick={handlePrevCategory}>
                        <FaChevronLeft/>
                    </button>
                    <button className="switcher-button" onClick={handleNextCategory}>
                        <FaChevronRight/>
                    </button>
                        </span>
                    </div>

                }
                mobileStack={mobileStack}
                isVideoFetched={isVideoFetched}
                height={(window.innerWidth >= 768) ? height : "95vh"}
            >
                {getVisibleProducts().map((item, index) => (
                    <>
                        <ProductCardNew
                            blur={"12px"}
                            key={item.name + Math.floor(Math.random() * 10001).toString()}
                            index={index} // Añade el índice aquí
                            imgSrc={item.imgSrc}
                            description={item.description}
                            mobileVersion={false}
                            price={item.price}
                            productId={item.productId}
                            name={item.name}
                            brand={item.brand}
                            category={item.category}
                            maxLines={1}
                            maxCharsPerLine={70}
                        />
                    </>
                ))}
            </SeccionResponsiveVideoBackground>
        </section>
    );
};

export default SeccionProductosDestacados;
