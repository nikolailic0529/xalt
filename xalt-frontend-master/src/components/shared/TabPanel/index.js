import React, { useState } from 'react';

import {
  TabPanel, TabHeader, TabPane, EmptyTabPane, TabContent,
} from './styles';

export default ({
  tabs, actions = [], selected, height,
}) => {
  const getSelected = () => {
    const selectedIndex = tabs.findIndex(({ id }) => id === selected);

    return selectedIndex < 0 ? 0 : selectedIndex;
  };

  const [selectedTab, setSelectedTab] = useState(selected ? getSelected() : 0);

  const tabsLength = tabs.length + actions.length;

  return (
    <TabPanel>
      <TabHeader>
        {
          tabs.map(({ title }, i) => (
            <TabPane
              key={i}
              selected={selectedTab === i}
              width={100 / tabsLength}
              height={height}
              onClick={() => {
                setSelectedTab(i);

                tabs[i]?.onClick();
              }}
            >
              {title}
            </TabPane>
          ))
        }

        {
          actions.map(({ component, action }) => (
            <EmptyTabPane width={100 / tabsLength} onClick={action}>
              {component}
            </EmptyTabPane>
          ))
        }
      </TabHeader>
      <TabContent>
        {tabs[selectedTab].component}
      </TabContent>
    </TabPanel>
  );
};
