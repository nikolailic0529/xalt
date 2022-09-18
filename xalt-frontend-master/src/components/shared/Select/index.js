import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const SelectComponent = (props) => {
  const { options, onChange } = props;
  return (
    <>
      <Select defaultValue={options[0].value} onChange={onChange}>
        {options.map((item) => (
          <Option value={item.value}>{item.title}</Option>
        ))}
      </Select>
    </>
  );
};

export default SelectComponent;
