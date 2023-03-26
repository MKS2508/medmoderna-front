import React, {useEffect, useState} from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import styled from 'styled-components';


interface IMenuItemProps {
    item: any;
    index: any;
    page: any;
    navigate: any;
}
const NavIcon = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
   svg {
    width: clamp(10px, 6vw, 30px);
    height: clamp(10px, 6vw, 30px);
  }
`;


const NavTooltipContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;

  a {
    display: none;
  }
`;

// ...

const ToolTipGlass = styled(motion.div)`
  display: none;
  position: relative;
  top: 0;
  transform: translateX(10px);
  width: auto;
  height: auto;
  max-width: 25px;
  transition: all 0.3s ease-in-out, opacity 0.3s ease-in-out;

  h3 {
    padding: 8px 12px;
    backdrop-filter: blur(2px);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: rgba(16, 19, 31, 0.81);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #f8fffe;
    font-weight: 500;
    font-size: 28px;
    line-height: 20px;
    transition: all 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  &:after {
    display: none;
    content: '';
    position: relative;
  }
`;

const MotionListItem = styled(motion.li)`

  &:hover ${NavIcon} svg {
    position: absolute;
    top: 15px;
    left: 15px;
  }

  &:hover ${ToolTipGlass} {
    display: flex;
    position: relative;
    transform: translateX(clamp(10vw, 14vw, 20vw));
    width: auto;
    height: auto;
    transition: all 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  // Estilo para el siguiente elemento
  &:hover + & {
    display: flex;
    position: relative;
    transform: translateX(clamp(10vw, 14vw, 20vw));
    width: auto;
    height: auto;
    transition: all 0.3s ease-in-out, opacity 0.3s ease-in-out;
    // Aquí puedes agregar los estilos que deseas aplicar al <li> contiguo
    background-color: rgb(213, 6, 6);
    color: rgb(213, 6, 6);
  }
`;

// ...

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
            translateX: "clamp(5vw, 8vw, 20vw)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para un efecto elevado
            border: "1px solid rgba(255, 255, 255, 0.2)", // Borde sutil
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
            WebkitBackdropFilter: "blur(20px)", // Filtro de desenfoque para navegadores basados en WebKit (Safari)
            backdropFilter: "blur(20px)", // Filtro de desenfoque para navegadores compatibles
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

            boxShadow: "none", // Eliminar la sombra
            border: "none", // Eliminar el borde
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
            WebkitBackdropFilter: "none", // Eliminar el filtro de desenfoque para navegadores basados en WebKit (Safari)
            backdropFilter: "none", // Eliminar el filtro de desenfoque para navegadores compatibles
        });
    };



    return (
        <IconContainer>
            <MotionListItem
                key={index}
                onMouseEnter={handleHoverStart}
                onMouseLeave={handleHoverEnd}
                onClick={() => navigate(item.path)}
                className={page.startsWith(item.path) ? 'itemActive' : ''}
                data-tip
                data-for={tooltipId}
            >
                <NavTooltipContainer>
                    <NavIcon
                        initial={{
                            scale: 1,
                            color: (localActive) ? '#1F1E1EFF' : '#0a720a',
                            boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
                            borderRadius: '0%',
                            translateX: '0',
                            width: '20px',
                            height: '20px',
                        }}
                        animate={controls}
                    >
                        {<item.icon></item.icon>}
                        <Link to={item.path}>{item.title}</Link>
                    </NavIcon>

                    <ToolTipGlass>
                        <h3>{item.title}</h3>
                    </ToolTipGlass>
                </NavTooltipContainer>
            </MotionListItem>
        </IconContainer>
    );
};

export default MenuItem;

