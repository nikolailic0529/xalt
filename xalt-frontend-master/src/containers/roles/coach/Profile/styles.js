import styled from 'styled-components';
import SvgIcon from 'components/shared/SvgIcon';
import { Image, Col } from 'antd';
import colors from 'lib/theme/colors';
import ButtonAux from 'components/shared/ButtonAux';
import { layout, shadow, border } from 'styled-system';

export const Card = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  padding: ${({ padding = '2rem' }) => padding};
  border-radius: 20px;
`;

export const ProfileLogoWrapper = styled.div`
  position: relative;
`;

export const ProfileLogo = styled(Image)`
  ${layout};
  ${border};
  ${shadow}
`;

ProfileLogo.defaultProps = {
  width: '107px',
  height: '107px',
  borderRadius: '50%',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
};

export const ProfileLogoButtonWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: white;
  bottom: 16px;
  right: -8px;
  background-color: ${colors.darkPink};
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledIcon = styled(SvgIcon)`
  width: 24px;
  height: 24px;
  stroke: #e6447d;
  color: #e6447d;
  ${({ clickable }) => (clickable ? '&:hover { cursor: pointer; }' : '')}
`;

export const StyledCol = styled(Col)`
  padding: ${({ padding = '0.5rem' }) => padding};
`;

export const StyledButtonAux = styled(ButtonAux)`
  width: 100%;
`;

export const Block = styled.div`
  padding: 1rem;
`;
