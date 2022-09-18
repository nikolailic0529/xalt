import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import {
  BaseTitle,
  BaseText,
  ArticleItemWithImage,
} from 'components/shared/General';
import postImage1 from './post-1.png';

const MemberAboutDashboard = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle fontWeight="700" mb={2}>
        The Dashboard Designed for YOU
      </BaseTitle>
      <BaseText mb={[4, null, 6, null, null]}>
        xAlt is an integrated wellness application and health and fitness
        platform for people to conveniently access better health outcomes at
        affordable prices. We bring human connection to fitness and health. xAlt
        takes a holistic approach to improving health and wellness with the use
        of technology, diverse content, and our extensive onboarding process and
        patent-pending mobility assessment. Our dashboard and tools provide the
        most accurate data to progress you through life changing behaviours at a
        pace that is safe, convenient, and personalized. xAlt’s diverse team of
        professionals are committed to continuously using the best research and
        evidence-based sciences to empower you to improve your quality of life.
        We focus our research, approach, and AI development on physical fitness
        and wellbeing for longevity.
      </BaseText>
      <ArticleItemWithImage variant="darkPink" image={postImage1}>
        xAlt sees a world where average people develop a clear understanding of
        the proper technique to perform exercises with proper technique and
        confidence. Educating, raising awareness, and promoting physical
        literacy with our members is where xAlt differentiates itself - xAlt
        experts strive to help people develop a profound understanding that
        health is multifactorial and achieving positive outcomes requires
        setting goals and being persistent. By working with certified xAlt
        coaches, clients build confidence and awareness of their potential in
        incremental steps. We believe that change is only possible through
        knowledge.
      </ArticleItemWithImage>
      <BaseText>
        xAlt has created a platform that enables people to enter an environment
        that challenges and supports them in a way that will give them the
        confidence to achieve their goals and have a positive relationship with
        their health. xAlt is a community where individuals can find social
        connections and feel a sense of belonging, necessary for good mental
        health. xAlt believes that obtaining better health outcomes and
        improving quality of life is always possible.
      </BaseText>
    </Container>
  </Flex>
);

export default MemberAboutDashboard;
