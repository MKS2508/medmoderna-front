import React from 'react';
import styled, { keyframes } from 'styled-components';
import LayoutBase from "../LayoutBase/LayoutBase";
import backgroundImage from '../../assets/fondo1.png';
import { motion } from 'framer-motion';

interface SeccionTextoDescriptivoProps {
    textoDescriptivo: string;
    height: number;
}

const BgimgTexto = styled.div<{ height: number }>`
  background-image: url(${backgroundImage});
  min-width: 90vw;
  min-height: ${({ height }) => height.toString() + "vh"};
  position: relative;
  background-attachment: fixed;
  background-repeat: no-repeat;
  z-index: -1;
  background-size: cover;
`;

const CaptionTexto = styled.div<{ height: number }>`
  padding-top: ${({ height }) => height.toString() + "vh"};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const typeWriter = keyframes`
  0% {
    width: 10%;
  }
  25% {
    width: 15%;
  }
  50% {
    width: 40%;
  }
  75% {
    width: 60%;
  }
  100% {
    width: 80%;
  }
`;

const TextoDescriptivo = styled(motion.div)`
  color: #fffdfd;
  background: rgba(255, 255, 255, 0.42);
  border-radius: 10px;
  width: 80%;
  height: 50%;
  padding: 1rem;
  font-size: 25px;
  backdrop-filter: blur(10px);
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SeccionTextoDescriptivo: React.FC<SeccionTextoDescriptivoProps> = ({
                                                                             textoDescriptivo,
                                                                             height,
                                                                         }) => {
    return (
        <>
            <section id="seccion-texto-descriptivo">
                <BgimgTexto height={height}>
                    <LayoutBase useBaseAutoHeightHeader>
                        <CaptionTexto height={height / 4}>
                            <TextoDescriptivo
                                initial={{ opacity: 0, width: "10%" }}
                                animate={{
                                    opacity: 1,
                                    width: "80%",
                                    transition: { duration: 4, ease: "linear" },
                                }}
                            >
                                {textoDescriptivo}
                            </TextoDescriptivo>
                        </CaptionTexto>
                    </LayoutBase>
                </BgimgTexto>
            </section>
        </>
    );
};

export default SeccionTextoDescriptivo;
