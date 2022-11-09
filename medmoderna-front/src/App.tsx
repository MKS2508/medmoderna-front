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


function App() {
    const [isVisible, setIsVisible] = useState(true);
    const listenToScroll = () => {
        let heightToHideFrom = 200;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;

        if (winScroll > heightToHideFrom) {
            isVisible &&      // to limit setting state only the first time
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    useEffect(() => {
        if (window.location.pathname != "/") {
        }
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);

    }, [])

    return (
        <>
            <Router>
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
