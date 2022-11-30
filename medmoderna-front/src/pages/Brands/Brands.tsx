import './Brands.css'
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IBrandProps} from "../../models/IBrandProps";
import {AnimatePresence, motion} from 'framer-motion';
import {useParams} from "react-router-dom";
import AnimatedPage from "../../components/AnimatedPage/AnimatedPage";
import BrandCard from "../../components/Product/BrandCard";


const Brands = (props: IProductPageProps) => {
    let params = useParams();
    let brand = params.brand;
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


    const BrandCards = (data: { brands: IBrandProps[] }) => {
        return (
            <>
                <div className="wrapper-grid" key="wrapper">

                    {

                        data.brands.map((item, index) =>
                            <>
                                    {/*<ProductCard key={item.name} imgSrc={item.imgSrc} description={item.description} productId={item.productId} name={item.name}/>*/}
                                    {


                                        <div
                                            key={item.name}
                                        >

                                            <BrandCard key={index} imgSrc={item.imgSrc}
                                                       description={item.description}
                                                       link={"/marcas/" + item.name} name={item.name}/>
                                        </div>

                                        }

                            </>
                        )
                    }

                </div>
            </>)

    };

    const [brands, setBrands] = useState<IBrandProps[]>([]);
    const [page, setActivePage] = useState<number>(0);



    const initializePage = async (pageParam: number) => {
        //a este metodo se llama cada vez que renderizamos el componente por primera vez o al cambiar la pagina
        // llama al get products, con el id de categoria cogido de las props y el  num de pagina del estado
        // getProducts(props, pageParam)
        //si page es 0 (inicial) y props.pagination es null,
        const BRANDS: IBrandProps[] = [
            {
                name: "RAW",
                imgSrc: "https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png",
            },
            {
                name: "GROTEK",
                imgSrc: "https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png",
            },
            {
                name: "MEDICINA MODERNA",
                imgSrc: "https://i.ibb.co/x8NJ89x/banner.png",
            },
            {
                name: "GORILLA GRILLZ",
                imgSrc: "https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png",
            },
            {
                name: "SQUADAFUM",
                imgSrc: "https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png",
            },
            {
                name: "RIPPER SEEDS",
                imgSrc: "https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png",
            },
        ]


        setBrands(BRANDS)


    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        initializePage(page)
    }, [page, props]);

    return (
        <AnimatedPage>
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


                    <section className="normalSection">
                        <BrandCards brands={brands}/>
                    </section>


                </>
            }

        </AnimatedPage>
    );

}

export default Brands;