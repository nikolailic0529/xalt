import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import ProfileActions from 'lib/redux/reducers/profile';

import Container from 'components/shared/Container';
import Heading from 'components/shared/Heading';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingProgress,
  OnboardingStepWrapper,
  OnboardingStep,
  OnboardingPrevBtn,
  OnboardingNextBtn,
  OnboardingList,
  OnboardingListItem,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OnboardingCard from 'components/shared/OnboardingCard';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep2 = (props) => {
  const {
    currentDomains,
    changeOnboardingProfile,
    updateMemberProfileRequest,
    onboardingProfile,
    role,
    profileId,
  } = props;

  const selected = currentDomains ? currentDomains.split(',') : [];

  const history = useHistory();

  const clienteles = [
    {
      id: 'clientelle-yourth',
      clientele_name: 'Youth',
    },
    {
      id: 'clientelle-adults',
      clientele_name: 'Adults',
    },
    {
      id: 'clientelle-senior',
      clientele_name: 'Senior(60+)',
    },
    {
      id: 'clientelle-health-issues',
      clientele_name: 'Member with health issues',
    },
    {
      id: 'clientelle-no-prefrence',
      clientele_name: 'No prefrence',
    },
  ];

  const changeSelected = (domainId) => {
    if (selected.find((item) => item === domainId)) {
      changeOnboardingProfile(
        'coach_domain_ids',
        String(selected.filter((item) => item !== domainId)),
      );
    } else {
      changeOnboardingProfile('coach_domain_ids', String([...selected, domainId]));
    }
  };

  const setClienteles = () => {
    updateMemberProfileRequest(onboardingProfile, role, profileId);
    history.push('/coach-onboarding-4');
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 2 of 5</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="40">
            40%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>What clientelle are you most comfortable working with?</Heading>
              <OnboardingList>
                {clienteles.map((clientele) => (
                  <OnboardingListItem key={clientele.id}>
                    <OnboardingCard
                      checked={selected.find((item) => item === clientele.id)}
                      onClick={() => changeSelected(clientele.id)}
                      id={clientele.id}
                      iconName={clientele.id}
                    >
                      {clientele.clientele_name}
                    </OnboardingCard>
                  </OnboardingListItem>
                ))}
              </OnboardingList>
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/coach-onboarding">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <Link to="/coach-onboarding-4">
              <OnboardingNextBtn onClick={setClienteles} pinkBtn width="100px">
                Next
              </OnboardingNextBtn>
            </Link>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  currentDomains: state.profile.onboardingProfile.coach_domain_ids,
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
  profile: state.profile,
  profileId: state.profile?.coach_profile?.id ? state.profile.coach_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep2);
