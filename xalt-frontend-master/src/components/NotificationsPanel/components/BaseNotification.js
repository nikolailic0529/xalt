import React from 'react';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import colors from 'lib/theme/colors';
import { Space } from 'antd';
import { formatNotification } from 'lib/helpers';
import { Notification, StyledIcon } from './styles';

export default ({ createdAt, icon, content }) => (
  <Notification>
    <Flex alignItems="center">
      <Space direction="horizontal">
        <StyledIcon name={icon} fill={colors.white} />

        <Text medium smallSize black>{content}</Text>
      </Space>
    </Flex>

    <Flex justifyContent="flex-end">
      <Text darkPink smallSize>{formatNotification(createdAt)}</Text>
    </Flex>
  </Notification>
);
