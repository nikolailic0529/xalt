import React from 'react';
import styled, {css} from 'styled-components';
import {space, color, flexbox, border, layout} from 'styled-system';

import SvgIcon from 'components/shared/SvgIcon';
import colors from 'lib/theme/colors';

const CloseButtonWrapper = styled.button`
  ${flexbox};
  ${layout}
  ${color};
  ${space};
  ${border};

  position: absolute;
  top: 18px;
  right: 22px;

  svg {
    width: 24px;
    height: 24px;
    fill: transparent;
    stroke: ${colors.darkPink};
  }
`;
CloseButtonWrapper.defaultProps = {
  width: '32px',
  height: '32px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'transparent',
  border: 'none',
  p: '4px',
};

export const CloseButton = ({onClick}) => {
  return (
    <CloseButtonWrapper onClick={onClick}>
      <SvgIcon name="btnClose" />
    </CloseButtonWrapper>
  );
};

export const MobileMenu = styled.div`
  ${flexbox};
  ${layout}
  ${space};
`;
MobileMenu.defaultProps = {
  width: '100%',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
  flexWrap: 'wrap',
  p: '24px 4px 0 32px',
  as: 'nav',
};

export const MobileNavBg = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  visibility: hidden;
  transition: visibility 0.3s cubic-bezier(0.63, 0.64, 0.3, 1);
  position: absolute;
  top: 0;
  left: 0;

  ${(props) =>
    props.layerActive &&
    css`
      visibility: visible;
    `};
`;
