import { Row } from 'antd';
import colors from 'lib/theme/colors';
import styled from 'styled-components';
import Flex from 'components/shared/Flex';

export const StyledRow = styled(Row)`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${({ viewed }) => (viewed ? colors.darkPink : 'transparent')};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
`;

export const HalfHeightFlex = styled(Flex)`
  height: 50vh;
`;
