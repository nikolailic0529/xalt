import React from 'react';

import Container from 'components/shared/Container';
import { BaseTitle, BaseDescription, BaseText, BaseCardSlider } from 'components/shared/General';
import { OurChallengeWrapper, SliderScroll } from './styles';
import slide1 from './slide-1.png';
import slide2 from './slide-2.png';
import slide3 from './slide-3.png';

const listData4 = [
  {
    id: 1,
    title: '1-Mile Walking Challenge',
    slide: {
      text: 'xAlt’s 1-Mile Walking Challenge encourages employees to walk 1 mile every day of the work week (20-30 minutes), for a month.',
      img: slide1,
    },
  },
  {
    id: 2,
    title: 'Weight Loss Challenge',
    slide: {
      text: "xAlt's Weight Loss Challenge encourages employees to lose/maintain healthy weight by engaging in healthy daily habits such as prioritizing healthy eating, movement, and quality sleep",
      img: slide2,
    },
  },
  {
    id: 3,
    title: 'Step-Count Challenge',
    slide: {
      text: 'Coming Soon!',
      img: slide3,
    },
  },
];

const OurChallenge = () => (
  <OurChallengeWrapper>
    <Container medium>
      <BaseTitle>Featured Challenges</BaseTitle>
      <SliderScroll items={listData4} activeColor="red" slidePosition="right" />
    </Container>
  </OurChallengeWrapper>
);

export default OurChallenge;
