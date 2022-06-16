import './Products.css'
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";
import {getProductsFromCategoryID} from "../../services/api-products-service";
import spinner from "../../assets/spinner.svg"
import spinner2 from "../../assets/spinner3.svg"
import {AnimatePresence, motion} from 'framer-motion';
import ProductCard from "../../components/Product/ProductCard";


const Products = (props: IProductPageProps) => {
    const variants = {
        hidden: {
            opacity: 0
        },
        visible: ({delay = 1}) => ({
            opacity: 1,
            transition: {
                delay,
                duration: 2,
                staggerChildren: 4,
            }
        })
    }


    const ProductCards = (data: { products: IProductProps[] }) => {
        return <div className="wrapper-grid">

            {

                data.products.map((item, index) =>
                    <>
                    <AnimatePresence>
                        {/*<ProductCard key={item.name} imgSrc={item.imgSrc} description={item.description} productId={item.productId} name={item.name}/>*/}
                        { (!loading) ?


                                <motion.div custom={{delay: (index + 1) * 0.25}}
                                            initial='hidden'
                                            animate={variants.visible({delay: (index + 1) * 0.1})}
                                            variants={variants}
                                            key={item.name}


                                >
                                    <ProductCard key={item.name} imgSrc={item.imgSrc}
                                                  description={item.description}
                                                  productId={item.productId} name={item.name}/>
                                </motion.div>

                            : <></>}
                    </AnimatePresence>

                    </>
                )
            }

        </div>

    };

    const [products, setProducts] = useState<IProductProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setActivePage] = useState<number>(0);


    const getProducts = async (props: IProductPageProps, page: number) => {
        const exampleProducts: IProductProps[] = [
            {
                name: "WEDDING CAKE FLOR CBD GORILLA GRILLZ",
                description: "Para los más golosos, esta flor de CBD aporta una dulzura con toques terrosos que combinado nos recuerdan a los dulces naturales, como el cacao o la vainilla.",
                productId: 0,
                imgSrc: "https://www.gorillagrillz.com/wp-content/uploads/2021/02/WeddFF_1_FondoNUEVO-e1637581476626.jpg.webp"
            }, {
                name: "FORBIDDEN FRUIT FLOR CBD GORILLA GRILLZ",
                description: "Después de innumerables combinaciones, surgió esta variedad de CBD tan única. Y es que ha heredado un perfil de terpenos tan bueno que se consideró que debería estar prohibida. ¿Y tú, qué opinas?",
                productId: 0,
                imgSrc: "https://www.gorillagrillz.com/wp-content/uploads/2021/02/ForbFF_1_FondoNUEVO-e1637581649832.jpg.webp"
            }, {
                name: "Bandeja Donuts Raw",
                description: "Bandeja para liar en metal, con diseño de donuts para los mas golosos, original de la marca RAW",
                productId: 0,
                imgSrc: "https://www.greenhand.es/productos/imagenes/img_14896_2b7ecacb1fc930a822bdd989a312c114_20.png"
            }, {
                name: "Monster Bloom 130gr Grotek",
                description: "Monster Bloom es un PK en polvo de alta calidad fabricado por Grotek, una marca puntera en la fabricación de fertilizantes para el cultivo de cannabis.",
                productId: 0,
                imgSrc: "https://www.sativagrow.es/tienda/21959-large_default/monster-bloom-130gr-grotek.jpg"
            }, {
                name: "Librillo RAW Classic 1 1/4",
                description: "Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.\n" +
                    "            Medidas del papel de fumar: 110 x 45 mm.\n" +
                    "            Caja de 50 librillos con 32 papelillos de fumar por librillo.",
                productId: 0,
                imgSrc: "https://comerciovending.com/9-large_default/raw-slim.jpg"
            }, {
                name: "Librillo RAW Black 1 1/4",
                description: "Papel de fumar tamaño King Size Classic sin cloro fabricado fibras de mezcla de lino y arroz.\n" +
                    "            Medidas del papel de fumar: 110 x 45 mm.\n" +
                    "            Caja de 50 librillos con 32 papelillos de fumar por librillo.",
                productId: 0,
                imgSrc: "https://www.sativagrow.es/tienda/27751-large_default/papel-raw-1-14-black.jpg"
            }, {
                name: "https://www.sativagrow.es/tienda/26989-large_default/synergy-400gr-grotek.jpSynergy 400gr Grotek",
                description: "Synergy de Grotek es un concentrado de organismos beneficiosos a base de micorrizas. Además de mejorar las condiciones del suelo, mejora el desarrollo de las raíces y la capacidad para asimilar agua y nutrientes.",
                productId: 0,
                imgSrc: "https://www.sativagrow.es/tienda/26989-large_default/synergy-400gr-grotek.jpg"
            }];
        let props2 = {...props};

        if (props.pagination !== page) {
            props2.pagination = page
        }
        return await getProductsFromCategoryID(props2)


    };
    const initializePage = async (pageParam: number) => {
        //a este metodo se llama cada vez que renderizamos el componente por primera vez o al cambiar la pagina
        // llama al get products, con el id de categoria cogido de las props y el  num de pagina del estado
        // getProducts(props, pageParam)
        //si page es 0 (inicial) y props.pagination es null,
        setProducts(await getProducts(props, (pageParam === 0) ? 1 : pageParam));
    }

    useEffect(() => {
        setLoading(true);
        initializePage(page).then(() => setLoading(false))
    }, [page, props]);
    const showSpinner = (loading || products.length < 1);

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <div className="title">
                        <h1>CATALOGO DE {props.name}</h1>
                        <h2>{props.description}</h2>
                    </div>
                </motion.div>
            </AnimatePresence>

            {
                <>
                    <AnimatePresence>
                        <div className="center" hidden={!showSpinner}>
                            <img src={spinner2} className="filter-green" width="200vh" alt="spinner"/>
                        </div>
                    </AnimatePresence>
                    <ProductCards products={products}/>

                </>
            }

        </>
    );

}

export default Products;