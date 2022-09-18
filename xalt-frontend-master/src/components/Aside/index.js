import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import routes from 'lib/navigation/aside';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import Flex from 'components/shared/Flex';
import { Sidebar, MenuList } from 'components/shared/Layout';
import { MenuItem } from 'components/shared/Menu';
import { SidebarMenu } from './styles';

const Aside = (props) => {
  const { role, isSubscribed } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(window.location.pathname);

  const onCollapse = (isCollapsed) => setCollapsed(isCollapsed);

  useEffect(() => {
    if (selected !== window.location.pathname) {
      setSelected(window.location.pathname);
    }
  });

  return (
    <Sidebar
      width={210}
      className="aside"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      trigger={null}
    >
      <Flex m="0 0 0 30px">
        <XaltLogoLink />
      </Flex>

      <SidebarMenu>
        <MenuList>
          {(routes[role] || []).map(
            ({ title, icon, href, requireSubscription }, key) =>
              ((requireSubscription && isSubscribed) || !requireSubscription) && (
                <MenuItem
                  key={key}
                  icon={icon}
                  onClick={() => setSelected(href)}
                  href={href}
                  title={title}
                  select={window.location.pathname === href ? 'selected' : ''}
                />
              ),
          )}
        </MenuList>
      </SidebarMenu>
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  return {
    role: state.profile.role,
    isSubscribed:
      true ||
      (state.profile.role === 'member' &&
        ((state.auth.stripe && state.auth.stripe.stripe_subscription_status === 'active') ||
          (state.profile.stripe &&
            state.profile.stripe.stripe_subscription_status === 'active'))) ||
      (state.profile.role === 'coach' &&
        (state.auth.stripe || state.profile.stripe) &&
        ((state.auth.stripe && state.auth.stripe.stripe_id) ||
          (state.profile.stripe && state.profile.stripe.stripe_id) ||
          (state.auth.stripe && state.auth.stripe.stripe_bank_account_id) ||
          (state.profile.stripe && state.profile.stripe.stripe_bank_account_id))),
  };
};

export default withRouter(connect(mapStateToProps)(Aside));
