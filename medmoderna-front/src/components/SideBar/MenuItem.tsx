import React from 'react';
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {IProductProps} from "../../models/IProductProps";

const itemVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" },
};
interface IMenuItemProps  {
    item: any;
    index: any;
    page: any;
    navigate:any;
}
const MenuItem: React.FC<IMenuItemProps> = ({ item, index, page, navigate }) => {
    const controls = useAnimation();
    const tooltipId = `React-tooltip${index + 1}`;

    return (
        <motion.li
            key={index}
            onMouseEnter={() => controls.start("hover")}
            onMouseLeave={() => controls.start("rest")}
            onClick={() => navigate(item.path)}
            className={page.startsWith(item.path) ? "itemActive" : ""}
            data-tip
            data-for={tooltipId}
        >
            <motion.div
                className={
                    page.startsWith(item.path) ? "iconActive" : "icon"
                }
                variants={itemVariants}
                animate={controls}
            >
                {item.icon}
            </motion.div>
            <Link to={item.path}>{item.title}</Link>
            <ReactTooltip
                data-id={tooltipId}
                id={tooltipId}
                place="right"
                effect="solid"
                border={true}
                borderClass={"tooltipBorder"}
                backgroundColor={"#008F28"}
                textColor={"#ffffff"}
                borderColor={"#10131f"}
            >
                {item.title}
            </ReactTooltip>
        </motion.li>
    );
};

export default MenuItem;
