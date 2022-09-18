/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Grid,
} from '@material-ui/core';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import ProfileActions from 'lib/redux/reducers/profile';
import { CardInputError } from 'components/shared/Checkout';
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

import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep6 = (props) => {
  const {
    onboardingProfile,
    changeOnboardingProfile,
    role,
    profileId,
    updateMemberProfileRequest,
  } = props;
  const history = useHistory();
  const [coachMode, setCoachMode] = useState(onboardingProfile.coach_mode || '');
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    if (coachMode.length === 0) {
      setIsError(true);
    } else {
      changeOnboardingProfile('coach_mode', coachMode);
      const newOnboardingProfile = { ...onboardingProfile, coach_mode: coachMode };
      updateMemberProfileRequest(newOnboardingProfile, role, profileId);
      history.push('/coach-onboarding-7');
    }
  };

  const handleChange = (e) => {
    setCoachMode(e.target.value);
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 6 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="60">
            60%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px" mb="40px">
              <Heading center>
                Will you be training your own clients, xAlt clients, or both?
              </Heading>
              <Paragraph maxWidth="580px" big center>
                Coaches that are IFI certified are eligble to train xAlt’s corporate clients. That’s
                right, we give you clients!
              </Paragraph>
              <Paragraph maxWidth="580px" big center>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="coach mode"
                    name="coach-mode"
                    value={coachMode}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="train-only-mine"
                      control={<Radio />}
                      label="Train only my own clients"
                    />
                    <FormControlLabel
                      value="train-only-xalt"
                      control={<Radio />}
                      label="Training only xAlt clients"
                    />
                    <FormControlLabel value="train-both" control={<Radio />} label="Both" />
                    <FormControlLabel value="not-sure" control={<Radio />} label="Not sure yet" />
                  </RadioGroup>
                </FormControl>
              </Paragraph>
              {isError && <CardInputError mt={3}>You must choose 1 option!</CardInputError>}
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding-5">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <div>
              <OnboardingNextBtn onClick={handleClick} pinkBtn width="100px">
                Next
              </OnboardingNextBtn>
            </div>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
  profileId: state.profile?.coach_profile?.id ? state.profile.coach_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep6);
