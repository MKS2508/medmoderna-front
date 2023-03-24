import React, {useEffect, useState} from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { IProductProps } from "../../models/IProductProps";

interface IMenuItemProps {
    item: any;
    index: any;
    page: any;
    navigate: any;
}

const MenuItem: React.FC<IMenuItemProps> = ({ item, index, page, navigate, }) => {
    const controls = useAnimation();
    const tooltipId = `React-tooltip${index + 1}`;
    const [localActive, setLocalActive] = useState(!page.startsWith(item.path));

    useEffect(() => {
        setLocalActive(!page.startsWith(item.path));
    }, [page]);

    const handleHoverStart = () => {
        controls.start({
            scale: 1.5,
            padding: 30,
            color: "rgb(98,175,98)",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Color de fondo con transparencia
            borderRadius: "50%",
            zIndex: 100,
            translateX: "12vw",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para un efecto elevado
            border: "1px solid rgba(255, 255, 255, 0.2)", // Borde sutil
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
            WebkitBackdropFilter: "blur(10px)", // Filtro de desenfoque para navegadores basados en WebKit (Safari)
            backdropFilter: "blur(10px)", // Filtro de desenfoque para navegadores compatibles
        });
    };

    const handleHoverEnd = () => {
        controls.start({
            scale: 1,
            padding: 0,
            color: ((localActive) ? "#1F1E1EFF" : "#0a720a"),
            backgroundColor: "transparent", // Color de fondo transparente
            borderRadius: "0%",
            zIndex: "auto",
            translateX: "0px",
            width: "30px",
            height: "30px",
            boxShadow: "none", // Eliminar la sombra
            border: "none", // Eliminar el borde
            transition: {
                duration: 1,
                ease: "easeInOut",
            },
            WebkitBackdropFilter: "none", // Eliminar el filtro de desenfoque para navegadores basados en WebKit (Safari)
            backdropFilter: "none", // Eliminar el filtro de desenfoque para navegadores compatibles
        });
    };

    const handleHoverStartTooltip = () => {
        controls.start({
            opacity: 0,
            visibility: "visible",
        });
    };

    const handleHoverEndToolTip = () => {
        controls.start({
            opacity: 100,
        });
    };

    return (
        <motion.li
            key={index}
            onMouseEnter={handleHoverStart}
            onMouseLeave={handleHoverEnd}
            onClick={() => navigate(item.path)}
            className={page.startsWith(item.path) ? "itemActive" : ""}
            data-tip
            data-for={tooltipId}
        >
            <motion.div

                className="icon"
                initial={{
                    scale: 1,
                    color: ((localActive) ? "#1F1E1EFF" : "#0a720a"),
                    boxShadow: "0 0px 0px rgba(0, 0, 0, 0)",
                    borderRadius: "0%",
                    translateX: "0",
                    width: "30px",
                    height: "30px",
                }}
                animate={controls}
            >
                {item.icon}
                <Link to={item.path}>{item.title}</Link>
            </motion.div>
            <motion.div initial={
                {
                    translateX: 0
                }
            }
                        animate={
                            {
                                translateX: "clamp(5vw, 8vw, 20vw)"
                            }
                        }
                className={"toolTipGlass"}

            >
                {item.title}
            </motion.div>
        </motion.li>
    );
};

export default MenuItem;

