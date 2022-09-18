import styled from 'styled-components';
import Flex from 'components/shared/Flex';
import { MoreOutlined } from '@ant-design/icons';
import colors from 'lib/theme/colors';

export const MessagesContainer = styled.div`
  height: calc(100vh - 50px - 150px - 100px - 120px);
  overflow-y: auto;
`;

export const Message = styled.div`
  background: ${({ myMessage }) => (myMessage ? 'rgba(230, 68, 125, 1)' : '#fff')};
  color: ${({ myMessage }) => (myMessage ? '#fff' : '#000')};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: ${({ myMessage }) => (myMessage ? '20px 20px 0px 20px' : '0px 20px 20px 20px')};
  padding: 1rem;
  margin: 1rem 0.5rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
`;

export const EmptyBox = styled(Flex)`
  height: 100%;
`;

export const StyledMoreOutlined = styled(MoreOutlined)`
  font-size: 24px;
  color: ${colors.darkPink};
`;

export const HeaderWrapper = styled(Flex)`
  height: 50px;
`;
