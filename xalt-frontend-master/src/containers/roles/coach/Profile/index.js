import React from 'react';
import Text from 'components/shared/Text';
import Spacer from 'components/shared/Spacer';
import ProfileData from './ProfileData';
import Credentials from './Credentials';
import EmailNotifications from './EmailNotifications';
import SocialMedia from './SocialMedia';
import Domains from './Domains';
import Clients from './Clients';
import { Block } from './styles';
import WhyTrainWithMeVideo from './WhyTrainWithMeVideo';

export default () => (
  <Spacer direction="vertical" size={18}>
    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          My Profile
        </Text>
        <ProfileData />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Certifications
        </Text>
        <Credentials />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Why Train With Me Video
        </Text>
        <WhyTrainWithMeVideo />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Specialties
        </Text>
        <Domains />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Email notifications
        </Text>
        <EmailNotifications />
      </Spacer>
    </Block>

    <Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>
          Social Media
        </Text>
        <SocialMedia />
      </Spacer>
    </Block>

    {/*<Block>
      <Spacer direction="vertical" fullWidth>
        <Text bigSize bold>What clientelle are you most comfortable working with?</Text>
        <Clients />
      </Spacer>
    </Block> */}
  </Spacer>
);
