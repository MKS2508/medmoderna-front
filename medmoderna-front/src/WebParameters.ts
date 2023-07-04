import {FaBong, FaCannabis, FaCapsules, FaHandHoldingWater, FaJoint, FaLightbulb, FaTshirt} from "react-icons/fa";

export const FACEBOOK_LINK_1= "https://www.facebook.com/110763457854490/photos/a.129307232666779/347631650834335/?type=3&theater";
export const FACEBOOK_LINK_2= "https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2F110763457854490%2Fphotos%2Fa.129307232666779%2F347631650834335%2F%3Ftype%3D3%26theater&width=500&show_text=true&height=680&appId";

export const INSTAGRAM_LINK_1= "https://www.instagram.com/p/Ckqxnp9DKZx/embed";
export const INSTAGRAM_LINK_2= "https://www.instagram.com/p/COi_Ep9nW2A/embed";
export const INSTAGRAM_LINK_3= "https://www.instagram.com/p/COi_Ep9nW2A/embed";
export const INSTAGRAM_LINK_4= "https://www.instagram.com/p/COi_Ep9nW2A/embed";

export const VIDEO_LINK_1= "https://medmoderna.b-cdn.net/videohome3.mp4";
export const VIDEO_POSTER_1= posterGifVideo1;
export const VIDEO_LINK_2= "https://medmoderna.b-cdn.net/videohome3.mp4";
export const VIDEO_LINK_3= "https://medmoderna.b-cdn.net/videohome3.mp4";
export const VIDEO_LINK_4= "https://medmoderna.b-cdn.net/videohome3.mp4";

import fondo from './assets/fondo1.png'
import posterGifVideo1 from './assets/gif-poster-video-1.gif'
import fondo3 from './assets/fondo3.png'
import fondo2 from './assets/fondo2.png'
import {RiPlantFill} from "react-icons/ri";
import {GiLightBulb} from "react-icons/gi";
import {IoIosShirt} from "react-icons/io";
import {AiOutlinePlusCircle} from "react-icons/ai";
import React from "react";

export const LOGO_CARRUSEL= "https://raw.githubusercontent.com/MKS2508/medmoderna-front/master/medmoderna-front/src/assets/logo3.png";
export const IMAGEN_CARRUSEL_1 = fondo;
export const IMAGEN_CARRUSEL_2 = fondo2;
export const IMAGEN_CARRUSEL_3 = fondo3;

export const TEXTO_DESCRIPTIVO= "En Medicina Moderna Grow Shop encontrarás una amplia selección de productos para la cultura y el crecimiento de plantas, así como todas las herramientas que necesitas.";

export const CATEGORIES = [
    { name: "CBD", link: "/cbd", icon: FaCapsules },
    { name: "PARAFERNALIA", link: "/parafernalia", icon: FaCannabis },
    { name: "ROPA", link: "/ropa", icon: FaTshirt },
    { name: "CULTIVO", link: "/cultivo", icon: FaHandHoldingWater },
    { name: "ILUMINACION", link: "/iluminacion", icon: FaLightbulb },
];

export const menuItems = [
    {
        title: 'CULTIVO',
        path: '/CULTIVO',
        icon: RiPlantFill ,
    },
    {
        title: 'ILUMINACION',
        path: '/ILUMINACION',
        icon: GiLightBulb,
    },
    {
        title: 'CBD',
        path: '/CBD',
        icon: FaCannabis ,
    },
    {
        title: 'MARCAS',
        path: '/MARCAS',
        icon: FaBong ,
    },
    {
        title: 'PARAFERNALIA',
        path: '/PARAFERNALIA',
        icon: FaJoint,
    },
    {
        title: 'ROPA',
        path: '/ROPA',
        icon: IoIosShirt,
    },
    {
        title: 'ADMIN',
        path: '/ADMIN',
        icon: AiOutlinePlusCircle,
    },
];

export const BRANDS = [
    {
        name: "CANNA",
        imgSrc: "http://akjacks.com/images/sale/Canna/Canna-logo.png",
    },
    {
        name: "MEDICINA MODERNA",
        imgSrc: "https://i.ibb.co/x8NJ89x/banner.png",
    },
    {
        name: "GROW THE JUNGLE",
        imgSrc: "https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png",
    },
    {
        name: "RAW",
        imgSrc: "https://hbiinternational.com/wp-content/uploads/2019/07/RAW-Rolling-Papers-Logo-1332px.png",
    },
    {
        name: "GORILLA GRILLZ",
        imgSrc: "https://http2.mlstatic.com/storage/mshops-appearance-api/images/49/75651549/logo-2021090312474054700.png",
    },
    {
        name: "GROTEK",
        imgSrc: "https://www.led-grower.eu/user/categories/orig/grotek-logo.png",
    },
];

export const SECCION_HOME_TEXTO_MARCAS = "ALGUNAS DE NUESTRAS MARCAS";
export const SECCION_HOME_TEXTO_CATEGORIAS = "NUESTRAS CATEGORÍAS";
export const SECCION_HOME_TEXTO_PRODUCTOS_DESTACADOS = "PRODUCTOS DESTACADOS POR CATEGORIA";
export const SECCION_HOME_TEXTO_FACEBOOK = "NUESTRO FACEBOOK";
export const SECCION_HOME_TEXTO_INSTAGRAM = "NUESTRO Instagram";
export const SECCION_HOME_TEXTO_MAPA = "";

//responsive
const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}
export const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
};