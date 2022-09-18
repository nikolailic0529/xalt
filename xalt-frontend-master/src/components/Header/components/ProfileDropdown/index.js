import React, { useState } from 'react';
import { connect } from 'react-redux';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import Icon from 'components/shared/Icon';
import When from 'components/shared/When';
import SvgIcon from 'components/shared/SvgIcon';
import AuthActions from 'lib/redux/reducers/auth';
import { Dropdown, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import colors from 'lib/theme/colors';
import {
  StyledButton,
  StyledMenu,
  StyledItem,
  ProfileDdName,
  ProfileDdIconWrapper,
  StyledLink,
  StyledIcon,
} from './styles';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const menuList = [
  {
    title: 'My Profile',
    href: '/profile',
    icon: [<StyledIcon name="userDisabled" />, <StyledIcon name="user" />],
  },
  {
    title: 'Account',
    href: '/account',
    icon: [<StyledIcon name="layersDisabled" />, <StyledIcon name="layers" />],
  },
  {
    title: 'Help',
    href: '/help',
    icon: [<StyledIcon name="helpDisabled" />, <StyledIcon name="help" />],
  },
  {
    title: 'Settings & Privacy',
    href: '/profile',
    icon: [<StyledIcon name="settingsDisabled" />, <StyledIcon name="settings" />],
  },
  {
    title: 'Log Out',
    icon: [<StyledIcon name="logoutDisabled" />, <StyledIcon name="logout" />],
  },
];

const ProfileDropdown = (props) => {
  const { logout, name, avatar, onlyLogout } = props;
  const [selectedItem, setSelectedItem] = useState();

  const Item = ({ icon, title, isSelected, onClick }) => (
    <Flex alignItems="center" onClick={onClick}>
      {icon[isSelected ? 1 : 0]}
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
      {onlyLogout ? (
        <StyledItem key={menuList[menuList.length - 1].title}>
          <Item
            icon={menuList[menuList.length - 1].icon}
            title={menuList[menuList.length - 1].title}
            isSelected={false}
            onClick={() => logout()}
          />
        </StyledItem>
      ) : (
        <>
          {menuList.map(({ title, href, icon }, i) => (
            <StyledItem
              key={title}
              onMouseEnter={() => setSelectedItem(i)}
              onMouseLeave={() => setSelectedItem(-1)}
            >
              {href ? (
                <StyledLink to={href}>
                  <Item icon={icon} title={title} isSelected={selectedItem === i} />
                </StyledLink>
              ) : (
                <Item
                  icon={icon}
                  title={title}
                  isSelected={selectedItem === i}
                  onClick={() => logout()}
                />
              )}
            </StyledItem>
          ))}
        </>
      )}
    </StyledMenu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} overlayClassName="profile-dropdown">
      <StyledButton>
        <Flex alignItems="center">
          <ProfileDdIconWrapper>
            <Icon src={avatar || 'empty-user-profile'} />
          </ProfileDdIconWrapper>

          <When condition={!name}>
            <Spin indicator={antIcon} />
          </When>

          <When condition={name}>
            <ProfileDdName>{name}</ProfileDdName>
          </When>

          <SvgIcon ml={1} name="arrowDown" fill={colors.darkPink} />
        </Flex>
      </StyledButton>
    </Dropdown>
  );
};

const mapStateToProps = (state) => ({
  name: state.profile.name,
  avatar: state.profile.avatar?.url,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  logout: () => dispatch(AuthActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);
