import React, { useEffect, useState } from 'react';
import { Space, Dropdown } from 'antd';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import When from 'components/shared/When';
import { DownOutlined } from '@ant-design/icons';
import { FilterWrapper } from 'components/shared/FiltersPanel/styles';
import { truncate } from 'lodash';
import { StyledButton, StyledMenu, StyledItem } from './styles';

export default ({ title, name, options, onChange, clearUp, noTruncate }) => {
  const [selectedOption, setSelectedOption] = useState();

  const menu = (
    <StyledMenu>
      {options.map((option) => (
        <StyledItem
          key={option.value}
          onClick={({ key }) => {
            onChange(key);
            setSelectedOption(option);
          }}
        >
          {option.label}
        </StyledItem>
      ))}
    </StyledMenu>
  );

  useEffect(() => {
    if (clearUp) {
      if (Array.isArray(clearUp)) {
        if (clearUp.includes(name)) {
          setSelectedOption(null);
        }
      } else {
        setSelectedOption(null);
      }
    }
  });

  return (
    <FilterWrapper>
      <When condition={selectedOption}>
        <div className="selection" />
      </When>

      <Dropdown overlay={menu}>
        <StyledButton>
          <Flex alignItems="center">
            <Space direction="horizontal">
              <Text>
                {noTruncate
                  ? selectedOption?.label || title
                  : truncate(selectedOption?.label || title, { length: 15 })}
              </Text>

              <DownOutlined />
            </Space>
          </Flex>
        </StyledButton>
      </Dropdown>
    </FilterWrapper>
  );
};
