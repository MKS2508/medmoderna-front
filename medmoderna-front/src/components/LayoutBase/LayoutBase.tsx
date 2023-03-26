import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Base = styled.div`
  position: relative;
  top: calc(var(--topbar-height) + var(--miniheader-height));
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: calc(100% - var(--topbar-height) - var(--miniheader-height));
  overflow-x: hidden;
`;

const BaseAutoHeightHeader = styled.div`
  position: relative;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: auto;
  overflow-x: hidden;
`;

const BaseFullHeight = styled.div`
  position: relative;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: 100%;
  overflow-x: hidden;

  @media (max-width: 768px) {
    height: 80%;
  }
`;

const BaseAutoHeight = styled.div`
  position: relative;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: auto;
  overflow-x: hidden;
`;

const BaseAutoHeightBottom = styled.div`
  position: absolute;
  left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
  height: 5%;
  overflow-x: hidden;
  bottom: 0;
`;

interface LayoutBaseProps {
    children: ReactNode;
    layoutWithMenuBars?: boolean;
    isBottom?: boolean;
    useBaseAutoHeightHeader?: boolean; // Nueva propiedad
    useBaseFullHeight?: boolean; // Nueva propiedad
}

const LayoutBase = ({ children, layoutWithMenuBars, isBottom, useBaseAutoHeightHeader, useBaseFullHeight }: LayoutBaseProps) => {
    if (useBaseFullHeight) {
        return <BaseFullHeight>{children}</BaseFullHeight>;
    }

    if (useBaseAutoHeightHeader) {
        return <BaseAutoHeightHeader>{children}</BaseAutoHeightHeader>;
    }

    return (
        !layoutWithMenuBars ? (
            isBottom ? <BaseAutoHeightBottom>{children}</BaseAutoHeightBottom> : <BaseAutoHeight>{children}</BaseAutoHeight>
        ) : (
            <Base>{children}</Base>
        )
    );
};

export default LayoutBase;
