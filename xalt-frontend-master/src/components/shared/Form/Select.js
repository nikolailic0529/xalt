import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { layout } from 'styled-system';
import { Form, Select } from 'antd';
import { theme as appTheme } from 'components';
import { Classic, ClassicBig, Bordered } from './styles/select';

const { Option } = Select;

const switchTheme = (theme) => {
  switch (theme) {
    case 'classic':
      return Classic;
    case 'classic-big':
      return ClassicBig;
    case 'bordered':
      return Bordered;
    default:
      return Classic;
  }
};

const StyledSelect = styled(Select)`
  ${({ theme }) => switchTheme(theme)}

  &.required .ant-select-selector {
    padding-right: 15px;
    position: relative;
  }

  &.required .ant-select-arrow {
    right: 20px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  ${layout};
`;

const StyledOption = styled(Option)`
  &:hover,
  &:active {
    background-color: ${appTheme.colors.gray100};
  }
`;

export default ({
  name,
  placeholder = '',
  options = [],
  rules = [],
  theme = 'classic',
  onChange,
  onBlur,
  value,
  width,
  showSearch,
  required = false,
}) => (
  <InputWrapper width={width}>
    <Form.Item name={name} rules={rules} onChange={onChange}>
      <StyledSelect
        className={`${required ? 'required' : ''}`}
        showSearch={showSearch}
        placeholder={placeholder}
        theme={theme}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={value}
      >
        {options.map(({ value, label }) => (
          <StyledOption value={value}>{label}</StyledOption>
        ))}
      </StyledSelect>
      {required && <div style={{ position: 'absolute', top: 5, right: 8 }}>*</div>}
    </Form.Item>
  </InputWrapper>
);
