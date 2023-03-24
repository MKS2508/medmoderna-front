import React from "react";
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

const MenuItem: React.FC<IMenuItemProps> = ({ item, index, page, navigate }) => {
    const controls = useAnimation();
    const tooltipId = `React-tooltip${index + 1}`;

    const handleHoverStart = () => {
        controls.start({
            scale: 2,
            color: "rgb(98,175,98)",
            borderRadius: "120%",
            zIndex: 100,
            translateX: "10vw",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },

        });
    };

    const handleHoverEnd = () => {
        controls.start({
            scale: 1,
            color: "#1F1E1EFF",
            borderRadius: "0%",
            zIndex: "auto",
            translateX: "0px",
            width: "30px",
            height: "30px",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },

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

                className={page.startsWith(item.path) ? "iconActive" : "icon"}
                initial={{
                    scale: 1,
                    color: "#1F1E1EFF",
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
            <motion.div
                className={"toolTipGlass"}
             
            >
                {item.title}
            </motion.div>
        </motion.li>
    );
};

export default MenuItem;

