// External Imports
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { SearchOutlined } from '@ant-design/icons';
import 'react-calendar-heatmap/dist/styles.css';

// Internal Imports
import ChallengesActions from 'lib/redux/reducers/challenges';
import ProfileActions from 'lib/redux/reducers/profile';
import { DashboardCard } from 'components/shared/Dashboard';
import ButtonAux from 'components/shared/ButtonAux';
import { Input } from 'components/shared/Form';

import materialStyles from './materialStyles';

import ChallengeList from './assets/challengeList';
import ChallengeTile from './assets/challengeTile';
import AddChallenge from './assets/addChallenge';

import ChallengeErrorBoundary from './assets/challengeErrorBoundary';

const ChallengesTabs = ({
  profile,
  fetching,
  resetState,
  currentChallenge,
  topChallenges,
  enrolledChallenges,
  myChallenges,
  searchResults,
  getMyChallenges,
  getTopChallenges,
  getEnrolledChallenges,
  getSearchedChallenges,
}) => {
  const classes = materialStyles();

  const [reset, setReset] = useState(false);
  const [challengeList, setChallengeList] = useState('top');

  useEffect(() => {
    getTopChallenges();
    getEnrolledChallenges({ user_id: profile.id });
    getMyChallenges({ user_id: profile.id });
  }, []);

  useEffect(() => {
    if (reset) {
      getTopChallenges();
      getEnrolledChallenges({ user_id: profile.id });
      getMyChallenges({ user_id: profile.id });
      resetState();
      setChallengeList('top');
      setReset(false);
    }
  }, [reset]);

  const whichList = () => {
    switch (challengeList) {
      case 'top':
        return topChallenges;
      case 'my':
        return myChallenges;
      case 'enrolled':
        return enrolledChallenges;
      case 'search':
        return searchResults;
      default:
        return topChallenges;
    }
  };

  return (
    <ChallengeErrorBoundary
      errorScreen={
        <Box>
          <Box>
            Woops! something went wrong. Press the reset button to reload the page. (note,
            refreshing will not work)
          </Box>
        </Box>
      }
      reset={() => {
        setReset(true);
      }}
      defaultScreen={
        <Box className={classes.challenges}>
          <Box className={classes.viewChallengesWrapper}>
            <DashboardCard className={classes.viewChallenges}>
              <Box className={classes.challengeListSelectorButtons}>
                <ButtonAux
                  className={
                    challengeList == 'top'
                      ? classes.challengeListSelectorButton1Selected
                      : classes.challengeListSelectorButton1
                  }
                  onClick={() => {
                    setChallengeList('top');
                  }}
                >
                  Top
                </ButtonAux>
                <ButtonAux
                  className={
                    challengeList == 'my'
                      ? classes.challengeListSelectorButton2Selected
                      : classes.challengeListSelectorButton2
                  }
                  onClick={() => {
                    setChallengeList('my');
                  }}
                >
                  Owned by you
                </ButtonAux>
                <ButtonAux
                  className={
                    challengeList == 'enrolled'
                      ? classes.challengeListSelectorButton3Selected
                      : classes.challengeListSelectorButton3
                  }
                  onClick={() => {
                    setChallengeList('enrolled');
                  }}
                >
                  Enrolled
                </ButtonAux>
                <ButtonAux
                  className={
                    challengeList == 'search'
                      ? classes.challengeListSearchButtonSelected
                      : classes.challengeListSearchButton
                  }
                  onClick={() => {
                    setChallengeList('search');
                  }}
                >
                  <SearchOutlined />
                </ButtonAux>
              </Box>
              {challengeList == 'search' && (
                <Input
                  placeholder="search"
                  theme="classic"
                  onChange={(e) => {
                    if (!fetching && e.target.value.length > 3) {
                      getSearchedChallenges({ search_word: e.target.value });
                    }
                  }}
                />
              )}
              <ChallengeList listOfChallenges={whichList()} />
            </DashboardCard>
            <AddChallenge />
          </Box>
          <ChallengeTile />
        </Box>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  topChallenges: state.challenges.topChallenges || [],
  enrolledChallenges: state.challenges.enrolledChallenges || [],
  myChallenges: state.challenges.myChallenges || [],
  searchResults: state.challenges.searchResults || [],
  error: state.auth.error,
  fetching: state.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  resetState: () => dispatch(ChallengesActions.resetStateRequest()),
  getMyChallenges: (filters) => dispatch(ChallengesActions.getMyChallengesRequest(filters)),
  getTopChallenges: () => dispatch(ChallengesActions.getTopChallengesRequest()),
  getEnrolledChallenges: (filters) =>
    dispatch(ChallengesActions.getEnrolledChallengesRequest(filters)),
  getSearchedChallenges: (filters) =>
    dispatch(ChallengesActions.getSearchedChallengesRequest(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesTabs);
