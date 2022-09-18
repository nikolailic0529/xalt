import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Layout } from 'antd';
import {
  layout,
  width,
  space,
  color,
  typography,
  flexbox,
  border,
} from 'styled-system';

import Flex from 'components/shared/Flex';
import { theme } from 'components';

const { Sider } = Layout;
export const Sidebar = styled(Sider)`
  ${space};

  position: relative;
  z-index: 2;

  @media (max-width: 1023px) {
    display: none !important;
  }

  @media (min-width: 1024px) {
    display: flex;
  }
`;
Sidebar.defaultProps = {
  p: '40px 0 0',
};

export const MenuList = styled.ul`
  ${layout};
  ${flexbox};
  ${space};

  li {
    margin: 0 0 16px;
  }
`;
MenuList.defaultProps = {
  width: '100%',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
  flexWrap: 'wrap',
};

export const OrderedList = styled.ol`
  ${layout};
  ${flexbox};
  ${space};

  li {
    margin: 0 0 16px;
  }
`;
OrderedList.defaultProps = {
  width: '100%',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
  flexWrap: 'wrap',
};

export const MenuItemLink = styled(Link)`
  ${flexbox};
  ${space};
  ${width};
  ${color};
  ${border};
  ${typography};
  display: flex;
  position: relative;
  color: ${theme.colors.gray1000};
  background-color: transparent;
  transition: color 0.2s ease-in-out 0s, background-color 0.2s ease-in-out 0s;

  &::before {
    content: '';
    width: 3px;
    height: 100%;
    border-radius: 1.5px;
    background-color: transparent;
    transition: background-color 0.2s ease-in-out 0s;
    position: absolute;
    top: 0;
    left: -13px;
  }

  svg {
    width: 24px;
    height: 25px;
    fill: transparent;
    stroke: ${theme.colors.gray1000};
    transition: all 0.2s ease-in-out 0s;
    margin: 0 12px 0 0;
  }

  &:hover {
    color: ${theme.colors.darkPink};
    background-color: rgb(230 68 125 / 10%);

    svg {
      stroke: ${theme.colors.darkPink};
    }
  }

  &.selected {
    color: ${theme.colors.darkPink};
    background-color: rgb(230 68 125 / 10%);

    &::before {
      background-color: ${theme.colors.darkPink};
    }

    svg {
      stroke: ${theme.colors.darkPink};
    }
  }
`;
MenuItemLink.defaultProps = {
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'row',
  fontSize: '18px',
  fontWeight: '500',
  lineHeight: '1.56',
  fontFamily: "'Roboto', sans-serif",
  borderRadius: '5px',
  textAlign: 'left',
  p: '6px 12px',
};

export const MainWrapper = styled(Flex)`
  ${space};
  ${width};
  ${flexbox};
`;
MainWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'start',
  alignItems: 'start',
  flexDirection: 'column',
  p: 0,
};

export const Main = styled(Layout)`
  padding: 12px 24px;
  width: 100%;
  overflow-y: scroll;
  position: relative;
  transition: z-index 0.3s ease-in-out;
  ${color};

  ${(props) =>
    props.layerActive
      ? css`
          z-index: 1;
        `
      : css`
          z-index: 0;
        `};

  .ant-layout {
    width: 100%;
    overflow: initial;
    padding: 0;
  }
`;

Main.defaultProps = {
  bg: theme.colors.white,
};
