import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';

import ChallengeCheckInApprovalModal from './challengeCheckInApprovalModal';
import EditChallenge from './editChallenge';

const ChallengeAdminContent = ({ currentChallenge, profile }) => {
  const classes = materialStyles();

  return (
    <Box className={classes.challengeAdminContent}>
      {currentChallenge?.user?.id == profile.id && <Box className={classes.challengeListHeader}>Challenge Management</Box> }
      <Box className={classes.rowFlexSpaceBetween}>
        <ChallengeCheckInApprovalModal />
        <EditChallenge />
      </Box>
    </Box>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeAdminContent);
