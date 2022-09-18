import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import { theme } from 'components';
import { BaseTitle, BaseText, ArticleItemWithImage } from 'components/shared/General';
import { OnboardingList } from 'components/shared/Onboarding';
import SvgIcon from 'components/shared/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

import SubscriptionsTypes from 'lib/redux/types/subscriptions';
import { Box } from '@material-ui/core';

import Card, { PricingInfoBlock } from './styles';

import image1 from './image1.png';

const { GET_SUBSCRIPTIONS_REQUEST } = SubscriptionsTypes;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    color: '#39393C',
    marginTop: 160,
  },
  title: {
    fontSize: 36,
    lineHeight: '40px',
    letterSpacing: '0.0025em',
    marginBottom: 30,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    width: '60%',
    paddingRight: 50,
    fontSize: 18,
  },
  image: {
    width: '40%',
    border: '6px solid #E6447D',
    boxSizing: 'border-box',
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',

    '& img': {
      width: '100%',
      marginTop: -35,
      marginLeft: -20,
      paddingBottom: 15,
    },
  },
  helperText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10,
  },
}));

const PricingBlock = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: GET_SUBSCRIPTIONS_REQUEST });
  }, []);

  return (
    <Flex bg={theme.colors.white} pt={[6, null, 13, null, null]} pb={[4, null, 8, null, null]}>
      <Container medium>
        <BaseTitle fontWeight="500" m="0 0 4px">
          Products & Pricing
        </BaseTitle>
        <BaseText
          fontSize={['16px', null, '24px']}
          textAlign="center"
          mb={[4, null, 8]}
          fontWeight="400"
        >
          Sessions that are accessible <i>and</i> affordable.
          <br /> xAlt offers annual programs as well as opportunities for traditional training.
        </BaseText>
        <OnboardingList m="32px -12px">
          <Card
            key="annual"
            id="annual"
            description="Whether you are looking for an occasional reminder to keep working toward your goals, or want to take your health and fitness to the next level, our certified coaches are here all year round to help you get results that really do last!"
            boldText="Annual Programs for all of our members and corporate employees."
            title="Annual Program"
            width="100%"
            flexDirection={['column', null, 'column', null]}
            justifyContent="space-between"
            padding={['16px 0', null, 1, null]}
            alignSelf={['center', null, 'center', null]}
            amount={1000}
            type="year"
            info="1 day/week for a year"
            additionalInfo="Monthly financing options available at checkout."
          >
            <>
              <div
                style={{
                  position: 'relative',
                  margin: '50px 0',
                  width: '100%',
                }}
              >
                <PricingInfoBlock>
                  <SvgIcon name="infoBig" width="102px" height="102px" fill="white" />
                  <BaseText color="white">
                    For members that want more weekly coaching sessions, memberships can be upgraded
                    at the checkout page
                  </BaseText>
                </PricingInfoBlock>
              </div>
              <Box className={classes.root}>
                <Box className={classes.title}>Membership Benefits</Box>
                <Box className={classes.content}>
                  <Box className={classes.text}>
                    Included in each membership is unlimited access to xAlt’s interactive{' '}
                    <b>dashboard</b>, including health and fitness reporting and tracking,
                    management tools, action items, and additional resources. Members gain access to
                    a <b>live one-on-one coach</b>, an in-depth <b>onboarding</b> session,
                    <b>resistance bands</b>
                    , and a lifetime of improved health/fitness outcomes!
                    <p />
                    Members meet their coach during a comprehensive onboarding sessions that defines
                    their current health, fitness, and lifestyle status, and marks the beginning of
                    their journey to develop and work towards goals that improve their health and
                    fitness. Members receive insights on their mobility and cardiorespiratory
                    fitness, as well as personalized health and fitness recommendations. On a weekly
                    basis, members are guided with technical instruction on how to maximize their
                    health and fitness through customized programming. The dashboard tracks progress
                    over time.
                    <p />
                    xAlt provides members with access and opportunities to improve their sleep,
                    fitness and mobility, diet/nutrition, stress levels, happiness, and community
                    engagement. Members gain confidence to achieve goals and lasting health
                    outcomes!
                  </Box>
                  <Box className={classes.image}>
                    <img src={image1} alt="" />
                  </Box>
                </Box>
              </Box>
            </>
          </Card>
          {/* <Card
            key="custom"
            id="custom"
            description="Each of our coaches are unique! They bring their own touch to health and fitness. They determine their own rates, schedules, and training philosophies. Browse our expert coaches, find your coach, and get started today!"
            boldText="Custom Programs for all of our members."
            title="Custom Program"
            width="100%"
            flexDirection={['column', null, 'column', null]}
            justifyContent="space-between"
            padding={['16px 0', null, 1, null]}
            alignSelf={['center', null, 'center', null]}
            btnLink="/trainers-showcase"
            btnName="Browser coaches"
            requireCoach
          /> */}
          <Card
            key="rehabilitation"
            id="rehabilitation"
            description="A comprehensive recovery program with you from start to finish."
            boldText=""
            title="Conditioning Product"
            width="100%"
            flexDirection={['column', null, 'column', null]}
            justifyContent="space-between"
            padding={['16px 0', null, 1, null]}
            alignSelf={['center', null, 'center', null]}
            btnName="Buy Now"
            amount={1100}
            type="rehabilitation"
          />
          <Card
            key="measurement"
            id="measurement"
            description="Through a 90-minute, 1-on-1 session with your trainer, you will recieve an in-depth assessment of your muscular strength, endurance, and mobility for more than 20 muscle groups and joint segments! Purchase includes lifetime access to a personalized report of scores to track and compare overtime!"
            boldText="Measurement Assessments available for all of our members."
            title="Measurement Assessment"
            width="100%"
            flexDirection={['column', null, 'column', null]}
            justifyContent="space-between"
            padding={['16px 0', null, 1, null]}
            alignSelf={['center', null, 'center', null]}
            btnName="Buy Now"
            amount={150}
            type="assessment"
            requireCoach
          />
          <Box className={classes.helperText}>
            <sup>*</sup> Members must select a trainer/coach to access this product.
          </Box>
        </OnboardingList>
      </Container>
    </Flex>
  );
};

export default PricingBlock;
