import React from 'react';

import styled from 'styled-components';
import colors from 'lib/theme/colors';

const CheckboxWrapper = styled.div`
  width: 100%;
  text-align: left;

  input {
    position: absolute;
    left: -9999px;
  }

  input[type='checkbox'] + label {
    position: relative;
    font-weight: 300;
    font-size: 16px;
    line-height: 1.25;
    font-family: 'Roboto', sans-serif;
    color: ${colors.gray1000};
    cursor: pointer;
    margin: 0;
    transition: color 0.2s ease-in-out;
    margin: 0;
    padding: 0 0 0 28px;
    box-sizing: border-box;
  }

  input[type='checkbox'] + label::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 1px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: ${colors.gray50};
    border: 1px solid ${colors.gray300};
  }

  input[type='checkbox'] + label::after {
    display: none;
    content: '';
    position: absolute;
    left: 3px;
    top: 4px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: transparent;
  }

  input[type='checkbox']:disabled + label::before {
    border: 1px solid rgba(${colors.gray300}, 0.6);
  }

  input[type='checkbox']:checked + label::before {
    background-color: ${colors.white};
  }

  input[type='checkbox']:checked + label::after,
  input[type='checkbox']:checked + label:hover::after {
    display: block;
    background-color: ${colors.darkPink};
  }
`;

const Checkbox = ({id, name, checked, children, onChange, onBlur}) => (
  <CheckboxWrapper>
    <input
      type="checkbox"
      checked={checked}
      name={name}
      id={id}
      onChange={onChange}
      onBlur={onBlur}
    />
    <label htmlFor={id}>{children}</label>
  </CheckboxWrapper>
);

export default Checkbox;
