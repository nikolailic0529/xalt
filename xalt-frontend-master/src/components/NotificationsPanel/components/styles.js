import styled from 'styled-components';
import colors from 'lib/theme/colors';
import SvgIcon from 'components/shared/SvgIcon';

export const Notification = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${colors.gray200};
  background-color: ${({ markAsRead }) => (markAsRead ? colors.white : colors.lightPink50)};
`;

export const StyledIcon = styled(SvgIcon)`
  width: 50px;
  height: 50px;
`;
