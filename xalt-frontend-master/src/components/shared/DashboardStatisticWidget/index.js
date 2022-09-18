import React from 'react';
import Flex from 'components/shared/Flex';
import { NothingBlock } from 'components/shared/Dashboard';

const DashboardStatisticWidget = (props) => {
  const { minHeight } = props;
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      minHeight={minHeight}
      width="100%"
    >
      <NothingBlock iconName="dashboardStat" iconWidth="68px" iconHeight="68px">
        No Statistics to Show
      </NothingBlock>
    </Flex>
  );
};

export default DashboardStatisticWidget;
