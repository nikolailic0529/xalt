import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { Input } from 'antd';

import ChallengesActions from 'lib/redux/reducers/challenges';
import materialStyles from '../materialStyles';
import ChallengeCalendarParticipantBar from './challengeCalendarParticipantBar';

const ChallengeCalendarParticipantList = ({ currentChallenge, setUser }) => {
  const classes = materialStyles();
  const [userFilter, setUserFilter] = useState('');
  if (!currentChallenge) {
    return null;
  }

  return (
    <Box className={classes.challengeCalendarParticipantList}>
      <Input
        className={classes.challengeCalendarParticipantSearch}
        allowClear
        placeholder="filter users"
        theme="classic"
        onChange={(e) => {
          setUserFilter(e.target.value);
        }}
      />
      <ul>
        {currentChallenge.user_member_challenges.map((user_member_challenge) => {
          if (!user_member_challenge.user.name.toLowerCase().includes(userFilter.toLowerCase())) {
            return null;
          }
          return (
            <li key={user_member_challenge.id}>
              <ChallengeCalendarParticipantBar
                user={user_member_challenge.user}
                setUser={setUser}
              />
            </li>
          );
        })}
      </ul>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    setUser: ownProps.setUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCalendarParticipantList);
