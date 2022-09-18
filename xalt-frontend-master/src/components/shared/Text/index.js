import React from 'react';

import styled from 'styled-components';

import { theme } from 'components';

const SIZE = {
  LARGE: 64,
  BIG: 32,
  REGULAR_BIGGER: 18,
  REGULAR: 16,
  SMALLER_REGULAR: 13,
  SMALL: 12,
  TINY: 10,
};

const mapSize = (props) => {
  if (props.largeSize) return SIZE.LARGE;
  if (props.bigSize) return SIZE.BIG;
  if (props.regularBiggerSize) return SIZE.REGULAR_BIGGER;
  if (props.smallerRegularSize) return SIZE.SMALLER_REGULAR;
  if (props.smallSize) return SIZE.SMALL;
  if (props.tinySize) return SIZE.TINY;

  return 16;
};

const mapWeight = (props) => {
  if (props.bold) return '700';
  if (props.thin) return '100';
  if (props.medium) return '500';
  if (props.regular) return '400';
  if (props.light) return '300';

  return '400';
};

const mapTextDecoration = (props) => {
  if (props.underline) return 'underline';

  return 'none';
};

const mapColor = (props) => {
  if (props.white) return theme.colors.white;
  if (props.black) return theme.colors.black;
  if (props.grayLight) return theme.colors.gray100;
  if (props.grayLightless) return theme.colors.gray300;
  if (props.grayRegular) return theme.colors.gray500;
  if (props.grayRegularDark) return theme.colors.gray800;
  if (props.grayDark) return theme.colors.gray900;
  if (props.geySteel) return theme.colors.graySteel;
  if (props.grayText) return theme.colors.gray1000;
  if (props.darkPink) return theme.colors.darkPink;
  if (props.kingfisherDaisy) return theme.colors.kingfisherDaisy;

  return theme.colors.graySteel;
};

const mapTextTransform = (props) => {
  if (props.uppercase) return 'uppercase';
  if (props.lowercase) return 'lowercase';
  if (props.capitalize) return 'capitalize';

  return 'none';
};

const mapTextAlignment = (props) => {
  if (props.alingCenter) return 'center';
  if (props.alingLeft) return 'left';
  if (props.alingRight) return 'right';

  return 'inherit';
};

const Text = styled.span`
  font-size: ${({ size }) => size}px;
  font-weight: ${({ weight }) => weight};
  font-family: 'Roboto', sans-serif;
  text-decoration: ${({ textDecoration = 'none' }) => textDecoration};
  color: ${({ color }) => color};
  text-transform: ${({ textTransform }) => textTransform};
  text-align: ${({ textAlign }) => textAlign};
  line-height: 1;
  ${({ clickable }) => (clickable ? '&:hover { cursor: pointer; }' : '')}
`;

export default (props) => {
  const { children, clickable, onClick } = props;

  return (
    <Text
      weight={mapWeight(props)}
      size={mapSize(props)}
      textDecoration={mapTextDecoration(props)}
      color={mapColor(props)}
      textTransform={mapTextTransform(props)}
      textAlign={mapTextAlignment(props)}
      clickable={clickable}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};
