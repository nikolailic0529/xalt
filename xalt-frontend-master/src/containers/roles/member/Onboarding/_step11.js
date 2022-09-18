/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Spin, Carousel } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { CardInputError } from 'components/shared/Checkout';

import ProfileActions from 'lib/redux/reducers/profile';
import Container from 'components/shared/Container';
import Paragraph from 'components/shared/Paragraph';
import Heading from 'components/shared/Heading';
import CoachesActions from 'lib/redux/reducers/coaches';
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
  OnboadringActionsContainer,
  OnboadringActionsWrapper,
} from 'components/shared/Onboarding';
import XaltLogoLink from 'components/shared/XaltLogoLink';
import LogoutDropdown from 'components/Header/components/LogoutDropdown';
import TrainerProfile from '../../../trainers-showcase/trainer-profile';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 30,
    marginBottom: 60,
    width: '100%',

    '&.plain': {
      display: 'grid',
      gridAutoRows: '1fr',
    },

    '&.center .trainerProfile': {
      margin: 'auto',
    },

    '& .trainerProfile': {
      margin: '0 20px',
    },

    '& .slick-dots button': {
      background: '#979797 !important',
    },

    '& .slick-track': {
      display: 'flex !important',
    },

    '& .slick-slide': {
      height: 'inherit !important',
    },

    '& .slick-slide > div': {
      height: '100%',
    },

    '& .slick-list': {
      padding: '10px 0',
    },

    '& .slick-dots': {
      bottom: '-12px',
    },

    '& .ant-carousel .slick-next::before': {
      content: '>',
      fontSize: 30,
      color: '#232323',
    },

    '& .ant-carousel .slick-prev::before': {
      content: '<',
      fontSize: 30,
      color: '#232323',
    },
  },
}));

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const MAX_COACHES_COUNT = 9;

const OnboardingStep11 = (props) => {
  const {
    loadingCoaches,
    profileId,
    coaches,
    getCoaches,
    bookCoachRequest,
    changeOnboardingProfile,
  } = props;
  const history = useHistory();
  const [selectedCoach, setSelectedCoach] = useState();
  const [isError, setIsError] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    getCoaches(1, MAX_COACHES_COUNT, params.type ? params.type : '');
  }, []);

  const handleNext = () => {
    if (!selectedCoach) {
      setIsError(true);
    } else {
      const coach = coaches.filter((item) => item.coach_profile?.id === selectedCoach);
      changeOnboardingProfile('selected_coach', selectedCoach);
      bookCoachRequest(profileId, coach[0].coach_profile?.id);
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      if (params.type === 'rehabilitation') {
        localStorage.setItem(
          'rehabilitation',
          JSON.stringify({
            value: true,
            expiry: Math.floor(Date.now() / 1000),
          }),
        );
      }
      history.push('/member-onboarding-12');
    }
  };

  const handleSkip = () => {
    changeOnboardingProfile('selected_coach', null);
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    if (params.type === 'rehabilitation') {
      localStorage.setItem(
        'rehabilitation',
        JSON.stringify({
          value: true,
          expiry: Math.floor(Date.now() / 1000),
        }),
      );
    }
    history.push('/member-onboarding-12');
  };

  return (
    <OnboardingBlock>
      <OnboardingWrapper>
        <OnboardingHeader>
          <XaltLogoLink />
          <OnboardingStep>Step 11 of 12</OnboardingStep>
          <LogoutDropdown />
        </OnboardingHeader>
        <OnboardingMain>
          <OnboardingProgress max="100" value="90">
            90%
          </OnboardingProgress>
          <OnboardingStepWrapper>
            <Container min centered mt="40px">
              {loadingCoaches ? (
                <Heading center>
                  Just a moment... we are using your answers to match you to your perfect xAlt
                  coach! <br />
                  <Spin indicator={antIcon} />
                </Heading>
              ) : (
                <>
                  <Heading center>Get started with a Coach!</Heading>
                  <Paragraph maxWidth="580px" big center>
                    These coaches are experts in training for your goals. Select a coach to get
                    started on your health and fitness journey!
                  </Paragraph>
                  {isError && <CardInputError mt={3}>You didn't select a coach!</CardInputError>}
                  <Paragraph maxWidth="1200px" big center>
                    <div
                      className={`${classes.root} ${
                        coaches.length === 1 ? 'center' : coaches.length <= 3 ? 'plain' : ''
                      }`}
                      style={{
                        gridTemplateColumns:
                          coaches.length <= 3 ? `repeat(${coaches.length}, 1fr)` : 'none',
                      }}
                    >
                      {coaches.length > 3 ? (
                        <Carousel arrows slidesToShow={3} slidesToScroll={3}>
                          {coaches.map((coach, index) => (
                            <TrainerProfile
                              coach={coach}
                              key={index}
                              mode="select"
                              showRate
                              selected={coach.coach_profile?.id === selectedCoach}
                              setSelected={setSelectedCoach}
                            />
                          ))}
                        </Carousel>
                      ) : (
                        coaches.map((coach, index) => (
                          <TrainerProfile
                            coach={coach}
                            key={index}
                            mode="select"
                            showRate
                            selected={coach.coach_profile?.id === selectedCoach}
                            setSelected={setSelectedCoach}
                          />
                        ))
                      )}
                    </div>
                  </Paragraph>
                </>
              )}
            </Container>
          </OnboardingStepWrapper>
        </OnboardingMain>
        <OnboadringActionsContainer>
          <OnboadringActionsWrapper justifyContent="space-between">
            <Link to="/member-onboarding-8">
              <OnboardingPrevBtn pinkBrdrBtn width="132px">
                Previous
              </OnboardingPrevBtn>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <OnboardingNextBtn onClick={handleNext} pinkBtn width="100px">
                Next
              </OnboardingNextBtn>
              <div style={{ marginLeft: 15 }} onClick={handleSkip}>
                <OnboardingPrevBtn pinkBrdrBtn width="132px">
                  Skip
                </OnboardingPrevBtn>
              </div>
            </div>
          </OnboadringActionsWrapper>
        </OnboadringActionsContainer>
      </OnboardingWrapper>
    </OnboardingBlock>
  );
};

const mapStateToProps = (state) => ({
  onboardingProfile: state.profile.onboardingProfile || {},
  role: state.profile.role,
  profileId: state.profile?.member_profile?.id ? state.profile.member_profile.id : null,
  coaches: state.coaches.coaches,
  loadingCoaches: state.coaches.fetching,
  isLimit: state.coaches.isLimit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  changeOnboardingProfile: (field, value) =>
    dispatch(ProfileActions.changeOnboardingProfile(field, value)),
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
  getCoaches: (page, per_page, type = '') =>
    dispatch(CoachesActions.getCoachesRequest(page, per_page, type)),
  bookCoachRequest: (member_profile_id, coach_profile_id) =>
    dispatch(ProfileActions.bookCoachRequest(member_profile_id, coach_profile_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingStep11);
