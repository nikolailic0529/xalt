import React, { useEffect, useState } from 'react';

import ButtonAux from 'components/shared/ButtonAux';
import materialStyles from '../materialStyles';

const ToggleButton = (props) => {
  const toggleCallback = props.toggleCallback;
  const [toggled, setToggled] = useState(props?.toggled || false);
  const classes = materialStyles();
  const style = toggled ? classes.formButtonSelected : classes.formButtonNotSelected;


  return (
    <ButtonAux
      className={style}
      type="button"
      onClick={() => {
        toggleCallback(!toggled);
        setToggled(!toggled);
      }}
    >
      {props.children}
    </ButtonAux>
  );
};

export default ToggleButton;
