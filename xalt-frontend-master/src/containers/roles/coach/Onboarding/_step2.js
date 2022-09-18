import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import DomainsActions from 'lib/redux/reducers/domains';
import ProfileActions from 'lib/redux/reducers/profile';

import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import { CardInputError } from 'components/shared/Checkout';
import {
  OnboardingBlock,
  OnboardingWrapper,
  OnboardingHeader,
  OnboardingMain,
  OnboardingProgress,
  OnboardingStepWrapper,
  OnboardingList,
  OnboardingListItem,
  OnboardingStep,
  OnboardingPrevBtn,
  OnboardingNextBtn,
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import OnboardingCard from 'components/shared/OnboardingCard';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';

const OnboardingStep2 = (props) => {
  const {
    currentDomains,
    domains,
    getFitnesDomainsRequest,
    changeOnboardingProfile,
    role,
    profileId,
    onboardingProfile,
    updateMemberProfileRequest,
  } = props;

  const [isDomainsError, setIsDomainsError] = useState(false);

  const history = useHistory();

  useEffect(() => {
    getFitnesDomainsRequest();
  }, []);

  const selected = currentDomains
    ? currentDomains.split(',')
    : onboardingProfile.fitnes_domains?.reduce((prev, cur) => [...prev, cur.id], []) || [];

  const changeSelected = (domainId) => {
    if (selected.find((item) => item === domainId)) {
      const newArr = selected.filter((item) => item !== domainId);
      changeOnboardingProfile('fitnes_domain_ids', String(newArr));
    } else {
      changeOnboardingProfile('fitnes_domain_ids', String([...selected, domainId]));
    }
  };

  const setDomains = () => {
    if (!(selected.length > 0 && selected.length < 4)) {
      setIsDomainsError(true);
      return;
    }
    updateMemberProfileRequest(onboardingProfile, role, profileId);
    history.push('/coach-onboarding-3');
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 2 of 10</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="20">
            20%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              <Heading center>What is your area of expertise? Select up to 3.</Heading>
              <Paragraph maxWidth="580px" big center>
                Letting us know what you specialize in or are comfortable with helps us pair you to
                clients within your health and fitness domain!
              </Paragraph>
              <OnboardingList>
                {domains.map((domain) => (
                  <OnboardingListItem key={domain.id}>
                    <OnboardingCard
                      checked={!!selected.find((item) => item === domain.id)}
                      onClick={() => changeSelected(domain.id)}
                      id={domain.id}
                      iconName={domain.name.replace(/\s/g, '-')}
                    >
                      {domain.coach_domain_name}
                    </OnboardingCard>
                  </OnboardingListItem>
                ))}
              </OnboardingList>
              {isDomainsError && (
                <CardInputError mt={3}>You must choose from 1 to 3 domains!</CardInputError>
              )}
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
            <div>
              <OnboardingNextBtn onClick={setDomains} pinkBtn width="100px">
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
  domains: state.domains.domains,
  currentDomains: state.profile.onboardingProfile.fitnes_domain_ids,
  onboardingProfile: state.profile.onboardingProfile,
  role: state.profile.role,
  profileId: state.profile?.coach_profile?.id ? state.profile.coach_profile.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getFitnesDomainsRequest: () => dispatch(DomainsActions.getFitnesDomainsRequest('coach')),
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep2);
