import React from 'react';

import Container from 'components/shared/Container';
import Flex from 'components/shared/Flex';
import {
  BaseTitle,
  BaseText,
  SimpleWideImageBlock,
  BaseTwoPointCardList,
  BaseTwoPointCardItem,
} from 'components/shared/General';
import bg1 from './img/bg-1.png';

const listData = [
  'Flexible work hours & simple scheduling',
  'Integrated wearable devices',
  'Progress tracking and reporting for easy client management',
  'Income tracking',
  'Built-in messaging and notifications',
  'Database of exercises & homework assignments',
  'Referral code program',
  'Access to knowledge from world-class health and fitness leaders',
];

const OurPluses = () => (
  <Flex bg="white" pt={[6, null, 10, null, null]} pb={[4, null, 8, null, null]}>
    <Container medium>
      <BaseTitle fontWeight="700" mb={2}>
        Why xAlt?
      </BaseTitle>
      <BaseText mb={[4, null, 6, null, null]}>
        Make money on your own schedule. Have all your clients and tools in one
        place. Signing up is easy!
      </BaseText>
      <SimpleWideImageBlock
        image={bg1}
        m={['32px 0', '48px 0', null, null, null]}
      />
      <BaseTwoPointCardList>
        {listData.map((item) => (
          <BaseTwoPointCardItem item={item} key={item.key} />
        ))}
      </BaseTwoPointCardList>
    </Container>
  </Flex>
);

export default OurPluses;
