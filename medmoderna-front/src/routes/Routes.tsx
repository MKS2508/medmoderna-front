import {Route, RouteProps, Routes, useLocation, useParams} from "react-router-dom";
import Products from "../pages/Products/Products";
import ProductDetail from "../pages/ProductDetail/ProductDetail";

import React from "react";
import Home from "../pages/Home/Home";
import {AnimatePresence} from "framer-motion";
import ProductDashboard from "../pages/ProductDashboard/ProductDashboard";

const productRoutesProps: RouteProps[] = [
    //abstaer name, description, id a constantes ?
    {path: "/CBD", element: <Products name={"CBD"} id={1} description={"Aqui puedes encontrar lo relacionado con el CBD. Flores, extractos..."} elementsSize={10} pagination={0}/>},//coger estos dos valores de parametros en la url. tambien coger name
    {path: "/PARAFERNALIA", element: <Products name={"PARAFERNALIA"} id={2} description={"Aqui puedes encontrar lo relacionado con papeles, mecheros, grinders..."} elementsSize={10} pagination={0} />},
    {path: "/ILUMINACION", element: <Products name={"ILUMINACION"} id={3} description={"Aqui puedes encontrar lo relacionado con iluminacion para tu cultivo..."}  elementsSize={10} pagination={0}/>},
    {path: "/CULTIVO", element: <Products name={"CULTIVO"} id={4} description={"Aqui puedes encontrar lo relacionado con productos para tu cultivo"}  elementsSize={10} pagination={0}/> },
    {path: "/MARCAS", element: <Products name={"MARCAS"} id={5} description={"Todas nuestras marcas"}  elementsSize={10} pagination={0}/>},
    {path: "/MARCAS/:brand", element: <Products name={":brand"} id={5} description={"Todas los productos de :brand"}  elementsSize={10} pagination={0}/>},
    {path: "/SEARCH/:query", element: <Products name={":query"} id={5} description={"Todas los productos de :brand"}  elementsSize={10} pagination={0}/>},
    {path: "/ADMIN", element: <ProductDashboard name={":id"} id={88} description={":id"}  elementsSize={10} pagination={0} productId={""}/>},
    {path: "/edit/:id", element: <ProductDashboard name={":id"} id={88} description={":id"}  elementsSize={10} pagination={0} productId={""}/>},
    {path: "/product/:id", element: <ProductDetail name={":id"} id={5} description={":id"}  elementsSize={10} pagination={0} productId={""}/>},
    {path: "/ROPA", element: <Products name={"ROPA"} id={6} elementsSize={10} pagination={0} description={"Toda nuestra ropa"}/> },
]
const pageRoutesProps: RouteProps[] = [
    {path: "/", element: <Home/>},
];


const renderProductRoute = (productRoutes: RouteProps[]): React.ReactElement[] =>{

    return productRoutes.map((route) => <Route path={route.path} element={route.element}/>)

}

const renderPageRoute = (pageRoutes: RouteProps[]): React.ReactElement[] => pageRoutes.map((route) => <Route
    path={route.path} element={route.element}/>)


const pageRoutes = renderPageRoute(pageRoutesProps);
const productRoutes = renderProductRoute(productRoutesProps);
const allRoutesItems =  [pageRoutes, productRoutes];


const RoutesWrap = () => {const location = useLocation(); return <Routes location={location} key={location.pathname}>{allRoutesItems}</Routes>;};

const AnimatedRoutes = () => <RoutesWrap/>;

export default AnimatedRoutes;



