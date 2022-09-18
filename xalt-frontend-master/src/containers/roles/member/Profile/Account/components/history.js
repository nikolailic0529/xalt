import React from 'react';
import { theme } from 'components';
import moment from 'moment';

import {
  SettingsSectionWrapper,
  SettingsSessionsBlock,
  SettingsSessionsInfo,
} from './styles';

const { fontWeights, colors } = theme;

const statusList = {
  paid: { text: 'Successful', color: colors.kingfisherDaisy },
  canceled: { text: 'Canceled', color: colors.gray1000 },
  failed: { text: 'Error', color: colors.red },
  created: { text: 'Created', color: colors.gray1000 },
  updated: { text: 'Updated', color: colors.gray1000 },
};

export default (props) => {
  const { invoices } = props;

  const defineStatus = (status) => statusList[status];

  return (
    <SettingsSectionWrapper
      p={0}
      flexDirection="column"
      alignItems="flex-start"
    >
      {invoices.slice(0, 2).map((item) => (
        <SettingsSessionsBlock
          key={item.id}
          flexWrap="wrap"
          p="8px 0"
          flexDirection="row"
        >
          <SettingsSessionsInfo fontWeight={fontWeights.bold} p={1}>
            {`$${item?.amount_paid || ''}`}
          </SettingsSessionsInfo>
          <SettingsSessionsInfo textTransform="uppercase" p={1}>
            {item?.currency || ''}
          </SettingsSessionsInfo>
          <SettingsSessionsInfo textTransform="capitalize" p={1}>
            {item?.status || ''}
          </SettingsSessionsInfo>
          <SettingsSessionsInfo p={1}>
            {moment(item.status_transitions?.paid_at * 1000)
              .local()
              .format('MMMM DD[,] hh:mm A') || ''}
          </SettingsSessionsInfo>
          <SettingsSessionsInfo p={1} color={defineStatus(item?.status)?.color}>
            {defineStatus(item?.status)?.text || ''}
          </SettingsSessionsInfo>
        </SettingsSessionsBlock>
      ))}
    </SettingsSectionWrapper>
  );
};
