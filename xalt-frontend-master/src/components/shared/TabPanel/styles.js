import styled from 'styled-components';
import colors from 'lib/theme/colors';
import lightenColor from 'lib/lighten-color';
import { Layout } from 'antd';

const { Header } = Layout;

export const TabPanel = styled(Layout)`
  background-color: transparent;
`;

export const TabHeader = styled(Header)`
  padding: 0;
  background-color: transparent;
  width: 100%;
  display: flex;
`;

export const TabPane = styled.div`
  height: ${({ height = '72px' }) => height};
  width: ${({ width }) => width}%;
  background-color: ${({ selected }) => (selected ? colors.lightPink200 : colors.lightPink50)};
  border-bottom: 5px solid ${({ selected }) => (selected ? colors.darkPink : 'transparent')};
  text-transform: uppercase;
  color: ${({ selected }) => (selected ? colors.darkPink : colors.graySteel)};
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    border-bottom: 5px solid ${({ selected }) => (selected ? colors.darkPink : lightenColor(colors.darkPink, +100))};
  }
`;

export const EmptyTabPane = styled.div`
  height: 72px;
  width: ${({ width }) => width}%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  opacity: 0.7;
  transition: 0.1s all ease-in-out;

  &: hover {
    cursor: pointer;
    transform: scale(1.1);
    opacity: 1;
    transition: 0.1s all ease-in-out;
  }
`;

export const TabContent = styled(Layout)`
  background-color: transparent;
`;
