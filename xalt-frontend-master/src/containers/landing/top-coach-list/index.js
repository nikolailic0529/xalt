/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ButtonAux from 'components/shared/ButtonAux';

const useStyles = makeStyles(() => ({
  root: {
    background: 'rgba(57, 57, 60, 0.05)',
    width: '100%',
  },
  wrapper: {
    maxWidth: 1200,
    margin: 'auto',
    display: 'flex',
    padding: '80px 0',
  },
  image: {
    display: 'flex',
    maxWidth: 350,

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  showcase: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: '80px 40px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    lineHeight: '60px',
    textAlign: 'center',
    letterSpacing: '0.0025em',
    color: '#39393C',
  },
  btn: {
    marginTop: 30,
    marginBottom: 50,
  },
  description: {
    fontSize: 22,
    lineHeight: '28px',
    letterSpacing: '0.2px',
    color: '#39393C',
    marginTop: 30,
    textAlign: 'center',
  },
}));

const TopCoachList = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <Box className={classes.image}>
          <img src="../../../assets/images/coach-showcase.png" alt="" />
        </Box>
        <Box className={classes.showcase}>
          <Box className={classes.title}>Our Featured Coaches and Trainers</Box>
          <Box className={classes.description}>
            xAlt allows coaches and trainers to showcase their talents to potential future clients.
            Select a coach/trainer to help you elevate your health and fitness, today!
          </Box>
          <ButtonAux
            pinkBtn
            className={classes.btn}
            onClick={() => history.push('/trainers-showcase')}
          >
            <a href="/registration?role=coach">Find a coach/trainer</a>
          </ButtonAux>
        </Box>
      </Box>
    </Box>
  );
};

export default TopCoachList;
