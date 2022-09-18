import styled, { css } from 'styled-components';
import { space, width, layout, flexbox } from 'styled-system';

import colors from 'lib/theme/colors';

const ButtonAux = styled.button`
  ${space};
  ${width};
  ${layout};
  ${flexbox};

  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: 48px;
  ${(props) =>
    props.height
      ? css`
          height: ${props.height};
        `
      : css`
          height: 48px;
        `}
  font-size: 14px;
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  padding: 0 24px;

  transition: all 0.2s ease-in-out 0s;
  border-radius: 10px;
  text-align: center;
  text-transform: uppercase;

  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  user-select: none;
  -webkit-touch-callout: none;

  ${(props) =>
    props.pinkBrdrBtn
      ? css`
          border-width: 2px;
          border-style: solid;
          color: ${colors.darkPink};
          border-color: ${colors.darkPink};
          background: ${colors.white};
        `
      : props.pinkBtn
      ? css`
          border: none;
          color: ${colors.white};
          background: ${colors.darkPink};
        `
      : props.greyBtn
      ? css`
          border: none;
          color: ${colors.white};
          background: ${colors.gray500};
        `
      : props.whitePinkBtn &&
        css`
          border: none;
          color: ${colors.darkPink};
          background: ${colors.white};
        `};

  :active,
  :hover {
    ${(props) =>
      props.pinkBrdrBtn
        ? css`
            color: ${colors.darkPinkHover};
            border-color: ${colors.darkPinkHover};
            background: ${colors.white};
          `
        : props.pinkBtn
        ? css`
            color: ${colors.white};
            background: ${colors.darkPinkHover};
          `
        : props.whitePinkBtn &&
          css`
            border: none;
            color: ${colors.darkPinkHover};
            background: ${colors.white};
          `};
  }
`;

ButtonAux.defaultProps = {
  m: 0,
};

export default ButtonAux;
