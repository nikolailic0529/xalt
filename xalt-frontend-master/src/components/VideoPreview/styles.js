import styled from 'styled-components';
import { LockFilled, UnlockFilled, DeleteOutlined } from '@ant-design/icons';
import colors from 'lib/theme/colors';
import SvgIcon from 'components/shared/SvgIcon';
import { Space } from 'antd';

export const StyledCard = styled.div`
  padding: 0 0 15px 0;
  margin: 10px;
  display: flex;
  flex-direction: column;
  transition: 0.1s all linear;
  background: ${colors.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);

  &:hover {
    cursor: pointer;
    transition: 0.1s all linear;
    box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175);
  }
`;

export const CardContent = styled.div`
  width: 100%;
  position: relative;
  margin-top: 15px;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  justify-content: center;
`;

export const LockFilledIcon = styled(LockFilled)`
  font-size: 28px;
  color: ${colors.darkPink};
`;

export const UnlockFilledIcon = styled(UnlockFilled)`
  font-size: 28px;
  color: ${colors.darkPink};
`;

export const DeleteOutlinedIcon = styled(DeleteOutlined)`
  font-size: 28px;
`;

export const FullWidthSpace = styled(Space)`
  width: 100%;
`;

export const StyledSvgIcon = styled(SvgIcon)`
  width: 30px;
  height: 30px;
`;
