import React, { useEffect, useState } from 'react';
import { Space, Dropdown } from 'antd';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import When from 'components/shared/When';
import { DownOutlined } from '@ant-design/icons';
import { FilterWrapper } from 'components/shared/FiltersPanel/styles';
import { truncate } from 'lodash';
import { connect } from 'react-redux';
import { StyledButton, StyledMenu, StyledItem } from './styles';

const SearchableDropdownFilter = (props) => {
  const {
    title, name, onChange, clearUp, action, onUpdated,
  } = props;
  const [selectedOption, setSelectedOption] = useState();
  const options = onUpdated(props);

  useEffect(() => {
    action();
  }, []);

  const menu = (
    <StyledMenu>
      {
        options.map((option) => (
          <StyledItem
            key={option.value}
            onClick={({ key }) => {
              onChange(key);
              setSelectedOption(option);
            }}
          >
            {option.label}
          </StyledItem>
        ))
      }
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
              <Text>{truncate(selectedOption?.label || title, { length: 15 })}</Text>

              <DownOutlined />
            </Space>
          </Flex>
        </StyledButton>
      </Dropdown>
    </FilterWrapper>
  );
};

const mapStateToProps = (state) => ({
  ...state,
  options: [],
});

export default connect(mapStateToProps, null)(SearchableDropdownFilter);
