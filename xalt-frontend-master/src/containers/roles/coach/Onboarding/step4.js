import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingStep,
  OnboardingStepWrapper,
  OnboardingProgress,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
  OnboardingPrevBtn,
  OnboardingNextBtn,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OuterLinkPink from 'components/shared/OuterLinkPink';

import LogoutDropdown from 'components/Header/components/LogoutDropdown';
import AuthActions from 'lib/redux/reducers/auth';

const OnboardingStep4 = () => {
  const [countryCode, setCountryCode] = useState('CA');
  const { url } = useSelector((state) => ({
    url: state.auth.stripe?.url,
  }));
  const dispatch = useDispatch();

  const createLink = () => {
    dispatch(AuthActions.createStripeLinkRequest(countryCode));
  };

  useEffect(() => {
    if (url) {
      window.location.href = url;
    }
  }, [url]);

  useEffect(() => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        if (response.data) {
          if (response.data.country_code === 'US') {
            setCountryCode('US');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 2 of 4</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="60">
            50%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>Setup payment with Stripe</Heading>
              <Paragraph maxWidth="580px" big center>
                Please, click&nbsp;
                <OuterLinkPink onClick={createLink}>
                  <b style={{ fontSize: 20, margin: '0px 5px' }}>here</b>
                </OuterLinkPink>
                &nbsp;to setup your account with Stripe
              </Paragraph>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding-2">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <div>
              <OnboardingNextBtn onClick={createLink} pinkBtn width="100px">
                Next
              </OnboardingNextBtn>
            </div>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

export default OnboardingStep4;
