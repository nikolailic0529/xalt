import styled, { css } from 'styled-components';
import { space } from 'styled-system';

export const Container = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${space};

  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `};
  ${(props) =>
    props.big
      ? css`
          max-width: 1272px;
        `
      : props.medium &&
        css`
          max-width: 1048px;
        `};

  ${(props) =>
    props.min &&
    css`
      max-width: 876px;
    `};
`;

export default Container;
