import {Route, RouteProps} from "react-router-dom";
import Products from "../pages/Products/Products";
import React from "react";
import Home from "../pages/Home/Home";

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


const renderProductRoutes = (productRoutes: RouteProps[]): React.ReactElement[] => productRoutes.map((route) => <Route
    path={route.path} element={route.element}/>)
const renderPageRoutes = (pageRoutes: RouteProps[]): React.ReactElement[] => pageRoutes.map((route) => <Route
    path={route.path} element={route.element}/>)



const pageRoutes = renderPageRoutes(pageRoutesProps);
const productRoutes = renderProductRoutes(productRoutesProps);




const routes =  [pageRoutes, productRoutes];
export default routes;