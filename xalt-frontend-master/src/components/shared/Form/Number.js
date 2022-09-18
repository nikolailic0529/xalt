import React from 'react';

import { Form, InputNumber } from 'antd';
import styled from 'styled-components';
import { Classic } from './styles/number';

const switchTheme = (theme) => {
  switch (theme) {
    case 'classic': return Classic;
    default: return Classic;
  }
};

const StyledInputNumber = styled(InputNumber)`${({ theme }) => switchTheme(theme)}`;

const InputWrapper = styled.div`
  position: relative;
`;

export default ({
  name, min, theme = 'classic', placeholder = '', rules = [], onChange, onBlur, value, style, disabled = false,
}) => (
  <InputWrapper>
    <Form.Item
      name={name}
      rules={rules}
    >
      <StyledInputNumber
        name={name}
        min={min}
        placeholder={placeholder}
        theme={theme}
        onChange={onChange}
        onBlur={onBlur}
        style={style}
        defaultValue={value}
        disabled={disabled}
      />
    </Form.Item>
  </InputWrapper>
);
