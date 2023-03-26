import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import LayoutBase from "../LayoutBase/LayoutBase";

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const IframeCard = styled(motion.iframe)`
  filter: drop-shadow(0 0.4rem 0.55rem rgba(0, 0, 0, 0.2));
  margin-top: 12vh;
  width: 45%;
  height: 80%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

interface IframeCardsProps {
    igPosts: string[];
}

const IframeCards: React.FC<IframeCardsProps> = ({ igPosts }) => {
    const [filteredIgPosts, setFilteredIgPosts] = useState(igPosts);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        function updateScreenSize() {
            setIsSmallScreen(window.innerWidth <= 768);
        }

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    useEffect(() => {
        if (isSmallScreen) {
            setFilteredIgPosts(igPosts.slice(0, 1));
        } else {
            setFilteredIgPosts(igPosts);
        }
    }, [isSmallScreen, igPosts]);

    return (
        <LayoutBase useBaseFullHeight={true}>
            <StyledContainer>
                {filteredIgPosts.map((igPost, index) => (
                    <AnimatePresence key={index}>
                        <IframeCard
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                                borderRadius: '20%',
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                borderRadius: '10px',
                            }}
                            exit={{ opacity: 0.3 }}
                            transition={{ duration: 1.5, delay: index * 0.3 }}
                            key={igPost}
                            width="45%"
                            height="90%"
                            src={igPost}
                            frameBorder="0"
                        />
                    </AnimatePresence>
                ))}
            </StyledContainer>

        </LayoutBase>
    );
};

export default IframeCards;
