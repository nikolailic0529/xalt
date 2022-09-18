import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import { Modal, Input } from 'antd';
import './reactCalendarStyle.css';

import ChallengesActions from 'lib/redux/reducers/challenges';
import ButtonAux from 'components/shared/ButtonAux';

import materialStyles from '../materialStyles';
import ChallengeCalendarCheckinBar from './challengeCalendarCheckinBar';

const ChallengeCalendarDisplay = ({ currentChallenge, profile, userId, enrolled }) => {
  const classes = materialStyles();

  const [userFilter, setUserFilter] = useState('');
  const [dateSelected, setDateSelected] = useState(moment().toDate());
  const [isVisible, setIsVisible] = useState(false);
  const [restVisible, setRestVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);
    setRestVisible(false);
    setDateSelected(moment().toDate());
  }, [currentChallenge]);

  useEffect(() => {
    setRestVisible(false);
    setUserFilter('');
  }, [dateSelected]);

  const findCheckin = (date) => {
    return currentChallenge.user_member_challenge_check_ins.find((check_in) => {
      return (
        moment(date).utc().isSame(moment(check_in.checkin_date).utc(), 'day') &&
        check_in.user_id == userId
      );
    });
  };

  if (!currentChallenge) {
    return null;
  }

  if (!enrolled) {
    return null;
  }

  return (
    <Box className={classes.challengeCalendarMainWrapper}>
      <Calendar
        minDetail="month"
        maxDetail="month"
        defaultView="month"
        minDate={moment(currentChallenge.start).toDate()}
        maxDate={moment(currentChallenge.end).toDate()}
        tileClassName={({ _, date, __ }) => {
          const checkIn = findCheckin(date);
          if (!checkIn) {
            return classes.challengeCalendarDayColorDefault;
          }

          if (checkIn.checkin_status == 'verified') {
            return classes.challengeCalendarDayColorVerified;
          }

          if (checkIn.checkin_status == 'unverified') {
            return classes.challengeCalendarDayColorUnverified;
          }
        }}
        tileDisabled={({ activeStartDate, date, view }) => {
          if (date.getDay() == 0 || date.getDay() == 6) {
            return true;
          }
          return currentChallenge.schedule.charAt(date.getDay() - 1) == '-';
        }}
        onClickDay={(date, event) => {
          setIsVisible(true);
          setDateSelected(date);
        }}
      />
      <Modal
        className=""
        bodyStyle={{ paddingTop: 10 }}
        centered={true}
        destroyOnClose={true}
        closable={false}
        footer={null}
        visible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
      >
        <Box>
          <Box className={classes.rowFlexSpaceBetween}>
            <Box className={classes.challengeCalendarDate}>
              {moment(dateSelected).format('dddd, MMMM Do YYYY')}
            </Box>
            <ButtonAux
              onClick={() => {
                setRestVisible(!restVisible);
              }}
            >
              {!restVisible ? 'Show other checkins' : 'show less'}
            </ButtonAux>
          </Box>
          <ChallengeCalendarCheckinBar
            checkIn={findCheckin(dateSelected)}
            filterTerm={userFilter}
            user={
              currentChallenge.user_member_challenges.find((user_member_challenge) => {
                return user_member_challenge.user_id == userId;
              })?.user || {}
            }
          />
          <Box className={classes.challengeCalendarShowMoreButtonWrapper}></Box>
          {restVisible ? (
            <>
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
                {currentChallenge.user_member_challenge_check_ins.map((check_in) => {
                  if (
                    moment(dateSelected).utc().isSame(moment(check_in.checkin_date).utc(), 'day') &&
                    check_in.user_id != userId
                  ) {
                    return (
                      <li key={check_in.id}>
                        <ChallengeCalendarCheckinBar
                          filterTerm={userFilter}
                          checkIn={check_in}
                          user={
                            currentChallenge.user_member_challenges.find(
                              (user_member_challenge) => {
                                return user_member_challenge.user_id == check_in.user_id;
                              },
                            )?.user || null
                          }
                        />
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </>
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    currentChallenge: state.challenges.currentChallenge,
    profile: state.profile,
    userId: ownProps.userId,
    enrolled: ownProps.enrolled,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCalendarDisplay);
