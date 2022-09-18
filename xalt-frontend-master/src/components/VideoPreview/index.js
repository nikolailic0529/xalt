import React, { useState } from 'react';
import Img from 'components/shared/Img';
import Text from 'components/shared/Text';
import When from 'components/shared/When';
import Flex from 'components/shared/Flex';
import moment from 'moment';
import { Space } from 'antd';

import VimeoEmbed from 'components/shared/VimeoEmbed';
import { truncate } from 'lodash';
import { useHistory } from 'react-router';
import { StyledCard, Footer, CardContent, StyledSvgIcon } from './styles';

export default ({ data, lockable, setCurrentExercise, isChooseMode, exPath = 'exercises' }) => {
  const {
    id,
    name,
    is_private: isPrivate,
    created_at: createdAt,
    user,
    description,
    vimeo_video_url: vimeoVideoUrl,
    video_url: videoUrl,
  } = data;

  const history = useHistory();

  const clickHandler = () => {
    if (isChooseMode) {
      setCurrentExercise && setCurrentExercise(data);
    } else history.push(`/${exPath}/${id}`);
  };

  console.log(videoUrl, vimeoVideoUrl);

  return (
    <StyledCard onClick={clickHandler}>
      <When condition={vimeoVideoUrl}>
      <VimeoEmbed url={videoUrl} type="preview" />
      </When>
      <When condition={!vimeoVideoUrl}>
        <Img src="video-preview-wallpaper.png" height="100%" width="100%" />
      </When>
      <CardContent>
        <Flex justifyContent="center">
          <Text bold darkPink>
            {truncate(name, { length: 15 })}
          </Text>
          {/* <Text smallSize alingCenter>{moment(createdAt).format('MM/DD/YY')}</Text> */}
        </Flex>

        {/* <Text smallSize>{truncate(description, { length: 80 })}</Text> */}

        <Footer isPrivate={lockable}>
          <When condition={lockable}>
            <Space direction="horizontal" align="center" size={12}>
              <When condition={isPrivate}>
                <StyledSvgIcon name="lock" />
              </When>
            </Space>
          </When>

          <When condition={!lockable}>
            {user?.name && (
              <Text smallSize bold>
                {user.name}
              </Text>
            )}
          </When>
        </Footer>
      </CardContent>
    </StyledCard>
  );
};
