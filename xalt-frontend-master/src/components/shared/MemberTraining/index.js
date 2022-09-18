import React from 'react';

import Container from 'components/shared/Container';
import {
  BaseTitle,
  BaseSlogan,
  BaseDescription,
  BaseCardSlider,
  BaseTwoPointCardList,
  BaseTwoPointCardItem,
  SimpleWideImageBlock,
} from 'components/shared/General';
import { MemberTrainingWrapper } from './styles';
import image1 from './member-training-bg-1.png';
import image2 from './member-training-bg-2.png';
import slide1 from './slide-1.png';
import slide2 from './slide-2.png';
import slide3 from './slide-3.png';
import slide4 from './slide-4.png';
import slide5 from './slide-5.png';
import slide6 from './slide-6.png';

const listData2 = [
  'Detailed health and fitness assessment during onboaring, designed by doctors',
  'Assigned weekly action to support health and lifestyle behaviour change',
  'Guaranteed access to highly trained coaches with resources to support all of your needs',
  'Unlimited support with setting & achieving personalized goals',
];

const listData3 = [
  'Improved energy and mood',
  'Increased muscular strength & endurance',
  'Healthier eating & weight loss/management',
  'Improved sleep quality',
  'Greater confidence in using health & fitness knowledge to achieve better health outcomes',
  'Enhanced community engagement & improved mental health',
  'Improved cardiovascular functioning',
  'Reduced stress & improved coping',
];

const listData4 = [
  {
    id: 1,
    title: 'Individualized programming',
    slide: {
      text: 'Your coach personalizes your programming - this means it’s relevant to your health and fitness goals, attainable within your abilities, and safe.',
      img: slide1,
    },
  },
  {
    id: 2,
    title: 'Flexible schedule',
    slide: {
      text: 'xAlt matches you with a coach that best suits your goals and your schedule. They meet you whenever and wherever you need them so you can train with confidence!',
      img: slide2,
    },
  },
  {
    id: 3,
    title: 'Live one-on-one coach every week',
    slide: {
      text: 'xAlt gives you a real coach to work with once a week on your health and fitness goals. This drives an honest and authentic relationship to hold you accountable to achieve lasting behavior change. Never feel like you have lost sight of your goals, or your coach!',
      img: slide3,
    },
  },
  {
    id: 4,
    title: 'Interactive dashboard',
    slide: {
      text: 'xAlt’s dashboard integrates all of your health and fitness information in one, convenient place. Sync your wearable devices, upload relevant information, and organize it in a way that makes sense for you. And the best part? All of this can be shared with your coach!',
      img: slide4,
    },
  },
  {
    id: 5,
    title: 'Personalized health reporting and tracking',
    slide: {
      text: 'Your dashboard is updated with live reports from your coach after each session. These are used to track your health and fitness journey over time.',
      img: slide5,
    },
  },
  {
    id: 6,
    title: 'Access to the largest health and fitness community',
    slide: {
      text: 'When you join xAlt, you are joining a community of like minded people who are passionate about health, fitness, and longevity. Here you find meaningful social connections and feel a sense of true belonging.',
      img: slide6,
    },
  },
];

const MemberTraining = () => (
  <MemberTrainingWrapper>
    <Container medium>
      <BaseTitle>
        Personalized Experiences.
        <br />
        Train with Confidence.
      </BaseTitle>
      <BaseDescription>
        xAlt welcomes anyone looking to better any aspect of their health, fitness, and/or
        well-being, despite where you are in your journey. To date, members of xAlt have seen health
        and fitness gains of more than 25%!
      </BaseDescription>

      <BaseCardSlider items={listData4} />

      <SimpleWideImageBlock image={image1} m={['32px 0', '48px 0', null, null, null]} />
      <BaseTwoPointCardList>
        {listData2.map((item) => (
          <BaseTwoPointCardItem item={item} key={item.key} />
        ))}
      </BaseTwoPointCardList>
      <SimpleWideImageBlock image={image2} m={['32px 0', '48px 0', null, null, null]} />
      <BaseTwoPointCardList>
        {listData3.map((item) => (
          <BaseTwoPointCardItem item={item} key={item.key} />
        ))}
      </BaseTwoPointCardList>
      <BaseSlogan m={['32px 0 0', null, '56px 0 0', null, null]}>
        xAlt is where longevity is made possible.
      </BaseSlogan>
    </Container>
  </MemberTrainingWrapper>
);

export default MemberTraining;
