import styled from 'styled-components';
import { space, color, typography } from 'styled-system';
import { Link } from 'react-router-dom';
import SvgIcon from 'components/shared/SvgIcon';

import Flex from 'components/shared/Flex';
import { theme } from 'components';

import { Menu, Button } from 'antd';

export const StyledButton = styled(Button)`
  height: auto;
  border: none;
  box-shadow: none;
  padding: 0;

  svg {
    @media (max-width: 768px) {
      width: 12px;
      height: 9px;
    }
    @media (min-width: 769px) {
      width: 15px;
      height: 10px;
    }
  }

  @media (max-width: 1024px) {
    width: auto;
  }
  @media (min-width: 1025px) {
    width: auto;
    max-width: 300px;
  }

  &:hover {
    color: unset;
  }
`;

export const StyledMenu = styled(Menu)`
  width: 240px;
  border: 1px solid ${theme.colors.gray500};
  padding: 5px;
  border-radius: 10px;
  margin-top: 8px;
`;

export const StyledItem = styled(Menu.Item)`
  background-color: ${theme.colors.white};
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin: 3px 0px;

  @media (max-width: 768px) {
    height: 30px;
  }
  @media (min-width: 769px) {
    height: 40px;
  }

  &:hover {
    background-color: ${theme.colors.lightPink50};
  }

  & svg {
    margin: 8px;
  }
`;

export const ProfileDdName = styled.span`
  ${color};
  ${space};
  ${typography};

  @media (max-width: 1023px) {
    display: none;
  }
  @media (min-width: 1024px) {
    display: inline-block;
    margin: 0 16px 0 0;
  }
`;
ProfileDdName.defaultProps = {
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '1.44',
  fontFamily: "'Roboto', sans-serif",
  textAlign: 'left',
  color: theme.colors.gray1000,
};

export const ProfileDdIconWrapper = styled(Flex)`
  @media (min-width: 769px) and (max-width: 1023px) {
    margin: 0 12px 0 0;
  }
  @media (min-width: 1024px) {
    margin: 0 16px 0 0;
  }
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    margin: 0 4px 0 0;
    img {
      width: 30px;
      height: 30px;
    }
  }
  @media (min-width: 769px) {
    width: 36px;
    height: 36px;
  }
  img {
    width: 100%;
    max-width: 100%;
  }
`;

export const StyledLink = styled(Link)`
  width: 100%;
`;

export const StyledIcon = styled(SvgIcon)`
  width: 24px;
  height: 24px;
  ${({ clickable }) => (clickable ? '&:hover { cursor: pointer; }' : '')}
`;
