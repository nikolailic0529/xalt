import React from 'react';

import {MenuItemLink} from 'components/shared/Layout';

export const MenuItem = (props) => {
  const {href, onClick, icon, title, select} = props;
  return (
    <li key={props.id}>
      <MenuItemLink
        to={href}
        onClick={onClick}
        title={title}
        className={select}
      >
        {icon}
        {title}
      </MenuItemLink>
    </li>
  );
};
