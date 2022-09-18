import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import colors from 'lib/theme/colors';

const useStyles = makeStyles(() => ({
  membership: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 450,
    border: '2px solid #FFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 20,
    transition: 'all 0.2s ease-in-out 0s',
    textAlign: 'left',
  },
  leftPanel: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
  },
  rightPanel: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
  },
  info: {
    marginBottom: 20,
    color: '#7E7E7E',
    fontSize: 13,

    '& b': {
      color: '#000',
      fontSize: 16,
      lineHeight: '20px',
    },
  },
  cost: {
    color: '#7E7E7E',
    fontSize: 13,

    '& b': {
      color: colors.darkPink,
      fontSize: 36,
      lineHeight: '20px',
    },
  },
  item: {
    padding: 10,
    borderBottom: '1px solid #DADADA',
    borderLeft: '1px solid #DADADA',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      marginRight: 7,
      color: colors.darkPink,
    },
    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

const OnboardingMembershipCard = (props) => {
  const { subscription } = props;

  const classes = useStyles();

  return (
    <Box className={classes.membership}>
      <Box className={classes.leftPanel}>
        <Box className={classes.info}>
          <b>For members.</b>
          <br />
          {`${subscription.sessions_count} day/week`}
        </Box>
        <Box className={classes.cost}>
          <b>{`$${parseInt(subscription.amount)}`}</b>
          <br />
          {`USD / ${subscription.type === 'monthly' ? 'Month' : 'Year'}`}
        </Box>
      </Box>
      <Box className={classes.rightPanel}>
        <Box className={classes.item}>
          <CheckIcon />
          <span>Unlimited access to the dashboard</span>
        </Box>
        <Box className={classes.item}>
          <CheckIcon />
          <span>Live one-on-one coach every week</span>
        </Box>
        <Box className={classes.item}>
          <CheckIcon />
          <span>1-hour onboarding</span>
        </Box>
        <Box className={classes.item}>
          <CheckIcon />
          <span>Every feature of xAlt</span>
        </Box>
        <Box className={classes.item}>
          <CheckIcon />
          <span>Lifetime of improved health outcomes</span>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingMembershipCard;
