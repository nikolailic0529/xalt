import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Box, makeStyles, Button } from '@material-ui/core';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { MainContent, ContentBlock } from 'components/shared/General';
import AFAALogo from '../../assets/images/logo-AFAA.png';
import NASMLogo from '../../assets/images/logo-NASM.png';
import Image1 from '../../assets/images/img1.png';
import Image2 from '../../assets/images/img2.png';
import Image3 from '../../assets/images/img3.svg';
import Image4 from '../../assets/images/img4.svg';
import Image5 from '../../assets/images/img5.svg';
import Image6 from '../../assets/images/img6.svg';
import Image7 from '../../assets/images/img7.svg';
import Image8 from '../../assets/images/img8.svg';
import Image9 from '../../assets/images/img9.svg';
import Image10 from '../../assets/images/img10.png';
import Image11 from '../../assets/images/img11.png';
import Image12 from '../../assets/images/img12.png';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    color: '#39393C',
  },
  header: {
    background: 'linear-gradient(90deg, #E9ECF2 7.99%, #FFFFFF 99.06%)',
    padding: '140px 0 100px 0',
  },
  content: {
    maxWidth: 1200,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    lineHeight: '60px',
    letterSpacing: '0.0025em',
    color: '#39393C',
    marginBottom: 20,
  },
  description: {
    fontSize: 24,
    marginBottom: 40,
  },
  headerBox: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    borderRadius: 5,
    padding: '20px 80px',
    display: 'flex',
    flexDirection: 'column',

    '& $text': {
      maxWidth: 300,
      textAlign: 'center',
    },
  },
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',

    '& img': {
      maxWidth: 150,
    },
  },
  headerImageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
  },
  headerBgImg: {
    '& img': {
      maxWidth: 400,
    },
  },
  processWrapper: {
    background: '#FFF',
    padding: '100px 0',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 36,
    lineHeight: '60px',
    letterSpacing: '0.0025em',
    color: '#39393C',
    marginBottom: 20,
    textAlign: 'center',
  },
  processImageWrapper: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    '& img': {
      width: '60%',
    },
  },
  box: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    padding: '45px 35px',
    maxWidth: '40%',
    marginLeft: -50,
  },
  customWrapper: {
    background: 'rgba(57, 57, 60, 0.05)',
    padding: '100px 0',

    '& $text': {
      textAlign: 'center',
    },
  },
  customBoxes: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,

    '& $flipCard:first-child': {
      marginRight: 20,
    },

    '& $programCard:first-child': {
      marginRight: 20,
    },
  },
  flipCard: {
    background: '#FFFFFF',
    width: 250,
    height: 200,
    padding: 40,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      height: 70,
      marginBottom: 10,
    },

    '&:hover $flipCardInner': {
      transform: 'rotateY(180deg)',
    },
  },
  flipCardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
  },

  flipCardFront: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    webkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
  },

  flipCardBack: {
    transform: 'rotateY(180deg)',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    webkitBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
  },

  customLightBox: {
    background: '#176888',
    borderRadius: 5,
    margin: 'auto',
    padding: '15px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',

    '& img': {
      marginRight: 40,
    },
  },
  customLightText: {
    color: '#FFF',
    fontSize: 16,
  },
  expertWrapper: {
    background: '#FFF',
    padding: '80px 0',
  },
  expertImageWrapper: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',

    '& img': {
      width: '60%',
    },
  },
  expertBox: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    padding: '40px 30px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 99,
    marginRight: '-50px',
  },
  expertBtn: {
    marginTop: 20,
    cursor: 'pointer',
    color: '#176888',
    border: '1px solid #176888',
    borderRadius: 10,
    padding: '15px 30px',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.2,
    margin: 'auto',
    maxWidth: 150,
  },
  expertBoxTitle: {
    fontSize: 24,
  },
  refiningWrapper: {
    background: 'rgba(57, 57, 60, 0.05)',
    padding: '80px 0',
  },
  refiningContent: {
    maxWidth: 1000,
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  refiningImageWrapper: {
    display: 'flex',
    marginTop: 40,
    marginBottom: 40,
    position: 'relative',

    '& img': {
      width: '50%',
      maxWidth: 500,
      position: 'absolute',
      right: 0,
      top: 50,
      zIndex: 9,
    },

    '&::after': {
      clear: 'both',
    },
  },
  refiningBox: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    padding: '40px 0',
    clipPath: 'polygon(0% 0%, 100% 0%, 85% 50%, 100% 100%, 0% 100%)',
    fontSize: 16,
    zIndex: 999,
    marginRight: -100,
    width: '60%',
    borderRadius: 5,
  },
  refiningBoxContent: {
    maxWidth: 500,
    margin: 'auto',
    paddingRight: 50,
    marginBottom: 100,
  },
  refiningBoxLine: {
    width: '70%',
    position: 'absolute',
    right: -20,
    height: '95%',
    top: '5%',
    border: '3px solid #FDAC4D',
    zIndex: 99,
  },
  programsWrapper: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  programBoxLine: {
    position: 'absolute',
    left: '5%',
    width: '90%',
    height: '100%',
    border: '6px solid #176888',
    top: 50,
    zIndex: 9,
  },
  programContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridRowGap: '20px',
    gridColumnGap: '20px',
    marginTop: 20,
    zIndex: 99,
  },
  programCard: {
    background: '#FFFFFF',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
    padding: '30px 40px',
    fontSize: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  programTitle: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  preventionWrapper: {
    background: '#FFF',
    padding: '80px 0',
  },
  preventionImageWrapper: {
    marginTop: 20,
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',

    '& img': {
      width: '30%',
      marginRight: 30,
    },

    '& $text': {
      maxWidth: 600,
    },
  },
  signUpWrapper: {
    background: 'url(../../assets/images/img13.png) no-repeat center center fixed',
    padding: '150px 0',
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',

    '& $subTitle': {
      color: '#176888',
      marginBottom: 100,
    },
  },
  signUpBtn: {
    background: '#FFFFFF',
    color: '#176888',
    boxShadow: '0px 1px 2px rgba(51, 51, 51, 0.12)',
    borderRadius: 10,
    width: 160,
    textTransform: 'uppercase',
    margin: 'auto',
    height: 48,
    textAlign: 'center',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const RehabilitationPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignup = () => {
    localStorage.setItem(
      'rehabilitation',
      JSON.stringify({
        value: true,
        expiry: Math.floor(Date.now() / 1000),
      }),
    );
    history.push('/registration?role=member');
  };

  return (
    <>
      <Header isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
      <MainContent>
        <ContentBlock>
          <Box className={classes.root}>
            <Box className={classes.header}>
              <Box className={classes.content}>
                <Box className={classes.title}>xAlt Conditioning Program</Box>
                <Box className={classes.description}>
                  A comprehensive recovery program with you from start to finish.
                </Box>
                <Box className={classes.headerImageWrapper}>
                  <Box className={classes.headerBox}>
                    <Box className={classes.logoWrapper}>
                      <img src={AFAALogo} alt="AFAA Approved" />
                      <img src={NASMLogo} alt="NASM Approved" />
                    </Box>
                    <Box className={classes.text}>
                      NASM & AFAA Approved Continuing Education Provider
                    </Box>
                  </Box>
                  <Box className={classes.headerBgImg}>
                    <img src={Image1} alt="" />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.processWrapper}>
              <Box className={classes.content}>
                <Box className={classes.subTitle}>The Regnerative Process</Box>
                <Box className={classes.text}>
                  Platelet Rich Plasma therapy is designed to aid the healing and regeneration of
                  soft tissues such as tendons, ligaments and muscles. Unlike PRP, CytoRich-PRP has
                  two components. The regenerative component is similar to PRP, while the
                  anti-inflammatory component is enriched with anti-inflammatory, anti-catabolic,
                  regenerative proteins that increase the therapeutic potential by enhancing each
                  phase of recovery.
                </Box>
                <Box className={classes.processImageWrapper}>
                  <img src={Image2} alt="" />
                  <Box className={classes.box}>
                    <Box className={classes.text}>
                      The phases of recovery include:
                      <br />
                      1. Inflammation
                      <br />
                      2. Proliferation
                      <br />
                      3. Repair
                      <br />
                      <br />
                      During proliferation, the importance of exercise therapy is pivotal for
                      optimal healing and prevention.
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.customWrapper}>
              <Box className={classes.content}>
                <Box className={classes.subTitle}>Custom Solutions</Box>
                <Box className={classes.text}>
                  The objective of the xAlt Conditioning Program aligns with the crucial phase in
                  the regenerative process. The objective is to deliver patients with individually
                  tailored programs for lasting health and recovery.
                </Box>
                <Box className={classes.customBoxes}>
                  <Box className={classes.row}>
                    <Box className={classes.flipCard}>
                      <Box className={classes.flipCardInner}>
                        <Box className={classes.flipCardFront}>
                          <img src={Image3} alt="" />
                          <Box>Neck & Spine</Box>
                        </Box>
                        <Box className={classes.flipCardBack}>
                          Strengthening these muscles help keep your back and upper body stable,
                          relieve back pain and prevent further injury. Flexibility in the muscles
                          that you strengthen helps restore range of motion and preventing injury.
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.flipCard}>
                      <Box className={classes.flipCardInner}>
                        <Box className={classes.flipCardFront}>
                          <img src={Image4} alt="" />
                          <Box>Shoulder & Rotator Cuff</Box>
                        </Box>
                        <Box className={classes.flipCardBack}>
                          Strengthening these muscles keeps your shoulder joint stable, relieve pain
                          and prevent further injury. Flexibility in the muscles that you strengthen
                          helps restore range of motion and preventing injury.
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.row}>
                    <Box className={classes.flipCard}>
                      <Box className={classes.flipCardInner}>
                        <Box className={classes.flipCardFront}>
                          <img src={Image5} alt="" />
                          <Box>Hip</Box>
                        </Box>
                        <Box className={classes.flipCardBack}>
                          Strengthening these muscles will help keep your hip joint stable, relieve
                          pain and prevent further injury. Flexibility in the muscles that you
                          strengthen helps restore range of motion and preventing injury.
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.flipCard}>
                      <Box className={classes.flipCardInner}>
                        <Box className={classes.flipCardFront}>
                          <img src={Image6} alt="" />
                          <Box>Knee & Lower Body</Box>
                        </Box>
                        <Box className={classes.flipCardBack}>
                          Strengthening these muscles will reduce stress by absorbing more shock.
                          Flexibility is important for restoring range of motion and preventing
                          injury.
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={classes.row}>
                    <Box className={classes.flipCard}>
                      <Box className={classes.flipCardInner}>
                        <Box className={classes.flipCardFront}>
                          <img src={Image7} alt="" />
                          <Box>Elbow</Box>
                        </Box>
                        <Box className={classes.flipCardBack}>
                          Specific exercises to stretch and strengthen the muscles attached to the
                          injured tendon will help with the healing process. The goal is to promote
                          muscle endurance and improve resistance to repetitive stress.
                        </Box>
                      </Box>
                    </Box>
                    <Box className={classes.flipCard}>
                      <Box className={classes.flipCardInner}>
                        <Box className={classes.flipCardFront}>
                          <img src={Image8} alt="" />
                          <Box>Hand & Wrist</Box>
                        </Box>
                        <Box className={classes.flipCardBack}>
                          Exercises that help the median nerve move more freely within the carpal
                          tunnel reduces pain, improve joint range of motion and hand function.
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.customLightBox}>
                  <img src={Image9} alt="" />
                  <Box className={classes.customLightText}>
                    There is considerable evidence that physical reactivation combined with a
                    healthy lifestyle have a positive impact on mental health (reduced stress,
                    better quality sleep, greater self-confidence and quality of life.)
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.expertWrapper}>
              <Box className={classes.content}>
                <Box className={classes.expertImageWrapper}>
                  <Box className={classes.expertBox}>
                    <Box className={classes.expertBoxTitle}>XALT Experts</Box>
                    <Box className={classes.text}>
                      Expertly trained and highly skilled individuals to guide you from beginning to
                      end.
                    </Box>
                    <Link className={classes.expertBtn} to="/trainers-showcase">
                      Learn More
                    </Link>
                  </Box>
                  <img src={Image10} alt="" />
                </Box>
              </Box>
            </Box>
            <Box className={classes.refiningWrapper}>
              <Box className={classes.refiningContent}>
                <Box className={classes.subTitle}>Redefining Recovery</Box>
                <Box className={classes.refiningImageWrapper}>
                  <Box className={classes.refiningBox}>
                    <Box className={classes.refiningBoxContent}>
                      XALT’s highly trained team helps you to progressively build your strength,
                      flexibility, and range of motion to restore your body&apos;s function
                      throughout the recovery process.
                      <br />
                      <br />
                      Whereas typical fitness and rehab outcomes include visiting health care
                      providers on and off with highly time consuming travel and expense often
                      leading to partially completed exercise protocols, and partially rehabilitated
                      patients, XALT’s Conditioning Program redefines expectations and aims to
                      deliver full support and optimal recovery.
                    </Box>
                  </Box>
                  <Box className={classes.refiningBoxLine} />
                  <img src={Image11} alt="" />
                </Box>
                <Box className={classes.programsWrapper}>
                  <Box className={classes.programTitle}>This Program is for Those Who Want: </Box>
                  <Box className={classes.programBoxLine} />
                  <Box className={classes.programContent}>
                    <Box className={classes.programCard}>
                      An assessment of fitness levels, and an evidence-based plan for recovery
                    </Box>
                    <Box className={classes.programCard}>
                      To workout in a safe environment, under the supervision of a health
                      professional
                    </Box>
                    <Box className={classes.programCard}>
                      To optimize their athletic performance, enhance endurance, and increase muscle
                      strength.
                    </Box>
                    <Box className={classes.programCard}>
                      To get back into shape, lose weight, and feel comfortable in their skin
                    </Box>
                    <Box className={classes.programCard}>
                      To protect themselves against diseases such as obesity, type 2 diabetes,
                      cardiovascular disorders, osteoarthritis, Alzheimer’s, etc.
                    </Box>
                    <Box className={classes.programCard}>
                      Technical and motivational support during recovery
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.preventionWrapper}>
              <Box className={classes.content}>
                <Box className={classes.subTitle}>Rehabilitation & Prevention</Box>
                <Box className={classes.preventionImageWrapper}>
                  <img src={Image12} alt="" />
                  <Box className={classes.text}>
                    Rehabilitation by recommending exercises or physical therapy to restore
                    movement, strength and function
                    <br />
                    <br />
                    Prevention with information and treatment plans to prevent injury or slow the
                    progression of disease
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={classes.signUpWrapper}>
              <Box className={classes.subTitle}>GO ALL THE WAY</Box>
              <Button className={classes.signUpBtn} onClick={handleSignup}>
                Sign up now
              </Button>
            </Box>
          </Box>
        </ContentBlock>
      </MainContent>
      <Footer />
    </>
  );
};

export default RehabilitationPage;
