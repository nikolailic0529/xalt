import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DashboardCard } from 'components/shared/Dashboard';

import materialStyles from '../materialStyles';
import ChallengeTitle from './challengeTitle';
import ChallengeDescription from './challengeDescription';
import ChallengeVideo from './challengeVideo';
import ChallengeCalendar from './challengeCalendar';
import ChallengeEnrollButton from './challengeEnrollButton';
import ChallengeCheckIn from './challengeCheckIn';
import ChallengeAdminContent from './challengeAdminContent';

const ChallengeTile = ({ currentChallenge, profile }) => {
  const [enrolled, setEnrolled] = useState(
    currentChallenge != null &&
      currentChallenge.user_member_challenges.find((user_member_challenge) => {
        return user_member_challenge.user_id == profile.id;
      }) != null,
  );

  useEffect(() => {
    setEnrolled(
      currentChallenge != null &&
        currentChallenge.user_member_challenges.find((user_member_challenge) => {
          return user_member_challenge.user_id == profile.id;
        }) != null,
    );
  }, [currentChallenge]);
  const classes = materialStyles();
  return (
    <DashboardCard className={classes.currentChallenge}>
      <ChallengeTitle />
      <ChallengeVideo />
      <ChallengeDescription />
      <ChallengeCalendar enrolled={enrolled} />
      <ChallengeCheckIn enrolled={enrolled} />
      <ChallengeAdminContent />
      <ChallengeEnrollButton setEnrolled={setEnrolled} enrolled={enrolled} />
    </DashboardCard>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeTile);
