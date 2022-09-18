import React from 'react';
import styled from 'styled-components';
import {
  layout,
  space,
  width,
  color,
  border,
  typography,
  background,
} from 'styled-system';

import colors from 'lib/theme/colors';
import Flex from 'components/shared/Flex';
import image from 'assets/icons/empty-user-profile.svg';

const UserPicCardWrapper = styled(Flex)`
  flex-direction: column;

  ${space};
  ${width};
  ${color};
  ${typography};
`;
UserPicCardWrapper.defaultProps = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  m: 0,
};
const UserPic = styled.div`
  display: block;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);

  ${background};
  ${layout};
  ${space};
  ${width};
  ${color};
  ${border};

  img {
    width: 100%;
    max-width: 100%;
  }
`;

UserPic.defaultProps = {
  bg: colors.gray300,
  borderRadius: '50%',
  backgroundSize: 'cover',
  backgroundPosition: '50% 50%',
  backgroundRepeat: 'no-repeat',
  m: '0 0 14px',
};

const UserPicName = styled.span`
  display: inline-block;
  width: 100%;
  font-size: 16px;
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: 0.2px;
  font-family: 'Roboto', sans-serif;
  color: ${colors.gray1000};
  text-align: center;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CoachUserPic = (props) => {
  const { name, imgSize, avatar } = props;
  return (
    <UserPicCardWrapper>
      {avatar?.url ? (
        <UserPic
          width={imgSize}
          height={imgSize}
          backgroundImage={`url(${avatar.url})`}
        />
      ) : (
        <UserPic
          width={imgSize}
          height={imgSize}
          backgroundImage={`url(${image})`}
        />
      )}
      {name && <UserPicName>{name}</UserPicName>}
    </UserPicCardWrapper>
  );
};

export default CoachUserPic;
