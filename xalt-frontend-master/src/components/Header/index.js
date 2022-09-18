import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';
import { layout } from 'styled-system';

import { Layout } from 'antd';
import Container from 'components/shared/Container';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import ButtonAux from 'components/shared/ButtonAux';
import UnregisterMenu from 'components/shared/UnregisterMenu';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import { connect } from 'react-redux';
import HeaderProfile from './HeaderProfile';
import MobileNavBlock from './MobileNavBlock';

const { Header } = Layout;

const UnregisterWrapper = styled.div`
  ${layout};
`;
UnregisterWrapper.defaultProps = {
  display: ['none', 'none', 'inline-flex', 'inline-flex'],
};

const switchRole = (param) => (
  <>
    {!param ? (
      <UnregisterWrapper>
        <UnregisterMenu />
      </UnregisterWrapper>
    ) : (
      <HeaderProfile />
    )}
  </>
);

const HeaderWrapper = styled.div`
  position: relative;
`;

const CustomHeader = styled(Header)``;
const CustomHeaderInner = styled(Flex)`
  position: relative;
`;

const HeaderMenuBtn = ({ onClick }) => (
  <button className="header-menu-btn" type="button" onClick={onClick}>
    <span />
    <span />
    <span />
  </button>
);

const LogoWrapper = styled.div`
  display: block;
  position: absolute;

  @media (max-width: 1023px) {
    left: calc(50% - 31px);
  }
  @media (min-width: 1024px) {
    display: block;
    left: 0;
  }
`;

const nestedPages = [
  /\/exercises\/new/,
  /\/exercises\/edit/,
  /\/exercises\/./,
  /\/reports\/view\/./,
  /\/reports\/edit\/./,
  /\/coach-profile\/./,
];

const findNestedPage = () => nestedPages.find((regex) => window.location.pathname.match(regex));

const isNestedPage = () => !!findNestedPage();

const selectJustifyContent = () => (isNestedPage() ? 'space-between' : 'flex-end');

const CustomTopHeader = ({
  isMobileNavOpen,
  setIsMobileNavOpen,
  accessToken,
  accessClient,
  accessUID,
}) => {
  const history = useHistory();

  const [isLogged, setIsLogged] = useState(
    !!(accessToken && accessClient && accessUID),
  );

  return (
    <HeaderWrapper className={isMobileNavOpen && 'header-mobile--open'}>
      <CustomHeader className={isLogged ? 'header' : 'header header-unreg'}>
        <Container className="container">
          <CustomHeaderInner
            alignItems="center"
            flexDirection="row"
            justifyContent={selectJustifyContent()}
          >
            <When condition={isNestedPage()}>
              <ButtonAux pinkBrdrBtn onClick={() => history.goBack()}>
                go back
              </ButtonAux>
            </When>
            {isLogged && (
              <HeaderMenuBtn onClick={() => setIsMobileNavOpen(true)} />
            )}

            <LogoWrapper
              isLogged={isLogged}
              className={isLogged && 'logo-logged'}
            >
              <XaltLogoLink />
            </LogoWrapper>
            {switchRole(isLogged)}
          </CustomHeaderInner>
        </Container>
      </CustomHeader>
      {isLogged && (
        <MobileNavBlock
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
        />
      )}
    </HeaderWrapper>
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  accessClient: state.auth.accessClient,
  accessUID: state.auth.accessUID,
  is_onboarding_finished: state.auth.is_onboarding_finished,
  role: state.profile.role,
  member_profile: state.profile.member_profile,
});

export default withRouter(connect(mapStateToProps, null)(CustomTopHeader));
