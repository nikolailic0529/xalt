import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import { Dropdown } from 'antd';
import ButtonAux from 'components/shared/ButtonAux';

import { StyledMenu, StyledItem, StyledLink } from '../ProfileDropdown/styles';

const menuList = [
  {
    title: 'Sign up as coach',
    href: '/registration?role=coach',
  },
  {
    title: 'Sign up as member',
    href: '/registration?role=member',
  },
];

const SignupDropdown = () => {
  const [selectedItem, setSelectedItem] = useState();
  const history = useHistory();

  const Item = ({ title, isSelected }) => (
    <Flex alignItems="center">
      {isSelected ? (
        <Text darkPink bold smallerRegularSize>
          {title}
        </Text>
      ) : (
        <Text grayRegularDark smallerRegularSize>
          {title}
        </Text>
      )}
    </Flex>
  );
  const menu = (
    <StyledMenu>
      {menuList.map(({ title, href }, i) => (
        <StyledItem
          key={title}
          onMouseEnter={() => setSelectedItem(i)}
          onMouseLeave={() => setSelectedItem(-1)}
        >
          <StyledLink to={href}>
            <Item title={title} isSelected={selectedItem === i} />
          </StyledLink>
        </StyledItem>
      ))}
    </StyledMenu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} overlayClassName="signup-dropdown">
      <ButtonAux pinkBrdrBtn width="116px">
        Sign up
      </ButtonAux>
    </Dropdown>
  );
};

export default SignupDropdown;
