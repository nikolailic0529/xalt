import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import {
  BaseTitle,
  BaseText,
  ArticleItemWithImage,
} from 'components/shared/General';
import bgImage from './img/bg-1.png';

const TrainerAboutDashboard = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle
        fontWeight="700"
        mb={2}
        dangerouslySetInnerHTML={{
          __html:
            'The Difference Between an Average <br>Business and an Amazing One',
        }}
      />
      <BaseText mb={[4, null, 6, null, null]}>
        xAlt is an integrated wellness application and health and fitness
        platform for coaches to conveniently deliver positive health outcomes
        for clients at affordable prices. As a relationship takes root, a coach
        drives accountability, builds motivation and delivers confidence. xAlt
        coaches help set goals, raise the bar, push through challenging times,
        and build momentum. By working with an expert coach, training and
        behaviour change is made easier for clients as they offload the research
        and planning required to build safe, effective, and realistic fitness
        routines.
      </BaseText>
      <ArticleItemWithImage variant="yellow" image={bgImage}>
        xAlt sees a world where coaches help their clients develop a clear
        understanding of the proper technique to perform exercises with proper
        technique and confidence. xAlt coaches strive to help people develop a
        profound understanding that health is multifactorial and achieving
        positive outcomes requires setting goals and being persistent. xAlt
        coaches help their clients build confidence and awareness of their
        potential in incremental steps. We believe that change is only possible
        through knowledge.
      </ArticleItemWithImage>
      <BaseText mt={[0, null, 12, null, null]}>
        xAlt has created an interactive dashboard to help coaches successfully
        manage every aspect of their business, retain clients, and earn the
        highest payout in the industry. The dashboard does all the hard work for
        you - no more worrying about losing client reports, forgetting to track
        progress, or missing sessions. xAlt keeps you accountable.
      </BaseText>
    </Container>
  </Flex>
);

export default TrainerAboutDashboard;
