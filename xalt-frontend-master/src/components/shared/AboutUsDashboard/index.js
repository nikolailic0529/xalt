import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import {
  BaseTitle,
  ArticleItemWithImage,
  ArticleItemWithBottomImage,
} from 'components/shared/General';
import postImage1 from './post-1.png';
import postImage2 from './post-2.png';

const MemberAboutDashboard = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle fontWeight="700" mb={2}>
        About Us
      </BaseTitle>
      <ArticleItemWithImage variant="darkPink" image={postImage1}>
        xAlt is an integrated health, fitness, and wellness platform carefully
        designed to benefit members, coaches, and corporations. We are
        undertaking to significantly improve people’s health and fitness through
        having conveniently delivered personal training at affordable prices.
        xAlt takes an individualized and holistic approach to improving health
        outcomes through our extensive client intake process and patent-pending
        mobility assessment. We believe that achieving positive health outcomes
        is only possible while working closely with someone, an xAlt coach;
        honest, authentic relationships help people feel safe, seen, and heard.
        xAlt aims to empower people to move safely, while focusing research and
        AI development on physical fitness for longevity. We’re bring human
        connection to online health and fitness.
      </ArticleItemWithImage>
      <ArticleItemWithBottomImage image={postImage2}>
        For coaches, the xAlt dashboard is an opporutnity to maximize and
        enhance both business and client management. xAlt coaches help their
        clients build confidence and awareness of potential in incremental
        steps. They strive to help people develop a profound understanding that
        health is multifactorial and achieving positive outcomes requires
        setting goals and being persistent. By working with an expert coach,
        training and behaviour change is made easier for clients as they offload
        the research and planning required to build safe, effective, and
        realistic health and fitness progams.
        <br />
        <br />
        For members, xAlt provides access to the best-in-class, individualized,
        expert personal training. We have created a platform that enables people
        to enter an environment that challenges and supports them in a way that
        will give them the confidence to achieve their goals and have a positive
        relationship with their health. Our dashboard and tools provide the most
        accurate data to progress them through life changing behaviours at a
        pace that is safe, convenient, and personalized. xAlt takes an average
        person and helps them develop a clear understanding of the proper
        technique to perform exercises with confidence. Educating, raising
        awareness, and promoting physical literacy with our members is where
        xAlt differentiates itself - xAlt experts strive to help people develop
        a profound understanding that health is multifactorial and achieving
        positive outcomes requires setting goals and being persistent. By
        working with certified xAlt coaches, clients build confidence and
        awareness of their potential in incremental steps. We believe that
        change is only possible through knowledge.
        <br />
        <br />
        For corporations, xAlt is an integrated health and fitness applications
        that integrates directly into corporate wellness programs to deliver
        one-on-one, weekly health and fitness training to employees. xAlt
        believes that when our coaches utilize the dashboard’s functionality to
        build relationships with employees, they will drive long-lasting,
        sustainable behaviour change that will increase their productivity,
        satisfaction, and motivation. We deliver health outcomes that keep
        employees and the company’s bottom line healthy.
      </ArticleItemWithBottomImage>
    </Container>
  </Flex>
);

export default MemberAboutDashboard;
