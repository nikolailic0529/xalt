import React, { useEffect } from 'react';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import Icon from 'components/shared/Icon';
import Text from 'components/shared/Text';
import { Space } from 'antd';
import { truncate } from 'lodash';

import { RoundedImage, MemberCard, CustomBadge } from './styles';

export default ({
  member, selected, onClick,
}) => (
  <MemberCard alignItems="center" selected={selected} onClick={onClick} isRead={member.isRead}>
    <Flex className="w-100" justifyContent="space-between" alignItems="center">
      <Space direction="horizontal">
        <When condition={member.avatar.url}>
          <RoundedImage src={member.avatar.url} preview={false} />
        </When>

        <When condition={!member.avatar.url}>
          <Icon src="empty-user-profile" width="38px" />
        </When>

        <Space direction="vertical">
          <When condition={member.isRead}>
            <Text bold>{member.name}</Text>
          </When>
          <When condition={!member.isRead}>
            <Text bold darkPink>{truncate(member.name, { length: 30 })}</Text>
          </When>
          <Text smallSize>{truncate(member.lastMessage.content, { length: 30 })}</Text>
        </Space>
      </Space>

      <Space direction="vertical">
        <Text>{member.lastMessage.createdAt}</Text>
        <When condition={member.unreadMessagesCount}>
          <Flex justifyContent="flex-end">
            <CustomBadge count={member.unreadMessagesCount} />
          </Flex>
        </When>
      </Space>
    </Flex>
  </MemberCard>
);
