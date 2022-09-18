import React from 'react';

import Container from 'components/shared/Container';
import { BaseTitle, BaseDescription, BaseCardSlider } from 'components/shared/General';
import { PersonalizeExpirienceWrapper } from './styles';
import sliderOneImg1 from './img/slide-1-1.png';
import sliderOneImg2 from './img/slide-1-2.png';
import sliderOneImg3 from './img/slide-1-3.png';
import sliderOneImg4 from './img/slide-1-4.png';
import sliderOneImg5 from './img/slide-1-5.png';
import sliderOneImg6 from './img/slide-1-6.png';
import sliderTwoImg1 from './img/slide-2-1.png';
import sliderTwoImg2 from './img/slide-2-2.png';
import sliderTwoImg3 from './img/slide-2-3.png';
import sliderTwoImg4 from './img/slide-2-4.png';
import sliderTwoImg5 from './img/slide-2-5.png';
import sliderTwoImg6 from './img/slide-2-6.png';
import sliderThreeImg1 from './img/slide-3-1.png';
import sliderThreeImg2 from './img/slide-3-2.png';
import sliderThreeImg3 from './img/slide-3-3.png';
import sliderThreeImg4 from './img/slide-3-4.png';
import sliderThreeImg5 from './img/slide-3-5.png';
import sliderThreeImg6 from './img/slide-3-6.png';
import sliderThreeImg7 from './img/slide-3-7.png';

const sliderOneData = [
  {
    id: 1,
    title: 'Individualized programming',
    slide: {
      text: 'Your coach personalizes your programming - this means it’s relevant to your health and fitness goals, attainable within your abilities, safe, and most importantly, fun!',
      img: sliderOneImg1,
    },
  },
  {
    id: 2,
    title: 'Flexible schedule',
    slide: {
      text: 'xAlt matches you with a coach that best suits your goals and your schedule. They meet you whenever and wherever you need them so you can train with confidence!',
      img: sliderOneImg2,
    },
  },
  {
    id: 3,
    title: 'Live one-on-one coach every week',
    slide: {
      text: 'xAlt gives you a real coach to work with once a week on your health and fitness goals. This drives an honest and authentic relationship to hold you accountable to achieve lasting behavior change. Never feel like you have lost sight of your goals, or your coach!',
      img: sliderOneImg3,
    },
  },
  {
    id: 4,
    title: 'Interactive dashboard',
    slide: {
      text: 'xAlt’s dashboard integrates all of your health and fitness information in one, convenient place. Sync your wearable devices, upload relevant information, and organize it in a way that makes sense for you. And the best part? All of this can be shared with your coach!',
      img: sliderOneImg4,
    },
  },
  {
    id: 5,
    title: 'Personalized health reporting and tracking',
    slide: {
      text: 'Your dashboard is updated with live reports from your coach after each session. These are used to track your health and fitness journey over time.',
      img: sliderOneImg5,
    },
  },
  {
    id: 6,
    title: 'Access to the largest health and fitness community',
    slide: {
      text: 'When you join xAlt, you are joining a community of like minded people who are passionate about health, fitness, and longevity. Here you find meaningful social connections and feel a sense of true belonging.',
      img: sliderOneImg6,
    },
  },
];

const sliderTwoData = [
  {
    id: 1,
    title: 'Business growth & management dashboard',
    slide: {
      text: 'xAlt’s dashboard allows you to manage and grow your business in one, convenient place. We keep you accountable and earning the highest payout in the industry.',
      img: sliderTwoImg1,
    },
  },
  {
    id: 2,
    title: 'Flexible work hours & easy scheduling',
    slide: {
      text: 'Set your availability and xAlt will match you with clients who fit into your schedule. Work any amount of hours that are suitable for your lifestyle, from wherever you are in the world.',
      img: sliderTwoImg2,
    },
  },
  {
    id: 3,
    title: 'Access to knowledge from world-class experts',
    slide: {
      text: 'Everything about xAlt - from its approach and methodologies, to the design of the dashboard - is based on scientific evidence and years of experience in the health and fitness industry. Coaching on xAlt ensures you are always being fed the latest and most accurate sources of information. Our experts are here to support your success.',
      img: sliderTwoImg3,
    },
  },
  {
    id: 4,
    title: 'Client management dashboard',
    slide: {
      text: 'All of your clients health and fitness information is stored in one place. The dashboard helps you manage your clients, keep track of their progress, and never miss a scheduled session!',
      img: sliderTwoImg4,
    },
  },
  {
    id: 5,
    title: 'Integrated wearable data',
    slide: {
      text: 'Leverage the information uploaded from your client’s wearable devices to customize their programming and track their progress over time.',
      img: sliderTwoImg5,
    },
  },
  {
    id: 6,
    title: 'Custom client action assignments',
    slide: {
      text: 'Assign custom action assignments to each client following their session. xAlt action is a functionality that drives lasting sustainable behaviour change. By assigning your clients something to follow-up with, it keeps them accountable and on track of achieving their health and fitness goals.',
      img: sliderTwoImg6,
    },
  },
];

const sliderThreeData = [
  {
    id: 1,
    title: 'Improved productivity',
    slide: {
      text: 'Low levels of employee productivity affect employee morale, hinder efficiency and impact profit margins. A lack of productivity is most often due to presenteeism and poor health. xAlt focuses on improving employee health outcomes such that it improves both their stress levels, happiness, motivation, and sense of belonging.',
      img: sliderThreeImg1,
    },
  },
  {
    id: 2,
    title: 'Reduced employee absenteeism',
    slide: {
      text: 'Workplaces that priotizie employee health and well-being experience reduced absenteeism. Employees who have good health behaviours, can manage their stress, and have a healthy weight have lower absenteeism. Employees who have high morale are also less likely to be absent from work.',
      img: sliderThreeImg2,
    },
  },
  {
    id: 3,
    title: 'Enhanced idea generation and solutions to business challenges',
    slide: {
      text: 'Employees that are healthy, happy, and motivated produce more innovative ideas and can effectively handle workplace challenges. They are more inclined to think critically, take on bigger projects, and work collaboratively.',
      img: sliderThreeImg3,
    },
  },
  {
    id: 4,
    title: 'Improved employee culture & moral',
    slide: {
      text: 'Companies that incorporate xAlt into their wellness programs have employees that like coming to work, appreciate their employer, work better with others, and have a higher morale.',
      img: sliderThreeImg4,
    },
  },
  {
    id: 5,
    title: 'Higher levels of motivation & engagement',
    slide: {
      text: 'Companies whose employees are on xAlt once a week are more motivated and engaged at work. Exercise produces natural opiates and endorphins that increase energy and improve mood. Focusing on a healthy lifestyle ensures employees are less stressed, sleeping better, and eating healthier foods. They come to work every day feeling happier and more willing to work!',
      img: sliderThreeImg5,
    },
  },
  {
    id: 6,
    title: 'Improved employee retention and recruitment',
    slide: {
      text: 'Wellness programs significantly lower voluntary attrition rates by over 15%. Employees that are happy at work don’t leave. Workplaces with strong cultures radiate and become a recruiting tool to attract top talent. Incorporating xAlt into corporate wellness plans makes it easier to find, hire, and retain top-quality employees who love their jobs.',
      img: sliderThreeImg6,
    },
  },
  {
    id: 7,
    title: 'Lower health care costs, greater ROI',
    slide: {
      text: 'The return on investment related to employee wellness programs typically includes the overall healthcare cost-savings achieved, as well as productivity increases due to a reduction in sick days taken by employees. For every $1 invested in wellness, companies average a return of $2.71 of increased productivity, decreased absenteeism and reduced healthcare costs.',
      img: sliderThreeImg7,
    },
  },
];

const PersonalizeExpirience = () => (
  <PersonalizeExpirienceWrapper>
    <Container medium>
      <BaseTitle>
        Personalized Experiences
        <br />
        for Every One of Your Needs
      </BaseTitle>
      <BaseDescription>As a Member</BaseDescription>

      <BaseCardSlider items={sliderOneData} slidePosition="right" />

      <BaseDescription m={['48px 0 24px', null, null, '80px 0 40px']}>As a Coach</BaseDescription>

      <BaseCardSlider items={sliderTwoData} activeColor="red" />

      <BaseDescription m={['48px 0 24px', null, null, '80px 0 40px']}>As a Company</BaseDescription>

      <BaseCardSlider items={sliderThreeData} activeColor="blue" slidePosition="right" />
    </Container>
  </PersonalizeExpirienceWrapper>
);

export default PersonalizeExpirience;
