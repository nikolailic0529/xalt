import React, {useState} from 'react';
import styled from 'styled-components';
import colors from 'lib/theme/colors';

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const Tab = styled.div`
  width: 30%;
  height: 100%;
  background: ${colors.lightPink50};
  color: ${colors.gray1000};
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 7px solid transparent;
  padding-top: 7px;
  cursor: pointer;
  transition: all 0.3s ease-in-out 0s;
  &:hover {
    background-color: ${colors.lightPink200};
  }
  &.active {
    border-bottom: 7px solid ${colors.darkPink};
    color: ${colors.darkPink};
    background-color: ${colors.lightPink200};
  }
`;

const TabsPanel = (props) => {
  const {tabs, activeTab, setActiveTab} = props;

  const [isActive, setIsActive] = useState(activeTab);

  return (
    <TabsWrapper>
      {tabs.map((item) => {
        return (
          <Tab
            key={item}
            className={item === isActive ? 'active' : ''}
            onClick={() => {
              setIsActive(item);
              setActiveTab(item);
            }}
          >
            {item}
          </Tab>
        );
      })}
    </TabsWrapper>
  );
};

export default TabsPanel;
