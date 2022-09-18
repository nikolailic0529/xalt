import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Menu, Button } from 'antd';
import styled from 'styled-components';
import colors from 'lib/theme/colors';

export const StyledButton = styled(Button)`
  height: auto;
  border: none;
  box-shadow: none;
  background-color: transparent;

  &:hover {
    color: unset;
    background-color: transparent;
  }
`;

export const StyledMenu = styled(Menu)`
  width: 240px;
  border: 1px solid ${colors.gray500};
  padding: 5px;
  border-radius: 10px;
`;

export const StyledItem = styled(Menu.Item)`
  background-color: ${colors.white};
  border-radius: 10px;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 3px 0px;

  &:hover {
    background-color: ${colors.gray100};
  }
`;
