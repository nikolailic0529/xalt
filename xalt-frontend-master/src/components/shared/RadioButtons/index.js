import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';

export default (props) => {
  const { options, onChange } = props;
  const optionValue = options.length ? options[0].id : '';
  const [value, setValue] = useState(optionValue);

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setValue(optionValue);
    onChange(optionValue);
  }, [options]);

  return (
    <Radio.Group
      onChange={onChangeHandler}
      defaultValue={optionValue}
      value={value}
    >
      {options.map((item) => (
        <Radio key={item.id} value={item.id}>
          {item.title}
        </Radio>
      ))}
    </Radio.Group>
  );
};
