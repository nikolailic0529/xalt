import React from 'react';

import Container from 'components/shared/Container';
import {
  BaseTitle,
  BaseDescription,
  OurPillarsHealth,
} from 'components/shared/General';
import {
  PillarsHealthWrapper,
  PillarsHealthText,
  PillarsHealthList,
  PillarsHealthItem,
} from './styles';

const listData = [
  {
    id: 1,
    title: 'Sleep',
    description:
      'Sleep is directly connected with physical and mental health. Sleep enhances your cognitive and physical health and performance.',
  },
  {
    id: 2,
    title: 'Diet & Nutrition',
    description:
      'The foods we consume dictate our ability to optimize muscle development and fat loss. Proper nutrition is necessary to keep people healthy and feeling better for longer.',
  },
  {
    id: 3,
    title: 'Community Engagement',
    description:
      'The single most consistent factor to a happy and healthy life depends on your relationship with others. Community enables mental health.',
  },
  {
    id: 4,
    title: 'Stress',
    description:
      'The key to optimizing health is knowing how to cope with stressors.',
  },
  {
    id: 5,
    title: 'Happiness',
    description:
      'Pursuing a sense of collective happiness is fundamental to optimizing our health and well-being.',
  },
  {
    id: 6,
    title: 'Physical Fitness',
    description:
      'Engagement in regular movement and exercise prevents the loss of functional mobility and independence as we age.',
  },
];

const PillarsHealth = () => (
  <PillarsHealthWrapper>
    <Container medium>
      <BaseTitle>xAlt’s Pillars of Health</BaseTitle>
      <BaseDescription>
        xAlt was built around our pillars of health, which are measured every
        week and integrated into all of our processes.
      </BaseDescription>
      <PillarsHealthList>
        {listData.map((item, index) => (
          <PillarsHealthItem item={item} key={index} />
        ))}
      </PillarsHealthList>
      <PillarsHealthText>
        xAlt recognizes that the only way to achieve optimum fitness and
        longevity are if you also maximize your sleep, diet/nutrition, stress,
        happiness, and engagement in the community.
      </PillarsHealthText>
      <OurPillarsHealth />
    </Container>
  </PillarsHealthWrapper>
);

export default PillarsHealth;
