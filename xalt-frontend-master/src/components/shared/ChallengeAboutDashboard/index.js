import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import {
  BaseTitle,
  BaseText,
  ArticleItemWithImage,
} from 'components/shared/General';
import postImage1 from './Challenge-1.png';
// import { theme } from '../../theme';

const ChallengeDashboard = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle fontWeight="700" mb={2}>
        What are Corporate Challenges?
      </BaseTitle>
      <ArticleItemWithImage image={postImage1} variant="yellow">
        {/* eslint-disable-next-line max-len */}
        xAlt Corporate Challenges are inclusive competitions, for employees, that we customize and directly                 implement into your organization. They are fun, easy ways to inspire friendly competition in the workplace          and encourage healthy habits that outlast the challenges themselves! xAlt Corporate Challenges increase              employee health, fitness, and well-being, which translates into supporting the company’s bottom line.               Corporate Challenges with xAlt are how your company builds a happier and healthier workforce!
      </ArticleItemWithImage>
    </Container>
  </Flex>
);

export default ChallengeDashboard;
