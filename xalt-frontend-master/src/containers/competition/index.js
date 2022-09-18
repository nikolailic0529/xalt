/* eslint-disable global-require */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid } from '@material-ui/core';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContent, ContentBlock } from 'components/shared/General';
import ButtonAux from 'components/shared/ButtonAux';
import Text from 'components/shared/Text';

const useStyles = makeStyles((theme) => ({
  competitionPage: {
    background: '#FFF',
    padding: '100px 0 40px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 48,
    width: '100%',
    marginBottom: 0,
  },
  titleDesc: {
    fontSize: 24,
  },
  smallTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  top: {
    maxWidth: 1000,
    margin: 'auto',
    textAlign: 'center',
    marginBottom: 50,
  },
  topBanner: {
    maxWidth: 1000,
    margin: 'auto',
    position: 'relative',
    marginBottom: 70,
  },
  topBannerImgWrapper: {
    width: 1000,

    '& img': {
      maxWidth: 650,
    },

    [theme.breakpoints.down(1000)]: {
      width: 'auto',
      '& img': {
        width: '100%',
      },
    },
  },
  topBannerWrapper: {
    position: 'absolute',
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    maxWidth: 400,
    padding: '65px 55px',
    fontSize: 18,
    right: 0,
    top: 40,
    textAlign: 'center',

    '& b': {
      fontSize: 20,
      margin: '0 8px',
    },

    '& button': {
      marginTop: 10,
    },

    [theme.breakpoints.down(1000)]: {
      position: 'relative',
      margin: '20px 10px',
      padding: 40,
      textAlign: 'center',
    },
  },
  instructionContainer: {
    backgroundColor: 'rgba(57, 57, 60, 0.05)',
    [theme.breakpoints.down(1000)]: {
      padding: 15,
    },
  },
  instruction: {
    maxWidth: 880,
    margin: 'auto',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '80px 0 50px',

    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column',
    },
  },
  bannerImg: {
    zIndex: 99,
    width: '100%',
  },
  instructionWrapper: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    padding: 40,
    fontSize: 18,
    marginLeft: -50,
    maxWidth: 650,
    position: 'relative',
    zIndex: 999,

    '& h3': {
      fontSize: 24,
      marginBottom: 25,
    },

    '& p': {
      margin: 0,
    },

    '& span': {
      fontSize: 14,
    },

    [theme.breakpoints.down(1000)]: {
      marginLeft: 0,
    },
  },
  imageWrapper: {
    zIndex: 99,
    maxWidth: 250,
  },
  exampleContainer: {
    maxWidth: 880,
    margin: '0px auto 90px',

    [theme.breakpoints.down(1000)]: {
      padding: 15,
    },
  },
  prizeContainer: {
    backgroundColor: 'rgba(57, 57, 60, 0.05)',
    padding: '0 0 50px 0',

    [theme.breakpoints.down(1000)]: {
      padding: 15,
    },
  },
  prizeWrapper: {
    maxWidth: 880,
    margin: '0 auto 25px',
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    padding: '25px 50px',
    fontSize: 18,
    textAlign: 'center',

    [theme.breakpoints.down(1000)]: {
      padding: 25,
    },
  },
  linkWrapper: {
    marginTop: 40,
    display: 'flex',

    '& a': {
      width: '100%',
      maxWidth: 300,
      height: '100%',
    },
  },
  subTitle: {
    fontSize: 32,
    textAlign: 'center',
    margin: '80px 0 50px 0',
  },
  rulesContainer: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down(1000)]: {
      padding: 15,
    },
  },
  rulesWrapper: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    padding: 40,
    fontSize: 18,
    maxWidth: 880,
    position: 'relative',
    zIndex: 999,
    margin: '-100px auto 100px',

    '& p': {
      margin: 0,
    },
    '& span': {
      margin: 0,
      display: 'block',
      paddingLeft: 40,
    },

    [theme.breakpoints.down(1000)]: {
      margin: '10px auto 70px',
    },
  },
  rulesImgWrapper: {
    maxWidth: 1000,
    margin: 'auto',
  },
  rulesImg: {
    width: '100%',
  },
  highlightWrapper: {
    background: '#176888',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    padding: 25,
    color: '#FFF',
    maxWidth: 720,
    margin: 'auto',
    fontSize: 18,

    '& img': {
      width: 60,
      marginRight: 20,

      [theme.breakpoints.down(1000)]: {
        display: 'none',
      },
    },
  },
  finalWrapper: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    padding: '70px 30px',
    fontSize: 18,
    maxWidth: 570,
    position: 'relative',
    zIndex: 999,
    margin: 'auto',

    '& p': {
      fontSize: 20,
      color: '#E6447D',
      margin: 0,
    },

    [theme.breakpoints.down(1000)]: {
      padding: 25,
    },
  },
  videoImg: {
    width: 265,
    height: 265,
  },
  final: {
    display: 'flex',
    maxWidth: 1000,
    margin: '0 auto 80px',

    [theme.breakpoints.down(1000)]: {
      flexDirection: 'column',
    },
  },
  finalImgWrapper: {
    marginLeft: -80,
    '& img': {
      width: '100%',
      maxWidth: 500,
    },

    [theme.breakpoints.down(1000)]: {
      marginLeft: 0,
    },
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

const CompetitionPage = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <Header isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
      <MainContent>
        <ContentBlock>
          <Box className={classes.competitionPage}>
            <Box className={classes.top}>
              <h1 className={classes.title}>xAlt Exercise Submission Competitions</h1>
              <h3 className={classes.titleDesc}>For xAlt Coaches & Trainers</h3>
            </Box>
            <Box className={classes.topBanner}>
              <Box className={classes.topBannerImgWrapper}>
                <img
                  src="assets/images/The-Online-Fitness-Coach-of-Today-Epic-Virtual-Fitness-Class.jpg"
                  alt=""
                />
              </Box>
              <Box className={classes.topBannerWrapper}>
                WIN
                <b>$1,000+</b>
                by submitting the best exercise demonstration video on the xAlt platform!
                <br />
                <ButtonAux pinkBrdrBtn>
                  <Text darkPink uppercase>
                    Submit A video
                  </Text>
                </ButtonAux>
              </Box>
            </Box>
            <Box className={classes.instructionContainer}>
              <Box className={classes.instruction}>
                <Box className={classes.imageWrapper}>
                  <img
                    className={classes.bannerImg}
                    src="assets/images/Which-Full-Body-Resistance-Band-Exercises-Can-I-Do-1.png"
                    alt=""
                  />
                </Box>
                <Box className={classes.instructionWrapper}>
                  <h3>Getting Started</h3>
                  <p>1. Select 1 of 25 exercises from our list</p>
                  <p>
                    2. Record yourself, a client, or a friend performing the exercise, while clearly
                    explaining set-up, procedure and technique (you can be both the trainer and the
                    model)
                  </p>
                  <p>3. Submit your video by contacting Laura at laura.magas@xalt.fit</p>
                  <br />
                  <span>*All voting is registered and tracked on xAlt</span>
                </Box>
              </Box>
            </Box>
            <Box className={classes.rulesContainer}>
              <h3 className={classes.subTitle}>Competition Rules</h3>
              <Box className={classes.rulesImgWrapper}>
                <img className={classes.rulesImg} src="assets/images/WeightedPushup 1.png" alt="" />
              </Box>
              <Box className={classes.rulesWrapper}>
                <p>1. Video submissions must include:</p>
                <span>- Your name</span>
                <span>- Name of exercise being performed</span>
                <span>- Targeted body region/muscle group(s)</span>
                <span>- Any necessary set up to perform the exercise</span>
                <span>
                  - A brief explanation of why the exercise is good to use with clients (i.e. how it
                  helps improve health and longevity)
                </span>
                <p>2. Coaches/trainers must be dressed prodessionally</p>
                <p>
                  3. Coaches/trainers must have good lighting and camera set-up, and clear audio
                </p>
                <p>4. Videos should target 45 seconds in length, not exceeding 90 seconds </p>
              </Box>
              <Box className={classes.exampleContainer}>
                <h4 className={classes.smallTitle}>
                  See submission examples from xAlt coaches Cory, Hamza & Stuart
                </h4>
                <Box className={classes.linkWrapper}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <a
                        href="https://drive.google.com/file/d/1Uj91m0ydgNTgmVxKbRCa2rOlHrrIWlp_/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={classes.videoImg}
                          src="assets/images/example-1.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <a
                        href="https://drive.google.com/file/d/1iqLpKHGS5twrPsRD5O5U-m_J0WfTjpru/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={classes.videoImg}
                          src="assets/images/example-2.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <a
                        href="https://drive.google.com/file/d/1FGcFFFfPloCmKodgjfMCLFEl-T8Bl9PU/view?usp=sharing"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          className={classes.videoImg}
                          src="assets/images/example-3.png"
                          alt=""
                        />
                      </a>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Box className={classes.prizeContainer}>
                <h3 className={classes.subTitle}>Prizes</h3>
                <Box className={classes.prizeWrapper}>
                  <b>$1,000 </b>
                  to the coach/trainer who submits an exercise demonstration video that is voted
                  <b> most well done/popular</b>
                </Box>
                <Box className={classes.prizeWrapper}>
                  <b>$250 </b>
                  to the coach/trainer who recieves the
                  <b> most likes </b>
                  on each of the following platforms: Instagram, TikTok, Facebook, LinkedIn &
                  YouTube, tagging xAlt.fit
                  <br />
                  <b>$100 </b>
                  for second prize
                  <br />
                  <b>$50 </b>
                  for third prize
                </Box>
                <Box className={classes.prizeWrapper}>
                  <b>$1,000 </b>
                  to the coach/trainer who refers the most other trainers to submit a video on
                  xAlt’s platform
                </Box>
              </Box>
              <Box className={classes.finalContainer}>
                <h3 className={classes.subTitle}>Current Competition Deadlines</h3>
                <Box className={classes.final}>
                  <Box className={classes.finalWrapper}>
                    <p>Video Submissions: December 1st, 2021. </p>
                    <p>Voting Submissions: December 15th, 2021. </p>
                    <p>Announcement of winners: December 16th, 2021.</p>
                  </Box>
                  <Box className={classes.finalImgWrapper}>
                    <img src="assets/images/filming-fitness-at-home-5806-4-1.png" alt="" />
                  </Box>
                </Box>
              </Box>
              <Box className={classes.footer}>
                <h2>
                  xAlt is a community-based platform that is built by our trainers, for our
                  trainers. Join the fun!
                </h2>
                <ButtonAux whitePinkBtn>
                  <Text darkPink uppercase>
                    Submit A video
                  </Text>
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

export default CompetitionPage;
