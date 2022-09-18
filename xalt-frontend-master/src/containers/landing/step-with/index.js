import React from 'react';

import Flex from 'components/shared/Flex';
import Container from 'components/shared/Container';
import {
  BaseTitle,
  BaseDescription,
  CardWithImage,
} from 'components/shared/General';
import { StepWithWrapper, StepWithList, StepWithListRow } from './styles';
import image1 from './img/1.png';
import image2 from './img/2.png';
import image3 from './img/3.png';
import image4 from './img/4.png';

StepWithWrapper.defaultProps = {
  width: '100%',
  height: 'auto',
  position: 'relative',
  flexDirection: 'column',
  bg: 'white',
  pt: [6, null, 11, null, null],
  pb: [6, null, 11, null, null],
};

const items = [
  {
    id: 1,
    img: image1,
    title: 'As a Member',
    description: 'Access to world-class, individualized health and fitness training.',
    button: { title: 'Create account', link: '/registration?role=member' },
    link: '/member',
  },
  {
    id: 2,
    img: image2,
    title: 'As a Coach',
    description: 'A platform designed to maximize your business potential.',
    button: { title: 'Create account', link: '/registration?role=coach' },
    link: '/trainer',
  },
  {
    id: 3,
    img: image3,
    title: 'As a Company',
    description: 'Access to world-class, individualized health and fitness training.',
    button: { title: 'Read more', link: '/corp' },
  },
  {
    id: 4,
    img: image4,
    title: 'Conditioning',
    description: 'A platform designed to maximize your business potential.',
    button: { title: 'Read more', link: '/conditioning' },
  },
];

const StepWith = () => (
  <StepWithWrapper>
    <Container medium>
      <BaseTitle m={['0 0 4px', null, null, null]}>Step Forward With xAlt By Your Side</BaseTitle>
      <BaseDescription m={['0 0 24px', null, null, '0 0 32px', null]}>
        Wherever you’re headed, let’s get there together!
      </BaseDescription>
      <StepWithList>
        <StepWithListRow>
          <Flex p={['12px', null, '20px', null]} width={[1, null, 1 / 2, null]}>
            <CardWithImage item={items[0]} />
          </Flex>
          <Flex p={['12px', null, '20px', null]} width={[1, null, 1 / 2, null]}>
            <CardWithImage item={items[1]} />
          </Flex>
        </StepWithListRow>
        <StepWithListRow>
          <Flex p={['12px', null, '20px', null]} width={[1, null, 1 / 2, null]}>
            <CardWithImage item={items[2]} />
          </Flex>
          <Flex p={['12px', null, '20px', null]} width={[1, null, 1 / 2, null]}>
            <CardWithImage item={items[3]} />
          </Flex>
        </StepWithListRow>
      </StepWithList>
    </Container>
  </StepWithWrapper>
);

export default StepWith;
