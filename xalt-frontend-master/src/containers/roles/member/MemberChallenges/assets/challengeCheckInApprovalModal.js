import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { Modal } from 'antd';
import confirm from 'antd/lib/modal/confirm';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import ChallengesActions from 'lib/redux/reducers/challenges';
import ButtonAux from 'components/shared/ButtonAux';

import materialStyles from '../materialStyles';
import ChallengeCheckInApprovalBar from './challengeCheckInApprovalBar';

const ChallengeCheckInApprovalModal = ({
  currentChallenge,
  profile,
  updateCheckInForChallenge,
}) => {
  const classes = materialStyles();
  const [isVisible, setIsVisible] = useState(false);

  if (!currentChallenge) {
    return null;
  }

  if (currentChallenge.user.id != profile.id) {
    return null;
  }

  return (
    <Box>
      <Modal
        className={classes.adminApprovalModal}
        bodyStyle={{ paddingTop: 0 }}
        centered={true}
        destroyOnClose={true}
        closable={false}
        footer={null}
        visible={isVisible}
        onCancel={() => {
          setIsVisible(false);
        }}
      >
        <Box className={classes.columnFlex}>
          <Box className={classes.challengeCheckInApprovalHeader}>
            <Box className={classes.challengeListHeader}>Approve Checkins</Box>
            <ButtonAux
              onClick={() => {
                confirm({
                  title: 'Are you sure you want to Approve ALL checkins',
                  icon: <ExclamationCircleOutlined />,
                  content: '',
                  onOk() {
                    const to_update = currentChallenge.user_member_challenge_check_ins.filter(
                      (checkin) => {
                        return checkin.checkin_status == 'unverified';
                      },
                    );

                    if (to_update.length == 0) {
                      return;
                    }

                    updateCheckInForChallenge({
                      challenge_id: currentChallenge.id,
                      user_member_challenge_check_ins: to_update.map((val) => {
                        return {
                          ...val,
                          checkin_date: moment(val.checkin_date).format(),
                        };
                      }),
                    });
                  },
                  onCancel() {},
                });
              }}
            >
              Approval All
            </ButtonAux>
          </Box>
          <ul>
            {currentChallenge.user_member_challenge_check_ins.map((check_in) => {
              if (check_in.checkin_status == 'verified') {
                return null;
              }
              return (
                <li key={check_in.id}>
                  <ChallengeCheckInApprovalBar checkIn={check_in} />
                </li>
              );
            })}
          </ul>
          <Box className={classes.challengeCheckInApprovalFooter}>
            <ButtonAux
              onClick={() => {
                setIsVisible(false);
              }}
            >
              Close
            </ButtonAux>
          </Box>
        </Box>
      </Modal>
      <ButtonAux
        onClick={() => {
          setIsVisible(true);
        }}
      >
        Approve Check-ins
      </ButtonAux>
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
    updateCheckInForChallenge: (data) =>
      dispatch(ChallengesActions.updateCheckInForChallengeRequest(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengeCheckInApprovalModal);
