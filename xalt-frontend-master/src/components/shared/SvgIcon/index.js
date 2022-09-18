import React, { memo } from 'react';
import styled from 'styled-components';
import { size, space } from 'styled-system';
import colors from 'lib/theme/colors';

import icons from './icons.svg';

const StyledSvg = styled.svg`
  display: inline-flex;
  color: ${colors.gray1000};
  ${size};
  ${space};
`;

const IconImpl = ({
  name, width, height, ...rest
}) => (
  <StyledSvg width={width} height={height} {...rest}>
    <use xlinkHref={`${icons}#${name}`} />
  </StyledSvg>
);

IconImpl.defaultProps = {
  flexShrink: 0,
};

const SvgIcon = memo(IconImpl);

export default SvgIcon;
