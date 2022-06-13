import './Products.css'
import React, {useEffect, useState} from "react";
import {IProductPageProps} from "../../models/IProductPageProps";
import {IProductProps} from "../../models/IProductProps";

const Products = (props: IProductPageProps) => {
    const [products, setProducts] = useState<IProductProps[]>([]);
    const [page, setActivePage] = useState<number>(0);
    //recibe el id de categoria y el numero de la pagina y obtiene los elementos asociados
    const getProducts = (categoryID: number, page:number) => {
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
        //obtener de capa de servicios y devolver
        return exampleProducts;
    };
    const initializePage = (pageParam:number) => {
        //a este metodo se llama cada vez que renderizamos el componente por primera vez o al cambiar la pagina
        // llama al get products, con el id de categoria cogido de las props y el  num de pagina del estado
        setProducts(getProducts(props.id, pageParam));
    }

    useEffect(() => {
        initializePage(page);
    }, [page]);

    return (<>
        <div className="center">
            <div className="title">
                <h1>CATALOGO DE {props.name}</h1>
                <h2>{props.description}</h2>
            </div>


            <div className="wrapper-grid">
                {
                    products.map((item) =>
                        <div key={item.name} className="container">
                            <div className='banner-img'></div>
                            <img
                                src={item.imgSrc}
                                alt='profile image' className="profile-img"/>
                            <p className="name">{item.name}</p>
                            <p className="description">{item.description}</p>
                            <button className='btn' onClick={() => {
                                console.log({item})
                            }}> ❤
                            </button>
                        </div>)
                }
            </div>
        </div>

    </>);

}

export default Products