import './App.css';
import {BrowserRouter as Router, Routes, Route, RouteProps} from 'react-router-dom';
import Home from './pages/Home/Home';
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import React, {useEffect, useState} from "react";
import 'antd/dist/antd.min.css';
import {Col, Row} from "antd";
import Products from "./pages/Products/Products"; // or 'antd/dist/antd.less'
import routes from"./routes/Routes"
import AnimatedRoutes from "./routes/Routes";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {getProductsFromQuery} from "./services/api-products-service";
import ProductCardList from "./components/Product/ProductCardList";
import {IProductProps} from "./models/IProductProps";


function App() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [active, setActive] = useState(true);
    const [items, setItems] = useState<IProductProps[]>([]);

    const [isVisible, setIsVisible] = useState(true);
    const listenToScroll = () => {
        let heightToHideFrom = 30;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            isVisible &&      // to limit setting state only the first time
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        if (window.location.pathname != "/") {
            setIsVisible(false)
        }
    };

    const handleOnSearch = async (string: any, results: any) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
        setSearchQuery(string);

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
        window.location.href = `/product/${item.productId}`
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



    useEffect(() => {
        if (items.length < 1) {
            let searchedProducts: IProductProps[] = [];
            getProductsFromQuery(" ").then((result) => {
                searchedProducts = result;
                setItems(searchedProducts);
            })}
        if (window.location.pathname != "/") {
            setIsVisible(false)
        }

        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);

    }, [])
    if (searchQuery.length > 0 && isVisible) {
        setIsVisible(false)
    }

    return (
        <>
            <Router>
                <div className={"searchBar"}>
                    <ReactSearchAutocomplete
                        items={items}
                        styling={{backgroundColor:"rgba(31,30,30,0.79)", border: "none", placeholderColor: "#bdbfc4", color:"white", hoverBackgroundColor:"#1F1E1E"}}
                        onSearch={handleOnSearch}
                        onHover={handleOnHover}
                        onSelect={handleOnSelect}
                        onFocus={handleOnFocus}
                        autoFocus
                        formatResult={formatResult}
                        placeholder={"Encuentra lo que buscas..."}
                    />
                </div>
                {


                    (!isVisible) ?
                        <>


                            <TopBar/>
                            <SideBar/>
                        </>
                    : <></>
                }

                <AnimatedRoutes/>
            </Router>


        </>
    );
}

export default App;
