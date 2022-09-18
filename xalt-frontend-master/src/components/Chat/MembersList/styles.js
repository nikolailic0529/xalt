import styled from 'styled-components';
import Flex from 'components/shared/Flex';
import { Image, Space, Badge } from 'antd';
import colors from 'lib/theme/colors';

export const RoundedImage = styled(Image)`
  width: 38px;
  height: 38px;
  border-radius: 50%;
`;

export const MemberCard = styled(Flex)`
  padding: 1.5rem;
  background-color: ${({ isRead, selected }) => (
    isRead
      ? selected ? colors.gray150 : colors.white
      : colors.lightPink50
  )};
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: ${({ isRead }) => (isRead ? colors.gray150 : colors.lightPink200)};
  }
`;

export const CustomBadge = styled(Badge)`
  width: 26px;
  height: 26px;
  border-radius: 10px;
  background-color: ${colors.darkPink};
  display: flex;
  align-items: center;
  justify-content: center;

  & * {
    background-color: ${colors.darkPink} !important;
    border: none !important;
    border-radius: none !important;
    box-shadow: none !important;
  }
`;
