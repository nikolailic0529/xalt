import React from 'react';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import Icon from 'components/shared/Icon';
import Text from 'components/shared/Text';
import { Space } from 'antd';
import { RoundedImage } from 'components/Chat/MembersList/styles';
import { StyledMoreOutlined, HeaderWrapper } from './styles';

export default ({ opponent }) => (
  opponent
    ? (
      <HeaderWrapper className="w-100" justifyContent="space-between" alignItems="center">
        <Space direction="horizontal">
          <When condition={opponent.avatar.url}>
            <RoundedImage src={opponent.avatar.url} preview={false} />
          </When>

          <When condition={!opponent.avatar.url}>
            <Icon src="empty-user-profile" width="38px" />
          </When>

          <Space direction="vertical">
            <When condition={opponent.isRead}>
              <Text bold>{opponent.name}</Text>
            </When>
            <When condition={!opponent.isRead}>
              <Text bold darkPink>{opponent.name}</Text>
            </When>
          </Space>
        </Space>

        <Space direction="horizontal">
          <Text>{opponent.lastMessage?.createdAt}</Text>
          <StyledMoreOutlined />
        </Space>
      </HeaderWrapper>
    )
    : null
);
