import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';

import ChallengesActions from 'lib/redux/reducers/challenges';
import ButtonAux from 'components/shared/ButtonAux';
import Icon from 'components/shared/Icon';

import materialStyles from '../materialStyles';

const ChallengeCheckInApprovalBar = ({ currentChallenge, checkIn, createCheckInForChallenge }) => {
  const classes = materialStyles();
  if (!currentChallenge) {
    return null;
  }

  const user = currentChallenge.user_member_challenges.find((user_member_challenge) => {
    return user_member_challenge.user_id == checkIn.user_id;
  })?.user;

  if (!user) {
    return null;
  }

  return (
    <Box className={classes.challengeCheckInApprovalBar}>
      <Box>
        <Box className={classes.rowFlexSpaceBetween}>
          <Icon src={user.avatar.url || 'empty-user-profile'} />
          <Box className={classes.challengeCalendarParticipantBarName}>{user.name}</Box>
        </Box>
        {checkIn.comments && checkIn.comments != '' && <Box>Comments: {checkIn.comments}</Box>}
        {checkIn.proof && checkIn.proof != '' && <Box>Proof: {checkIn.proof}</Box>}
        <Box>Date: {moment(checkIn.checkin_date).format('dddd, MMMM Do YYYY')}</Box>
      </Box>
      <Box className={classes.challengeApprovalBarButtons}>
        <Box>
          <ButtonAux
            className={classes.challengeCheckInApprove}
            onClick={() => {
              createCheckInForChallenge({
                user_member_challenge_check_in: {
                  member_challenge_id: checkIn.member_challenge_id,
                  user_id: checkIn.user_id,
                  checkin_date: moment(checkIn.checkin_date).format(),
                },
              });
            }}
          >
            <CheckOutlined />
          </ButtonAux>
          {/*<ButtonAux className={classes.challengeCheckInDeny}>
            <CloseOutlined />
          </ButtonAux>*/}
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    checkIn: ownProps.checkIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    createCheckInForChallenge: (data) =>
      dispatch(ChallengesActions.createCheckInForChallengeRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCheckInApprovalBar);
