import {Route, RouteProps, Routes, useLocation} from "react-router-dom";
import Products from "../pages/Products/Products";
import React from "react";
import Home from "../pages/Home/Home";
import {AnimatePresence} from "framer-motion";

const productRoutesProps: RouteProps[] = [
    //abstaer name, description, id a constantes ?
    {path: "CBD", element: <Products name={"CBD"} id={1} description={"Aqui puedes encontrar lo relacionado con el CBD. Flores, extractos..."} elementsSize={10} pagination={1}/>},//coger estos dos valores de parametros en la url. tambien coger name
    {path: "PARAFERNALIA", element: <Products name={"PARAFERNALIA"} id={2} description={"Aqui puedes encontrar lo relacionado con papeles, mecheros, grinders..."}/>},
    {path: "ILUMINACION", element: <Products name={"ILUMINACION"} id={3} description={"Aqui puedes encontrar lo relacionado con iluminacion para tu cultivo..."}/>},
    {path: "CULTIVO", element: <Products name={"CULTIVO"} id={4} description={"Aqui puedes encontrar lo relacionado con productos para tu cultivo"}/>},
    {path: "MARCAS", element: <Products name={"MARCAS"} id={5} description={"Todas nuestras marcas"}/>},
    {path: "ROPA", element: <Products name={"ROPA"} id={6} description={"Toda nuestra ropa"}/>},
]
const pageRoutesProps: RouteProps[] = [
    {path: "/", element: <Home/>},
];


const renderProductRoute = (productRoutes: RouteProps[]): React.ReactElement[] => productRoutes.map((route) => <Route
    path={route.path} element={route.element}/>)
const renderPageRoute = (pageRoutes: RouteProps[]): React.ReactElement[] => pageRoutes.map((route) => <Route
    path={route.path} element={route.element}/>)


const pageRoutes = renderPageRoute(pageRoutesProps);
const productRoutes = renderProductRoute(productRoutesProps);
const allRoutesItems =  [pageRoutes, productRoutes];


const RoutesWrap = () => {const location = useLocation(); return <Routes location={location} key={location.pathname}>{allRoutesItems}</Routes>;};

const AnimatedRoutes = () => <AnimatePresence><RoutesWrap/></AnimatePresence>;

export default AnimatedRoutes;



