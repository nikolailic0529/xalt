/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ButtonAux from 'components/shared/ButtonAux';

const useStyles = makeStyles(() => ({
  root: {
    background: 'rgba(57, 57, 60, 0.05)',
    width: '100%',
    display: 'flex',
  },
  image: {
    display: 'flex',
    maxWidth: 400,

    '& img': {
      width: '100%',
      height: '100%',
    },
  },
  browseCoaches: {
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
  wrapper: {
    maxWidth: 700,
    background: '#39393C',
    padding: '25px 0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',

    '& a': {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#E6447D',
    },
  },
  label: {
    fontSize: 28,
    lineHeight: '40px',
    color: '#fff',
    fontWeight: 'bold',
  },
}));

const BrowseCoaches = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Box className={classes.root}>
      <Box className={classes.image}>
        <img src="../../../assets/images/browse-coach.png" alt="" />
      </Box>
      <Box className={classes.browseCoaches}>
        <Box className={classes.title}>Browse our Expert Coaches and Get Started Today!</Box>
        <ButtonAux
          pinkBtn
          className={classes.btn}
          onClick={() => history.push('/trainers-showcase')}
        >
          Browse coaches
        </ButtonAux>
        <Box className={classes.wrapper}>
          <Box className={classes.label}>Need helping picking a coach?</Box>
          <a href="/registration?role=member">TAKE THE QUESTIONNAIRE</a>
        </Box>
      </Box>
    </Box>
  );
};

export default BrowseCoaches;
