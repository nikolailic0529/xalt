/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';
import { Carousel } from 'antd';
import ButtonAux from 'components/shared/ButtonAux';
import CoachesActions from 'lib/redux/reducers/coaches';
import TrainerProfile from '../../trainers-showcase/trainer-profile';

const useStyles = makeStyles(() => ({
  root: {
    background: 'rgba(57, 57, 60, 0.05)',
    width: '100%',
  },
  coachList: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 800,
    margin: 'auto',
    padding: '40px 0',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    lineHeight: '60px',
    textAlign: 'center',
    letterSpacing: '0.0025em',
    color: '#39393C',
  },
  coaches: {
    marginTop: 30,
    marginBottom: 60,
    width: '100%',

    '&.plain': {
      display: 'grid',
      gridAutoRows: '1fr',
    },

    '&.center .trainerProfile': {
      margin: 'auto',
    },

    '& .trainerProfile': {
      margin: '0 20px',
    },

    '& .slick-dots button': {
      background: '#979797 !important',
    },

    '& .slick-track': {
      display: 'flex !important',
    },

    '& .slick-slide': {
      height: 'inherit !important',
    },

    '& .slick-slide > div': {
      height: '100%',
    },

    '& .slick-list': {
      padding: '10px 0',
    },

    '& .slick-dots': {
      bottom: '-12px',
    },

    '& .ant-carousel .slick-next::before': {
      content: '>',
      fontSize: 30,
      color: '#232323',
    },

    '& .ant-carousel .slick-prev::before': {
      content: '<',
      fontSize: 30,
      color: '#232323',
    },
  },
  buttonsWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: 'auto',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 20px',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: '40px',
    textAlign: 'center',
    letterSpacing: '0.0025em',
    color: '#E6447D',
  },
  btn: {
    marginTop: 10,
  },
}));

const CoachList = ({ coaches, getCoaches, fetching }) => {
  const classes = useStyles();
  const page = 1;
  const perPage = 10;

  useEffect(() => {
    getCoaches(page, perPage);
  }, []);

  return (
    <Box className={classes.root}>
      <Box className={classes.coachList}>
        <Box className={classes.title}>Our Coaches & Trainers</Box>
        <Box
          className={`${classes.coaches} ${
            coaches.length === 1 ? 'center' : coaches.length <= 3 ? 'plain' : ''
          }`}
          style={{
            gridTemplateColumns: coaches.length <= 3 ? `repeat(${coaches.length}, 1fr)` : 'none',
          }}
        >
          {coaches.length > 3 ? (
            <Carousel arrows slidesToShow={3} slidesToScroll={3}>
              {coaches.map((coach, index) => (
                <TrainerProfile
                  coach={coach}
                  key={index}
                  mode="picture-only"
                  showRate
                  selected={false}
                  setSelected={() => {}}
                />
              ))}
            </Carousel>
          ) : (
            coaches.map((coach, index) => (
              <TrainerProfile
                coach={coach}
                key={index}
                mode="picture-only"
                showRate
                selected={false}
                setSelected={() => {}}
              />
            ))
          )}
        </Box>
        <Box className={classes.buttonsWrapper}>
          <Box className={classes.buttonContainer}>
            <Box className={classes.label}>Members</Box>
            <ButtonAux pinkBtn className={classes.btn}>
              <a href="/trainers-showcase">Find a coach/trainer</a>
            </ButtonAux>
          </Box>
          <Box className={classes.buttonContainer}>
            <Box className={classes.label}>Coaches/Trainers</Box>
            <ButtonAux pinkBtn className={classes.btn}>
              <a href="/registration?role=coach">Showcase yourself</a>
            </ButtonAux>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  coaches: state.coaches.coaches,
  fetching: state.coaches.fetching,
  isLimit: state.coaches.isLimit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getCoaches: (page, per_page) => dispatch(CoachesActions.getCoachesRequest(page, per_page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoachList);
