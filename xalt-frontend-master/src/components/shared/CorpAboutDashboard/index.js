import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import {
  BaseTitle,
  BaseText,
  ArticleItemWithImage,
} from 'components/shared/General';
import postImage1 from './post-1.png';
import { theme } from '../../theme';

const MemberAboutDashboard = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle fontWeight="700" mb={2}>
        Take Your Employee’s Well-Being and Productivity to the Next Level!
      </BaseTitle>
      <BaseText mb={[4, null, 6, null, null]} textAlign="center">
        Companies that have integrated xAlt into their wellness programs have
        seen a 25%
        <br />
        improvement in employee happiness, motivation, and productivity!
      </BaseText>
      <BaseText
        mb={[4, null, 6, null, null]}
        textAlign="center"
        fontWeight="bold"
      >
        xAlt helps you focus on making your organization’s most critical system
        -
        <br />
        your people - successful!
      </BaseText>
      <ArticleItemWithImage image={postImage1} variant="blue">
        xAlt is an integrated wellness application and health and fitness
        platform that integrates with corporate wellness programs to deliver
        one-on-one, weekly health and fitness training to employees. We bring
        human connection to online training. With our extensive intake process,
        patent-pending mobility assessment, and individualized programming, your
        employees and business will immediately benefit. xAlt coaches utilize
        the dashboard’s functionality to build relationships with your employees
        that will drive long-lasting, sustainable behaviour change by
        encouraging small, daily changes across all aspects of their health. We
        deliver health outcomes that keep your employees and your bottom line
        healthy.
      </ArticleItemWithImage>
      <BaseText>
        xAlt’s diverse team of health and fitness professionals are committed to
        continuously using the best research and evidence-based science to
        improve the health and well-being of your employees. By working with an
        xAlt coach every week, employees build confidence and awareness of their
        potential in incremental steps. We provide your employees with the
        industry’s most interactive and intuitive health experience, ever. xAlt
        works directly with your company and employees to deliver better health
        and business outcomes every day.
      </BaseText>
    </Container>
  </Flex>
);

export default MemberAboutDashboard;
