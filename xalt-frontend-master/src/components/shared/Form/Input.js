import React from 'react';

import { Form, Input } from 'antd';
import styled from 'styled-components';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Classic, ClassicBig, ClassicLight, ClassicPink, Bordered } from './styles/input';

const switchTheme = (theme) => {
  switch (theme) {
    case 'classic':
      return Classic;
    case 'classic-big':
      return ClassicBig;
    case 'classic-light':
      return ClassicLight;
    case 'classic-pink':
      return ClassicPink;
    case 'bordered':
      return Bordered;
    default:
      return Classic;
  }
};

const StyledInput = styled(Input)`
  ${({ theme }) => switchTheme(theme)}
`;

const StyledPassword = styled(Input.Password)`
  ${({ theme }) => switchTheme(theme)}
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export default ({
  name,
  type,
  theme = 'classic',
  placeholder = '',
  rules = [],
  prefix,
  suffix,
  onChange,
  onBlur,
  value,
  min,
  disabled,
  style = {},
}) => (
  <InputWrapper>
    <Form.Item name={name} rules={rules}>
      {type === 'password' ? (
        <StyledPassword
          name={name}
          type={type}
          placeholder={placeholder}
          theme={theme}
          prefix={prefix}
          suffix={suffix}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={value}
          min={min}
          iconRender={(visible) =>
            visible ? (
              <EyeOutlined fontSize="24px" width="24px" height="16px" />
            ) : (
              <EyeInvisibleOutlined fontSize="24px" width="24px" height="16px" />
            )
          }
        />
      ) : (
        <StyledInput
          name={name}
          type={type}
          placeholder={placeholder}
          theme={theme}
          prefix={prefix}
          suffix={suffix}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={value}
          min={min}
          disabled={disabled}
          style={style}
        />
      )}
    </Form.Item>
  </InputWrapper>
);
