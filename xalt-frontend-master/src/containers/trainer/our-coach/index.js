import React from 'react';

import Container from 'components/shared/Container';
import { BaseTitle, BaseDescription, BaseText, BaseCardSlider } from 'components/shared/General';
import { OurCoachWrapper } from './styles';
import sliderOneImg1 from './img/slide-1-1.png';
import sliderOneImg2 from './img/slide-1-2.png';
import sliderOneImg3 from './img/slide-1-3.png';
import sliderOneImg4 from './img/slide-1-4.png';

import sliderTwoImg1 from './img/slide-2-1.png';
import sliderTwoImg2 from './img/slide-2-2.png';
import sliderTwoImg3 from './img/slide-2-3.png';
import sliderTwoImg4 from './img/slide-2-4.png';

const sliderOneData = [
  {
    id: 1,
    title: 'Assess client’s health, fitness, mobility, & well-being',
    slide: {
      text: 'xAlt’s in-depth, initial client onboarding of general health and lifestyle questions coupled with our patent-pending mobility assessment makes it easy for you to obtain a holistic understanding of your clients.',
      img: sliderOneImg1,
    },
  },
  {
    id: 2,
    title:
      'Help clients identify and create actionable goals that are achievable within their certain circumstances',
    slide: {
      text: 'xAt’s onboarding questions and mobility assessment immediately help you develop relevant, realistic, and attainable goals with each of your clients.',
      img: sliderOneImg2,
    },
  },
  {
    id: 3,
    title: 'Support clients in achieving their goals and hold them accountable, over time',
    slide: {
      text: 'xAlt’s dashboard and calendar provide you with an easy means to check in with your clients once a week, never forgetting where they are with their progress. Revisit goals frequently and assign them action to keep them on track of their goals.',
      img: sliderOneImg3,
    },
  },
  {
    id: 4,
    title: 'Implement individualized programming',
    slide: {
      text: 'Leveraging the information obtained from your clients initial onboarding, as well as from the data on their dashboard, create and implement individualized programming for each client. Everyone has different needs, abilities, and goals. xAlt makes this planning and delivery easy.',
      img: sliderOneImg4,
    },
  },
];

const sliderTwoData = [
  {
    id: 1,
    title: 'Monitor and track client’s progress',
    slide: {
      text: 'With full visibility of your client’s interactive dashboards, xAlt allows you to check in on your client’s progress at any time. We prompt you after each session to record data that is uploaded immediately for tracking.',
      img: sliderTwoImg1,
    },
  },
  {
    id: 2,
    title: 'Educate and raise awareness',
    slide: {
      text: 'The role of an xAlt coach is to maximize knowledge transfer and help clients understand that a holistic approach to health and fitness is necessary to achieve better outcomes. Coaches use our dashboard to guide clients through lasting behaviour change.',
      img: sliderTwoImg2,
    },
  },
  {
    id: 3,
    title: 'Create welcoming and trusting environments for clients to work in',
    slide: {
      text: 'Our members love xAlt because their coach is with them on their health and fitness journey for the long run. As a relationship takes root, a coach fosters support, builds motivation, and delivers confidence.',
      img: sliderTwoImg3,
    },
  },
  {
    id: 4,
    title: 'Commit to continuing education and professionalism',
    slide: {
      text: 'The health and fitness industry is dynamic. xAlt coaches are expected to engage in lifelong learning to stay up to date on the best practices for their clients. Coaches who are professional deliver better results.',
      img: sliderTwoImg4,
    },
  },
];

const OurCoach = () => (
  <OurCoachWrapper>
    <Container medium>
      <BaseTitle>What is an xAlt coach?</BaseTitle>
      <BaseText>
        Coaches meet virtually with clients, one-on-one, on a weekly basis to work towards achieving
        their health and fitness goals. xAlt coaches are experts in maximizing knowledge transfer.
        Coaches support goal-identification and achievement, personal growth, and behaviour
        modification, as well as provide validation, motivation, and accountability for their
        clients. xAlt coaches are professional; they are passionate, dedicated, optimistic,
        adaptable and empathetic.
      </BaseText>
      <BaseDescription m={['32px 0 24px', null, null, '72px 0 32px']}>
        Responsibilities
      </BaseDescription>

      <BaseCardSlider items={sliderOneData} activeColor="red" />

      <BaseCardSlider items={sliderTwoData} activeColor="red" slidePosition="right" />
    </Container>
  </OurCoachWrapper>
);

export default OurCoach;
