
/*
import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";
import { AiOutlineEye } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCardNew = ({
                            name,
                            imgSrc,
                            logo1,
                            logo2,
                            price,
                            mobileVersion,
                            index,
                            spans,
                            blur,
                        }) => {
    const [logo, setLogo] = useState(logo1);

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    return (
        <>
            <StyledMotionDiv
                className={!mobileVersion ? "prod-card-new" : "prod-card-mobile"}
                style={{ backdropFilter: `blur(${blur})` }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 * index }}
                onMouseEnter={() => setLogo(logo2)} // Cambia el logo cuando el mouse sale del área
                onMouseLeave={() => setLogo(logo1)} // Cambia el logo cuando el mouse sale del área
                mobileVersion={mobileVersion}
            >
                <StyledLogoDiv mobileVersion={mobileVersion}>
                    <StyledRotatingBorder />
                    <StyledLogoImage
                        src={logo}
                        alt="Logo"
                        mobileVersion={mobileVersion}
                    />
                </StyledLogoDiv>
                <StyledWorking />
                <StyledWorking2 />
                <StyledImage src={`${imgSrc}`} alt={name} mobileVersion={mobileVersion} />
                <StyledInfoDiv mobileVersion={mobileVersion}>
                    <StyledTitle className="typewriter-text-0">{name}</StyledTitle>
                    <StyledParagraph>{spans}</StyledParagraph>
                    <StyledDetailsDiv mobileVersion={mobileVersion}>
                        <StyledPriceDiv mobileVersion={mobileVersion}>
                            <span>{price.toFixed(2)}€</span>
                        </StyledPriceDiv>
                        <StyledButtonContainer mobileVersion={mobileVersion}>
                            <StyledButton className="details-button">
                                <AiOutlineEye size="30" />
                            </StyledButton>
                            <StyledButton className="cart-button">
                                <FaShoppingCart size="30" />
                            </StyledButton>
                        </StyledButtonContainer>
                    </StyledDetailsDiv>
                </StyledInfoDiv>
            </StyledMotionDiv>
            <ToastContainer />
        </>
    );
};

export default ProductCardNew;


*/

import styled from "styled-components";
import { motion } from "framer-motion";

const StyledMotionDiv = styled(motion.div)`
  background-color: rgba(179, 187, 201, 0.249);
  border-radius: 10px;
  padding: 20px;
  max-width: 280px;
  min-width: 280px;
  margin: 0 10px 20px;
  height: 380px;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-20px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    border-color: rgba(114, 185, 87, 0.6);
    background-position: 0 100%;
  }

  /* ...todos los demás selectores que comienzan con .prod-card-new */
`;

const StyledLogoDiv = styled.div`
  /* ...estilos para .prod-card-new-logo */
`;

const StyledRotatingBorder = styled.div`
  /* ...estilos para .rotating-border */
`;

const StyledLogoImage = styled.img`
  /* ...estilos para .prod-card-new-logo-img */
`;

const StyledWorking = styled.div``;

const StyledWorking2 = styled.div``;

const StyledImage = styled.img`
  /* ...estilos para .prod-card-new-img */
`;

const StyledInfoDiv = styled.div`
  /* ...estilos para .prod-card-new-info */
`;

const StyledTitle = styled.h3`
  /* ...estilos para .prod-card-new-info h3 */
`;

const StyledParagraph = styled.p`
  /* ...estilos para .prod-card-new-info p */
`;

const StyledDetailsDiv = styled.div`
  /* ...estilos para .prod-details-new */
`;

const StyledPriceDiv = styled.div`
  /* ...estilos para .prod-price-new */
`;

const StyledButtonContainer = styled.div`
  /* ...estilos para .prod-card-new-button-container */
`;

const StyledButton = styled.button`
  /* ...estilos para .prod-card-new-button */
`;

// Asegúrate de exportar todos los componentes de estilo que necesites.
export {
    StyledMotionDiv,
    StyledLogoDiv,
    StyledRotatingBorder,
    StyledLogoImage,
    StyledWorking,
    StyledWorking2,
    StyledImage,
    StyledInfoDiv,
    StyledTitle,
    StyledParagraph,
    StyledDetailsDiv,
    StyledPriceDiv,
    StyledButtonContainer,
    StyledButton,
};
