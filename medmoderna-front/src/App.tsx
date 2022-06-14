import './App.css';
import {BrowserRouter as Router, Routes, Route, RouteProps} from 'react-router-dom';
import Home from './pages/Home/Home';
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";
import React from "react";
import 'antd/dist/antd.min.css';
import {Col, Row} from "antd";
import Products from "./pages/Products/Products"; // or 'antd/dist/antd.less'
import routes from"./routes/Routes"


function App() {
    return (
        <>
            <Router>
                <TopBar/>
                <SideBar/>

                <Routes>
                    {routes}
                </Routes>


            </Router>


        </>
    );
}

export default App;
