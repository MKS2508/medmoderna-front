import React, { useEffect, useState } from "react";
import "./SeccionProductosDestacados.css";
import ProductSwitcher from "../Product/ProductSwitcher/ProductSwitcher";

interface IProductSwitcherProps {
    homeProds: any[]; // Reemplaza 'any' con el tipo adecuado para tus productos
    title: string;
    videoSrc: string;
}

const SeccionProductosDestacados: React.FC<IProductSwitcherProps> = ({ homeProds, videoSrc, title }) => {
    const [displayedProducts, setDisplayedProducts] = useState(homeProds);

    const updateDisplayedProducts = () => {
        if (window.innerWidth <= 768) {
            setDisplayedProducts(homeProds.slice(0, 2));
        } else {
            setDisplayedProducts(homeProds);
        }
    };

    useEffect(() => {
        updateDisplayedProducts();
        window.addEventListener("resize", updateDisplayedProducts);

        return () => {
            window.removeEventListener("resize", updateDisplayedProducts);
        };
    }, [homeProds]);

    return (
        <section id={"seccionProductosDestacados"}>
            <section>
                <div className="productos-destacados-title">
                    <h1>{title}</h1>
                </div>
            </section>

            <section>
                <div className="bgimg-productsSection">
                    <div className="video-container-background-products">
                        <video autoPlay muted loop playsInline>
                            <source
                                type="video/mp4"
                                src={videoSrc}
                            />
                        </video>
                    </div>
                </div>

                <div className="productos-destacados-spacer"></div>
                <div className="switcher-container"></div>
                <ProductSwitcher homeProds={displayedProducts}></ProductSwitcher>
            </section>
        </section>
    );
};

export default SeccionProductosDestacados;
