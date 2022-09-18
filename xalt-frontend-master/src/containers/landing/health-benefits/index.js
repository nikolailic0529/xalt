import React from 'react';

import Flex from 'components/shared/Flex';
import Container from 'components/shared/Container';
import { BaseTitle, OurPillarsHealth } from 'components/shared/General';
import SvgIcon from 'components/shared/SvgIcon';

import {
  HealthBenefitsContent,
  HealthBenefitsImg,
  HealthBenefitsList,
  HealthBenefitsCard,
  HealthBenefitsIconWrapper,
} from './styles';
import { theme } from 'components';

const HealthBenefits = () => (
  <Flex pt={[8, null, null, '168px']} pb={[6, null, null, 12]}>
    <Container medium>
      <BaseTitle m={['0 0 24px', null, '0 0 32px', '0 0 40px']}>
        The Health Benefits of xAlt
      </BaseTitle>
      <HealthBenefitsContent>
        <HealthBenefitsImg />
        <Flex
          width={1}
          flexDirection="column"
          alignItems={['center', null, null, 'flex-end']}
          justifyContent="flex-start"
          position="relative"
          right={[0, null, null, '-8px']}
        >
          <HealthBenefitsList>
            <HealthBenefitsCard>
              <HealthBenefitsIconWrapper>
                <SvgIcon
                  name="healthBenefits1"
                  width="82px"
                  height="63px"
                  fill={theme.colors.blue}
                />
              </HealthBenefitsIconWrapper>
              Healthier eating & weight loss/management
            </HealthBenefitsCard>
            <HealthBenefitsCard>
              <HealthBenefitsIconWrapper>
                <SvgIcon
                  name="healthBenefits2"
                  width="68px"
                  height="66px"
                  fill={theme.colors.blue}
                />
              </HealthBenefitsIconWrapper>
              Greater muscular strength & endurance
            </HealthBenefitsCard>
            <HealthBenefitsCard>
              <HealthBenefitsIconWrapper>
                <SvgIcon
                  name="healthBenefits3"
                  width="73px"
                  height="68px"
                  fill={theme.colors.blue}
                />
              </HealthBenefitsIconWrapper>
              Improved sleep quality
            </HealthBenefitsCard>
            <HealthBenefitsCard>
              <HealthBenefitsIconWrapper>
                <SvgIcon
                  name="healthBenefits4"
                  width="90px"
                  height="79px"
                  fill={theme.colors.blue}
                />
              </HealthBenefitsIconWrapper>
              Reduced stress & improved coping
            </HealthBenefitsCard>
            <HealthBenefitsCard>
              <HealthBenefitsIconWrapper>
                <SvgIcon
                  name="healthBenefits5"
                  width="58px"
                  height="58px"
                  fill={theme.colors.blue}
                />
              </HealthBenefitsIconWrapper>
              Enhanced community engagement & improved mental health
            </HealthBenefitsCard>
            <HealthBenefitsCard>
              <HealthBenefitsIconWrapper>
                <SvgIcon
                  name="healthBenefits6"
                  width="72px"
                  height="72px"
                  fill={theme.colors.blue}
                />
              </HealthBenefitsIconWrapper>
              Increased sense of happiness
            </HealthBenefitsCard>
          </HealthBenefitsList>
        </Flex>
      </HealthBenefitsContent>
      <OurPillarsHealth withText />
    </Container>
  </Flex>
);

export default HealthBenefits;
