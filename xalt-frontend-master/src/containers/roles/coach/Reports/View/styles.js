import styled from 'styled-components';
import Flex from 'components/shared/Flex';
import colors from 'lib/theme/colors';
import { Space, Image } from 'antd';

export const HalfFlex = styled(Flex)`
  height: 80vh;
`;

export const RoundedImage = styled(Image)`
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

export const QuestionsBox = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
`;

export const QuestionBox = styled.div`
  padding: 2rem;
  border-bottom: ${({ bordered }) => (bordered ? `1px solid ${colors.gray200}` : 'none')};
`;

export const ContentWrapper = styled(Space)`
  margin: 2rem;
`;

export const FullWidthSpace = styled(Space)`
  width: 100%;
`;
