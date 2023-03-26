import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Base = styled.div`
  position: absolute;
  top: calc(var(--topbar-height) + var(--miniheader-height));
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: calc(100% - var(--topbar-height) - var(--miniheader-height));
  overflow-x: hidden;
`;

interface LayoutBaseProps {
    children: ReactNode;
}

const LayoutBase = ({ children }: LayoutBaseProps) => {
    return <Base>{children}</Base>;
};

export default LayoutBase;
