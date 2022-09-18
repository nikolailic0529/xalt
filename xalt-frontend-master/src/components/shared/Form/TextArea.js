import React, { useEffect, useRef, useState } from 'react';
import When from 'components/shared/When';
import Text from 'components/shared/Text';

import { Form, Input } from 'antd';
import styled from 'styled-components';
import { Classic, ClassicGray, Bordered, Chat } from './styles/textarea';

const switchTheme = (theme) => {
  switch (theme) {
    case 'classic':
      return Classic;
    case 'classic-gray':
      return ClassicGray;
    case 'bordered':
      return Bordered;
    case 'chat':
      return Chat;
    default:
      return Classic;
  }
};

const StyledTextArea = styled(Input.TextArea)`
  ${({ theme }) => switchTheme(theme)}
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Label = styled.div`
  top: -7px;
  left: 7px;
  position: absolute;
  height: 14px;
  padding: 0rem 2rem;
  background-color: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export default ({
  name,
  rows = 1,
  type,
  label,
  placeholder = '',
  rules = [],
  onChange,
  onEnter,
  theme,
  onBlur,
  value,
  resize = 'both',
  focusOnMount,
  required = false,
}) => {
  const [shiftPressed, setShiftPressed] = useState();
  const [styles, setStyles] = useState({ resize: resize || 'none' });
  const nodeRef = useRef();

  useEffect(() => {
    if (focusOnMount) {
      nodeRef.current.focus();
    }
  });

  useEffect(() => {
    if (required) {
      const newStyles = {
        ...styles,
        paddingRight: 15,
        position: 'relative',
      };
      setStyles(newStyles);
    }
  }, [required]);

  const onKeyUp = (e) => {
    if (e.key === 'Enter' && !shiftPressed && onEnter) {
      onEnter(e.target.value, nodeRef.current);
      e.target.value = '';
    }

    if (e.key === 'Shift') {
      setTimeout(() => setShiftPressed(false), 50);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Shift') {
      setShiftPressed(true);
    }
  };

  return (
    <InputWrapper>
      <When condition={label}>
        <Label>
          <Text smallSize bold>
            {label}
          </Text>
        </Label>
      </When>
      <Form.Item name={name} rules={rules}>
        <StyledTextArea
          ref={nodeRef}
          name={name}
          type={type}
          placeholder={placeholder}
          rows={rows}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          defaultValue={value}
          theme={theme}
          style={styles}
        />
        {required && <div style={{ position: 'absolute', top: 5, right: 8 }}>*</div>}
      </Form.Item>
    </InputWrapper>
  );
};
