/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ButtonAux from 'components/shared/ButtonAux';
import UpgradePlan from '../../../UpgradePlan';

const useStyles = makeStyles(() => ({
  changePlan: {
    background: '#FFF',
    padding: '20px 0 20px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  planWrapper: {
    border: '2px solid #979797',
    boxSizing: 'border-box',
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    position: 'relative',
    marginBottom: 20,
    cursor: 'pointer',

    '&.selected': {
      borderColor: '#E6447D',
    },
  },
  checkIcon: {
    position: 'absolute',
    left: -13,
    top: '40%',
    backgroundColor: '#FFF',
    color: '#E6447D',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    color: '#39393C',
    padding: 10,
    minWidth: 170,
    textAlign: 'center',
  },
  current: {
    fontSize: 14,
    color: '#E6447D',
    fontWeight: 700,
  },
  mainTitle: {
    fontSize: 16,
    fontWeight: 700,
  },
  smallTitle: {
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    color: '#39393C',
    padding: 10,
  },
  price: {
    fontSize: 16,
    padding: 10,
    minWidth: 160,
    textAlign: 'right',
  },
  buttonWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& button:first-child': {
      marginRight: 20,
    },
  },
  prevBtn: {
    backgroundColor: '#979797',
    color: '#FFF',
    border: 'none',
  },
}));

const ChangePlan = ({ subscriptionType, setChangePlanMode }) => {
  const classes = useStyles();
  const [selectedPlan, setSelectedPlan] = useState(subscriptionType);
  const [step, setStep] = useState(1);

  const handleContinue = () => {
    setStep(2);
  };

  const handleBack = () => {
    setChangePlanMode(false);
  };

  return (
    <>
      <Box className={classes.changePlan}>
        {step === 1 ? (
          <>
            <Box
              className={`${classes.planWrapper} ${
                selectedPlan === 'subscription' ? 'selected' : ''
              }`}
              onClick={() => setSelectedPlan('subscription')}
            >
              <Box className={classes.title}>
                {subscriptionType === 'subscription' && (
                  <Box className={classes.current}>Current Plan:</Box>
                )}
                {selectedPlan === 'subscription' && (
                  <Box className={classes.checkIcon}>
                    <CheckCircleIcon />
                  </Box>
                )}
                <Box className={classes.mainTitle}>Annual Program</Box>
                <Box className={classes.smallTitle}>1 day/week for a year</Box>
              </Box>
              <Box className={classes.description}>
                Select this option if you want to train more days a week in the year with your
                coach. <br />
                Whether you are looking for an occasional reminder to keep working toward your
                goals, or want to take your health and fitness to the next level, our certified
                coaches are here all year round to help you get results that really do last!
              </Box>
              <Box className={classes.price}>$1000/year</Box>
            </Box>
            {/* <Box
              className={`${classes.planWrapper} ${selectedPlan === 'custom' ? 'selected' : ''}`}
              onClick={() => setSelectedPlan('custom')}
            >
              <Box className={classes.title}>
                {subscriptionType === 'custom' && (
                  <Box className={classes.current}>Current Plan:</Box>
                )}
                {selectedPlan === 'custom' && (
                  <Box className={classes.checkIcon}>
                    <CheckCircleIcon />
                  </Box>
                )}
                <Box className={classes.mainTitle}>Custom Program</Box>
              </Box>
              <Box className={classes.description}>
                Each of our coaches are unique! They bring their own touch to health and fitness.
                They determine their own rates, schedules, and training philosophies. Browse our
                expert coaches, find your coach, and get started today!
              </Box>
              <Box className={classes.price}>-</Box>
            </Box> */}
            <Box
              className={`${classes.planWrapper} ${
                selectedPlan === 'measurement' ? 'selected' : ''
              }`}
              onClick={() => setSelectedPlan('measurement')}
            >
              <Box className={classes.title}>
                {subscriptionType === 'measurement' && (
                  <Box className={classes.current}>Current Plan:</Box>
                )}
                {selectedPlan === 'measurement' && (
                  <Box className={classes.checkIcon}>
                    <CheckCircleIcon />
                  </Box>
                )}
                <Box className={classes.mainTitle}>Measurement Assessment</Box>
              </Box>
              <Box className={classes.description}>
                Through a 90-minute, 1-on-1 session with your trainer, you will recieve an in-depth
                assessment of your muscular strength, endurance, and mobility for more than 20
                muscle groups and joint segments! Purchase includes lifetime access to a
                personalized report of scores to track and compare overtime!
              </Box>
              <Box className={classes.price}>$150/assessment</Box>
            </Box>
            <Box className={classes.buttonWrapper}>
              <ButtonAux pinkBtn onClick={handleContinue}>
                Continue
              </ButtonAux>
              <ButtonAux className={classes.prevBtn} onClick={handleBack}>
                Go Back
              </ButtonAux>
            </Box>
          </>
        ) : (
          <UpgradePlan subscriptionType={selectedPlan} setStep={setStep} />
        )}
      </Box>
    </>
  );
};

export default ChangePlan;
