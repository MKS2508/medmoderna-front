import React from "react";
import "./SeccionCategorias.css";
import { FaCannabis, FaTshirt, FaCapsules, FaHandHoldingWater, FaLightbulb } from "react-icons/fa";
import CategoryCard from "../CategoryCard/CategoryCard";

interface ISeccionCategoriasProps {
    title: string;
    videoSrc: string;
}

const SeccionCategorias: React.FC<ISeccionCategoriasProps> = ({ title, videoSrc }) => {
    return (
        <section className="seccion-categorias">
            <section>
                <div className="categorias-title">
                    <h1>{title}</h1>
                </div>
            </section>
            <div className="bgimg-categories">
                <div className="video-container2">
                    <video className="videoAbajo" autoPlay muted loop playsInline>
                        <source type="video/mp4" src={videoSrc} />
                    </video>
                </div>
            </div>
            <div className="categorias-container">
                <CategoryCard name="PARAFERNALIA" link="/parafernalia" Icon={FaCannabis} />
                <CategoryCard name="ROPA" link="/ropa" Icon={FaTshirt} />
                <CategoryCard name="CBD" link="/cbd" Icon={FaCapsules} />
            </div>
            <div className="categorias-spacer">
                <CategoryCard name="CULTIVO" link="/cultivo" Icon={FaHandHoldingWater} />
                <CategoryCard name="ILUMINACION" link="/iluminacion" Icon={FaLightbulb} />
            </div>
        </section>
    );
};

export default SeccionCategorias;
