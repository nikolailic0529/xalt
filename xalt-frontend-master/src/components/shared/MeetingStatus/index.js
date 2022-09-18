import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

import colors from 'lib/theme/colors';
import SvgIcon from 'components/shared/SvgIcon';
import {layout, space, flexbox} from 'styled-system';
import ButtonAux from 'components/shared/ButtonAux';
import { NothingBlock } from 'components/shared/Dashboard';

const MeetingStatusContainer = styled.div`
  padding: 8px;
  width: 75%;
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const MeetingStatusWrapper = styled.div`
  width: 100%;
  min-height: 180px;
  box-shadow: 0px 2px 8px rgba(51, 51, 51, 0.12);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 450px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
`;

const MeetingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  ${space};
  ${layout};
  ${flexbox};
  @media (max-width: 640px) {
    padding: 8px;
    align-items: center;
  }
`;

const ScheduledMeeting = styled.span`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.2px;
  color: #39393C;
`;

const MeetingDateWrapper = styled.div`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #39393C;
  display: flex;
  flex-direction: column;
  padding: 8px 0;
`;

const MeetingTime = styled.span``;

const GoToMeet = styled(ButtonAux)`
  ${space};
  :disabled {
    background: ${colors.gray500};
  }
`;

const CopyMeetLink = styled(SvgIcon)`
  align-self: center;
  cursor: pointer;
`;

export default (props) => {
  const { nextMeet, currentDate } = props;
  const copy = () => {
    nextMeet.google_meet_url && navigator.clipboard.writeText(nextMeet.google_meet_url)
  };

  return (
    <MeetingStatusContainer>
      <MeetingStatusWrapper>
        {nextMeet.id
          ? <MeetingInfoWrapper padding="8px 8px 8px 0" width="75%" alignItems="flex-start">
              <ScheduledMeeting>Scheduled Meeting</ScheduledMeeting>
                <MeetingDateWrapper>
                  <MeetingTime>{moment(currentDate).format('LL')}</MeetingTime>
                  <MeetingTime>
                    {`${moment(nextMeet.time_from).local().format('HH:mm')} 
                    – 
                    ${moment(nextMeet.time_to).local().format('HH:mm')}`}
                    </MeetingTime>
                </MeetingDateWrapper>
            </MeetingInfoWrapper>
          : <NothingBlock
              iconName="dashboardNoSession"
              iconWidth="49px"
              iconHeight="59px"
            >
              No meetings for today, go to calendar to add one
            </NothingBlock>
        }
        <MeetingInfoWrapper padding="8px 0 8px 8px" minWidth="138px" width="20%" alignItems="flex-end">
          <GoToMeet m="8px 0" pinkBtn disabled={!nextMeet.google_meet_url}>
            <a href={nextMeet.google_meet_url} target="_blank" rel="noopener noreferrer">Go to the meet</a>
          </GoToMeet>
          <CopyMeetLink
            name="link"
            width="24px"
            height="24px"
            onClick={copy}
          />
        </MeetingInfoWrapper>
      </MeetingStatusWrapper>
    </MeetingStatusContainer>
  )
}