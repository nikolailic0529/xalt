import React from 'react';
import { useHistory } from 'react-router';
import SvgIcon from 'components/shared/SvgIcon';

import {
  SettingsSectionContainer,
  SettingsSectionWrapper,
  SettingsSessionsBlock,
  SettingsSessionsInfo,
  StyledIcon,
} from './styles';

export default (props) => {
  const { last4 } = props;
  const history = useHistory();

  return (
    <SettingsSectionContainer width={['100%', null, '50%']}>
      <SettingsSectionWrapper
        flexWrap="wrap"
        flexDirection="row"
        alignItems="center"
      >
        <SettingsSessionsBlock display={['none', null, 'flex']}>
          <SvgIcon name="creditCard" width="24px" height="24px" />
        </SettingsSessionsBlock>
        <SettingsSessionsBlock minWidth="180px">
          <SettingsSessionsInfo>{`VISA •••• •••• •••• ${last4 || ''}`}</SettingsSessionsInfo>
          <SettingsSessionsInfo>Expired Apr 2022</SettingsSessionsInfo>
        </SettingsSessionsBlock>
        <SettingsSessionsBlock
          flexGrow={['unset', null, '2']}
          alignItems="flex-end"
        >
          <StyledIcon
            onClick={() => history.push('/change-details')}
            name="edit"
            width="24px"
            height="24px"
          />
        </SettingsSessionsBlock>
      </SettingsSectionWrapper>
    </SettingsSectionContainer>
  );
};
