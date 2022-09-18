import React from 'react';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import Text from 'components/shared/Text';

import styled from 'styled-components';

import colors from 'lib/theme/colors';

const LineWrapper = styled.div`
 background-color: ${({ countable }) => (countable ? colors.gray300 : colors.gray500)};
 height: 5px;
 border-radius: 5px;
 margin-top: 10px;
`;

const Line = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  border-radius: 5px;
  background-color: ${colors.graySteel};
`;

export default ({
  leftLabel, rightLabel, total, value,
}) => (
  <div>
    <Flex justifyContent="space-between">
      <Flex alignItems="flex-end">
        <When condition={!value}>
          <Text bigSize bold>{total}</Text>
        </When>

        <When condition={value}>
          <Text tinySize>
            {value}
            {' '}
            {leftLabel}
          </Text>
        </When>
      </Flex>

      <Flex alignItems="flex-end">
        <Text tinySize>
          <When condition={value}>
            {total - value}
          </When>
          {' '}
          {rightLabel}
        </Text>
      </Flex>
    </Flex>

    <LineWrapper countable={!!value}>
      <When condition={value}>
        <Line value={(value * 100) / total} />
      </When>
    </LineWrapper>
  </div>
);
