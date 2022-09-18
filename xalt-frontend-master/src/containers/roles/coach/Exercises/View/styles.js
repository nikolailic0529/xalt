import styled from 'styled-components';
import colors from 'lib/theme/colors';
import { Space, Col, Result } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

export const FullWidthSpace = styled(Space)`
  width: 100%;
`;

export const DeleteOutlinedIcon = styled(DeleteOutlined)`
  font-size: 36px;

  &:hover {
    cursor: pointer
  }
`;

export const MarginedCol = styled(Col)`
  padding: 2rem;
`;

export const DarkResult = styled(Result)`
  width: 100%;
  background-color: #303030;
  color: ${colors.white};
  border-radius: 20px;
`;
