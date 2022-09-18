import styled from 'styled-components';
import colors from 'lib/theme/colors';
import { Drawer } from 'antd';

export const Panel = styled(Drawer)`
  .ant-drawer-body {
    padding: 0;
  }

  .ant-drawer-mask {
    background-color: ${colors.transparent};
  }

  .ant-drawer-content-wrapper {
    width: 300px !important;
  }
`;

export const Header = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Notification = styled.div`
  padding: 2rem;
  border-bottom: 1px solid ${colors.gray200};
  background-color: ${colors.gray100};
`;
