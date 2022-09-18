import styled from 'styled-components';
import SvgIcon from 'components/shared/SvgIcon';
import { Col } from 'antd';

export const Card = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  padding: ${({ padding = '2rem' }) => padding};
  border-radius: 20px;
`;

export const StyledIcon = styled(SvgIcon)`
  width: 24px;
  height: 24px;
  ${({ clickable }) => (clickable ? '&:hover { cursor: pointer; }' : '')}
`;

export const StyledCol = styled(Col)`
  padding: ${({ padding = '0.5rem' }) => padding};
`;

export const Block = styled.div`
  padding: 1rem;
`;
