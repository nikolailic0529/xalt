import React from 'react';
import moment from 'moment';
import styled, {css} from 'styled-components';
import { useHistory } from 'react-router';

import colors from 'lib/theme/colors';
import ButtonAux from 'components/shared/ButtonAux';

const AvailabilityContainer = styled.div`
  padding: 8px;
  width: 25%;
  min-width: 180px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const AvailabilityWrapper = styled.div`
  width: 100%;
  min-height: 180px;
  box-shadow: 0px 2px 8px rgba(51, 51, 51, 0.12);
  border-radius: 20px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 8px;
`

const AvailableStatus = styled.span`
  font-weight: bold;
  font-size: 16px;
  ${(props) =>
    css`
      color: ${props.isAvailable ? colors.kingfisherDaisy : colors.darkPink};
    `};
  padding: 4px;
`;

const AvailableData = styled.span`
  font-size: 14px;
  color: ${colors.gray1000};
  padding: 4px;
`;

const GoToCalendar = styled(ButtonAux)`
  :disabled {
    background: ${colors.gray500};
  }
`;

export default (props) => {
  const { currentDate } = props;
  const history = useHistory();
  const status = true;
  return (
    <AvailabilityContainer>
      <AvailabilityWrapper>
        <DataWrapper>
          <AvailableStatus isAvailable={status}>{status ? 'Avialable' : 'Unavailable'}</AvailableStatus>
          <AvailableData>{moment(currentDate).format('DD MMMM YYYY')}</AvailableData>
        </DataWrapper>
        <GoToCalendar disabled={!status} onClick={() => history.push('/calendar')} pinkBtn width="182px">
          Go to calendar
        </GoToCalendar>
      </AvailabilityWrapper>
    </AvailabilityContainer>
  )
}