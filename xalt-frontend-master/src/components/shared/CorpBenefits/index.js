import React from 'react';

import Container from 'components/shared/Container';
import {
  BaseTitle,
  BaseDescription,
  BaseCardSlider,
  BaseTwoPointCardList,
  BaseTwoPointCardItem,
} from 'components/shared/General';
import { MemberTrainingWrapper } from './styles';
import slide1 from './slide-1.png';
import slide2 from './slide-2.png';
import slide3 from './slide-3.png';
import slide4 from './slide-4.png';
import slide5 from './slide-5.png';
import slide6 from './slide-6.png';
import slide7 from './slide-7.png';

const listData2 = [
  'Healthier eating &	weight <br/> loss/management',
  'Improved muscular strength & endurance',
  'Improved cognitive functioning & reduced <br/> stress',
  'Increased sense of happiness',
  'Improved sleep quality',
  'Access to a community of motivated, health <br/> conscious individuals to engage with ',
];

const listData4 = [
  {
    id: 1,
    title: 'Improved productivity & boosted job satisfaction',
    slide: {
      text: 'Low levels of employee productivity affect employee morale, hinder efficiency and affect profit margins. A lack of productivity is most often due to presenteeism and poor health. xAlt focuses on improving employee health outcomes such that it improves both their stress levels, happiness, motivation, and sense of belonging.',
      img: slide1,
    },
  },
  {
    id: 2,
    title: 'Reduced employee absenteeism',
    slide: {
      text: 'Workplaces that priotizie employee health and well-being experience reduced absenteeism. Employees who have good health behaviours, can manage their stress, and have a healthy weight have lower absenteeism. Employees who have high morale are also less likely to be absent from work.',
      img: slide2,
    },
  },
  {
    id: 3,
    title: 'Enhanced idea generation and solutions to business challenges',
    slide: {
      text: 'Employees that are healthy, happy, and motivated produce more innovative ideas and can effectively handle workplace challenges. They are more inclined to think critically, take on bigger projects, and work collaboratively. Improved employee culture & moral Companies that incorporate xAlt into their wellness programs have employees that like coming to work, appreciate their employer, work better with others, and have a higher morale.',
      img: slide3,
    },
  },
  {
    id: 4,
    title: 'Improved employee culture & moral',
    slide: {
      text: 'Companies that incorporate xAlt into their wellness programs have employees that like coming to work, appreciate their employer, work better with others, and have a higher morale.',
      img: slide4,
    },
  },
  {
    id: 5,
    title: 'Higher levels of motivation & engagement',
    slide: {
      text: 'Companies whose employees are on xAlt once a week are more motivated and engaged at work. Exercise produces natural opiates and endorphins that increase energy and improve mood. Focusing on a healthy lifestyle ensures employees are less stressed, sleeping better, and eating healthier foods. They come to work every day feeling happier and more willing to work!',
      img: slide5,
    },
  },
  {
    id: 6,
    title: 'Improved employee retention and recruitment',
    slide: {
      text: 'Wellness programs significantly lower voluntary attrition rates by over 15%. Employees that are happy at work don’t leave. Workplaces with strong cultures radiate and become a recruiting tool to attract top talent. xAlt in your wellness plan makes it easier for you to find, hire, and retain top-quality employees who love their jobs.',
      img: slide6,
    },
  },
  {
    id: 7,
    title: 'Lower health care costs, greater ROI',
    slide: {
      text: 'The return on investment related to employee wellness programs typically includes the overall healthcare cost-savings achieved, as well as productivity increases due to a reduction in sick days taken by employees. For every $1 invested in wellness, companies average a return of $2.71 of increased productivity, decreased absenteeism and reduced healthcare costs.',
      img: slide7,
    },
  },
];

const MemberTraining = () => (
  <MemberTrainingWrapper>
    <Container medium>
      <BaseTitle>
        Companies that integrate xAlt into their wellness programs gain positive benefits
        for their business and their employees.
      </BaseTitle>
      <BaseDescription>
        For the business
      </BaseDescription>

      <BaseCardSlider items={listData4} activeColor="blue" slidePosition="right" />

      <BaseDescription m={['24px 0 24px', null, null, '40px 0 40px', null]}>
        For the employees
      </BaseDescription>

      <BaseTwoPointCardList>
        {listData2.map((item) => (
          <BaseTwoPointCardItem item={item} key={item.key} />
        ))}
      </BaseTwoPointCardList>
    </Container>
  </MemberTrainingWrapper>
);

export default MemberTraining;
