import React from 'react';
import { Select } from 'antd';
import { Box } from '@material-ui/core';

import Exercises from './exercises';

const { Option } = Select;

const MeasurementSelector = ({ member_profile, setSelection }) => {
  return (
    <Box>
      <Select
        showSearch
        style={{ width: 200 }}
        onChange={(value) => {
          setSelection(value);
        }}
        placeholder="Search to Select"
        optionFilterProp="children"
        filterOption={(input, option) => {return option?.children.toLowerCase().includes(input.toLowerCase())}}
        filterSort={(optionA, optionB) => {
          return optionA?.children.toLowerCase().localeCompare(optionB?.children.toLowerCase());
        }}
      >
        {Object.entries(Exercises).map(([key, value], idx) => {
          return <Option value={key}>{value.exercise}</Option>;
        })}
      </Select>
    </Box>
  );
};

export default MeasurementSelector;
