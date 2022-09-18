/* eslint-disable react/no-array-index-key */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import CoachesActions from 'lib/redux/reducers/coaches';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContent, ContentBlock } from 'components/shared/General';
import Pagination from 'components/shared/Pagination';
import ButtonAux from 'components/shared/ButtonAux';
import TrainerProfile from './trainer-profile';

const useStyles = makeStyles((theme) => ({
  trainersShowcasePage: {
    background: '#FFF',
    padding: '0px 0 40px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 48,
    width: '100%',
    marginBottom: 50,
  },
  titleDesc: {
    fontSize: 20,
    maxWidth: 600,
  },
  smallTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  top: {
    background: 'url(../../assets/images/trains-showcase-bg.png)',
    backgroundSize: 'cover',
    paddingTop: 100,
    height: 840,
  },
  topBanner: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 1000,
    height: '100%',
    margin: 'auto',
    position: 'relative',
    marginBottom: 70,
  },
  needHelpBlock: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#39393C',
    width: '80%',
    padding: '20px 30px',

    '& h4': {
      color: '#FFF',
      fontSize: 22,
    },
    '& a': {
      color: '#E6447D',
      fontSize: 24,
    },
  },
  trainers: {
    width: '100%',
    maxWidth: 1000,
    paddingTop: 100,
    paddingBottom: 100,
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',

    '& .trainerProfile': {
      marginBottom: 70,
    },
  },
  helpWrapper: {
    background: 'rgba(57, 57, 60, 0.05)',
  },
  help: {
    maxWidth: 1000,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '70px 0',
  },
  helpTitle: {
    fontSize: 40,
  },
  helpDesc: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
  },
  helpBtn: {
    width: 150,
  },
  footer: {
    background:
      "linear-gradient(180deg, rgba(230, 68, 125, 0.3) -13.72%, rgba(255, 171, 61, 0.3) 86.28%), url('assets/images/issa-best-video-camera-personal-trainers-canon-yoga.png')",
    height: 450,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

    '& h2': {
      color: '#FFF',
      textAlign: 'center',
      maxWidth: 1000,
      fontSize: 40,
    },

    '& button': {
      marginTop: 10,
    },
  },
}));

const perPage = 9;

const TrainersShowcasePage = ({ coaches, fetching, isLimit, getCoaches }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [page, setPage] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    getCoaches(page, perPage);
  }, []);

  const onPageChange = (item) => {
    setPage(item);
    getCoaches(item, perPage);
  };

  return (
    <>
      <Header isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
      <MainContent>
        <ContentBlock>
          <Box className={classes.trainersShowcasePage}>
            <Box className={classes.top}>
              <Box className={classes.topBanner}>
                <h1 className={classes.title}>Masters of their craft.</h1>
                <h3 className={classes.titleDesc}>
                  Each of our coaches has a unique style to health and fitness. xAlt pairs you with
                  the one who best fits your goals, lifestyle, and personality!
                </h3>
                <Box className={classes.needHelpBlock}>
                  <h4>Need helping picking a coach?</h4>
                  <a href="/registration?role=member">Let's get started!</a>
                </Box>
              </Box>
            </Box>
            <Box className={classes.trainers}>
              <Grid container spacing={2}>
                {coaches.slice((page - 1) * perPage, page * perPage).map((coach, index) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <TrainerProfile coach={coach} key={index} />
                  </Grid>
                ))}
              </Grid>
              <Pagination
                onPageChange={onPageChange}
                pageNeighbours={1}
                page={page}
                setPage={setPage}
                isLimit={isLimit}
                total={coaches.length}
                perPage={perPage}
              />
            </Box>
            <Box className={classes.helpWrapper}>
              <Box className={classes.help}>
                <Box className={classes.helpTitle}>Need help picking a coach?</Box>
                <Box className={classes.helpDesc}>
                  Take our questionaire to find the coach that&apos;s right for you!
                </Box>
                <ButtonAux pinkBtn className={classes.helpBtn}>
                  <a href="/registration?role=member">Get started</a>
                </ButtonAux>
              </Box>
            </Box>
          </Box>
        </ContentBlock>
      </MainContent>
      <Footer />
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrainersShowcasePage);
