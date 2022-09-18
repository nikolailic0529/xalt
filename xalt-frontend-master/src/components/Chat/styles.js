import styled from 'styled-components';
import { Col, Layout } from 'antd';

const { Header } = Layout;

export const Container = styled.div`
  background-color: #fff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  padding: 1rem;
  height: calc(100vh - 88px - 44px);
`;

export const StyledCol = styled(Col)`
  padding: 10px;
`;

export const MembersListHeader = styled(Header)`
  background-color: #fff;
  padding: 0;
`;

export const MembersListWrapper = styled(Layout)`
  background-color: #fff;
  overflow-y: auto !important;
`;
