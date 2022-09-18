import React from 'react';

import { Input, Row } from 'antd';

import styled from 'styled-components';
import colors from 'lib/theme/colors';

export const Panel = styled(Row)`
  background-color: ${colors.white};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
`;

export const StyledSearchField = styled(Input)`
  height: 38px;
  font-size: 18px;
  border: 1px solid ${colors.gray1000} !important;
  border-radius: 10px !important;
  box-shadow: none !important;

  &:hover {
    border: inherit;
    box-shadow: none;
  }

  &:focus {
    border: inherit;
    box-shadow: none !important;
  }
`;

export const StyledSearchFieldWrapper = styled.div`
  border-radius: 10px !important;
  border: 1px solid ${colors.gray100};
  overflow: hidden;
`;

export const FilterWrapper = styled.div`
  height: 58px;
  width: 100%;
  border-radius: 10px;
  margin: 0px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & .selection {
    position: absolute;
    bottom: 0;
    height: 6px;
    width: 100%;
    background: ${colors.darkPink};
    border-radius: 5px 5px 0px 0px;
  }
`;
