import React, { useState } from 'react';
import Container from 'components/shared/Container';
import {
  BaseTitle,
  BaseDescription,
  BaseCardSlider,
  BaseTwoPointCardList,
  BaseTwoPointCardItem,
  OurPillarsHealth,
  CardWithImage,
} from 'components/shared/General';
import Button from 'components/shared/Button';
import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';
import { MemberTrainingWrapper } from './styles';
import slide1 from './slide-1.png';
import slide2 from './slide-2.png';
import slide3 from './slide-3.png';
import challenge2 from './challenge-2.png';
import runningstairs from './Running-Stairs 1.png';
import { ArticleItemWithImage, ArticleItemWithBottomImage } from '../General';
import { Space } from 'antd';
import { CardWithImageHor } from '../General/card-with-image-hor';
import { OrderedList } from '../Layout';

// const testlist = [
//   {
//     id: 1,
//     img: slide3,
//     title: 'As a Member',
//     description: 'Access to world-class, individualized health and fitness training.',
//     button: { title: 'Create account', link: '/registration?role=member' },
//     link: '/member',
//   },
// ];

const listData2 = [
  'Happier, healthier, more <br/> productive employees',
  'Increased employee retention <br/> & decreased absenteeism',
  'Improved teamwork & <br/> communication',
  'Motivated and engaged <br/> employees',
  'Improved employee culture & <br/> morale',
  'Greater return on investment',
];

const listData3 = [
  'Improved mood and energy <br/> levels',
  'Decreased stress',
  'Enhanced motivation, <br/> teamwork & idea generation',
  'Increased happiness & workplace enjoyment',
  'Improved productivity & <br/> communication',
  'Adoption of healthy lifestyle <br/> habits',
];





const ChallengeBenefits = () => {
  const [buttonToggle, setButtonToggle] = useState(false);
  const [disable, setDisable] = useState('false');
  // let buttonColor = buttonToggle ? "pinkBrdrBtn" : null;
  // console.log(buttonColor);


  return (
    <MemberTrainingWrapper>
      <Container medium>
        <BaseTitle>Why Implement Corporate Challenges?</BaseTitle>
        <ArticleItemWithBottomImage image={runningstairs}>
          Corporate Challenges with xAlt are easy, inclusive, and supportive! We do all the work for
          you - from registration packages, to employee progress tracking, to incentives. Any one of
          your company’s employees can participate, no matter what the challenge is! xAlt fully
          supports the organization and it’s employees during the entire challenge period - we
          assign a personal xAlt Certified Coach to each corporation! Implementing xAlt Corporate
          Challenges into your company's work place is a win-win for the organization and the
          employees.
        </ArticleItemWithBottomImage>

        <Flex marginTop='100px'  alignItems="center" justifyContent='space-evenly'>
          {/* <Space size={150} align="center"> */}
            { !buttonToggle ? <> <ButtonAux
              pinkBtn
              onClick={() => setButtonToggle(false)}
              m={['24px 0 24px', null, null, '40px 0 40px', null]}
            >
              Employee Benefits
            </ButtonAux>
            <ButtonAux
              whitePinkBtn
              onClick={() => setButtonToggle(true)}
              m={['24px 0 24px', null, null, '40px 0 40px', null]}
            >
              Corporate Benefits
            </ButtonAux> </> : <> <ButtonAux
              whitePinkBtn
              onClick={() => setButtonToggle(false)}
              m={['24px 0 24px', null, null, '40px 0 40px', null]}
            >
              Employee Benefits
            </ButtonAux>
            <ButtonAux
              pinkBtn
              onClick={() => setButtonToggle(true)}
              m={['24px 0 24px', null, null, '40px 0 40px', null]}
            >
              Corporate Benefits
            </ButtonAux>
            </>
            }
          {/* </Space> */}
        </Flex>

        {/* { console.log(buttonColor)} */}

        <BaseTwoPointCardList>
          {buttonToggle
            ? listData2.map((item) => <BaseTwoPointCardItem item={item} key={item.key} />)
            : listData3.map((item) => <BaseTwoPointCardItem item={item} key={item.key} />)}
        </BaseTwoPointCardList>
      </Container>
    </MemberTrainingWrapper>
  );
};

export default ChallengeBenefits;
