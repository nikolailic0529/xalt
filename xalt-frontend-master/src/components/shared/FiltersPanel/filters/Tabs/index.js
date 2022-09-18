import React, { useEffect, useState } from 'react';
import TabPanel from 'components/shared/TabPanel';
import { FilterWrapper } from 'components/shared/FiltersPanel/styles';
import { Row, Col } from 'antd';
import colors from 'lib/theme/colors';
import Button from 'components/shared/Button';
import Text from 'components/shared/Text';
import When from 'components/shared/When';

export default ({ tabs, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('show_all');

  const selectTab = (value) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <>
      {
        tabs.map(({ value, title, span }) => (
          <Col xl={span}>
            <FilterWrapper>
              <When condition={selectedValue === value}>
                <div className="selection" />
              </When>

              <Button bg={colors.transparent} onClick={() => selectTab(value)}>
                <Text bold darkPink={selectedValue === value}>{title}</Text>
              </Button>
            </FilterWrapper>
          </Col>
        ))
      }
    </>
  );
};
