import React from 'react';
import { Box } from '@material-ui/core';
import moment from 'moment';

import ButtonAux from 'components/shared/ButtonAux';
import Icon from 'components/shared/Icon';

import materialStyles from '../materialStyles';

const ChallengeCalendarCheckinBar = ({ checkIn, user, filterTerm }) => {
  const classes = materialStyles();

  if (!checkIn) {
    return (
      <Box className={classes.challengeCalendarCheckInBarWrapper}>
        <Box className={classes.challengeCheckInApprovalBarNoneFound}>
          <Box>No checkin for {user.name} on this day</Box>
        </Box>
      </Box>
    );
  }

  if (!user) {
    return null;
  }

  if (!user.name.toLowerCase().includes(filterTerm.toLowerCase())) {
    return null;
  }

  const proof = () => {
    try {
      URL(checkIn.proof);
      return (
        <a href={checkIn.proof} target="_blank">
          Proof
        </a>
      );
    } catch (_) {
      return checkIn.proof;
    }
  };

  return (
    <Box className={classes.challengeCalendarCheckInBarWrapper}>
      <Box className={classes.challengeCheckInApprovalBar}>
        <Box>
          <Box className={classes.rowFlexFlexStart}>
            <Icon src={user?.avatar?.url || 'empty-user-profile'} />
            <Box className={classes.challengeCalendarParticipantBarName}>{user.name}</Box>
          </Box>
          {checkIn.comments && checkIn.comments != '' && (
            <Box className={classes.challengeCalendarParticipantBarComment}>{checkIn.comments}</Box>
          )}
          {checkIn.proof && checkIn.proof != '' && <Box>{proof()}</Box>}
        </Box>
      </Box>
    </Box>
  );
};

export default ChallengeCalendarCheckinBar;
