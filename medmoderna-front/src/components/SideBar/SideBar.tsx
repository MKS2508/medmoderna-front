import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // import Font Awesome CSS
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = true; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
import { AnimatePresence, motion } from 'framer-motion';
import MenuItem from './MenuItem';
import styled, {createGlobalStyle} from 'styled-components';
import {device, menuItems} from "../../WebParameters";


const SideBarComponent = styled(motion.div)`
  width: var(--sidebar-width);
  height: var(--sidebar-height);
  z-index: 20;
  display: flex;
  left: 0;
  top: calc(var(--topbar-height) + var(--miniheader-height));
  position: fixed;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: hsla(0, 9%, 91%, 0.13);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;
const SideBarNavigation = styled.nav`
  height: 100%;
  position: sticky;
  left: 0;
  bottom:0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
const MenuItemList = styled(motion.ul)`
  margin-top: 3vh;
  height: 100%;
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: space-evenly;
  align-content: center;
  list-style-type: none;
  padding: 2vh 0;
  margin-bottom: 3vh;
`;

interface ISideBarProps {
    sideBarMenuItems: any[];
}
const SideBar: React.FC<ISideBarProps> = ({ sideBarMenuItems }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [pageState, setPageState] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const listenToScroll = () => {
            let heightToHideFrom = 30;
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

            if (winScroll > heightToHideFrom) {
                isVisible && setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            if (window.location.pathname !== '/') {
                setIsVisible(false);
            }
        };

        if (window.location.pathname !== '/') {
            setIsVisible(false);
        }

        window.addEventListener('scroll', listenToScroll);
        return () => window.removeEventListener('scroll', listenToScroll);
    }, []);

    const getCurrentPage = (): string => {
        console.warn({ location: location.pathname });
        return location.pathname;
    };

    const sidebarVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    let page = getCurrentPage();
    useEffect(() => {
        setPageState(page);
    }, [page]);


    return (
        <>

            <AnimatePresence>
                {!isVisible ? (
                    <>
                        <SideBarComponent
                            className={"s"}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sidebarVariants}
                            transition={{ duration: 1 }}
                        >
                            <SideBarNavigation  onClick={() => { page = getCurrentPage(); }}>
                                <MenuItemList onClick={() => { page = getCurrentPage(); }} onMouseEnter={() => { page = getCurrentPage(); }}>
                                    {sideBarMenuItems.map((item, index) => (
                                        <MenuItem
                                            key={index}
                                            item={item}
                                            index={index}
                                            page={pageState}
                                            navigate={navigate}
                                        />
                                    ))}
                                </MenuItemList>
                            </SideBarNavigation>
                        </SideBarComponent>
                    </>
                ) : (
                    <></>
                )}
            </AnimatePresence>

        </>
    );

};

export default SideBar;
