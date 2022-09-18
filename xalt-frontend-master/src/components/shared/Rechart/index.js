import React, { useState, useEffect } from 'react';
import { AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area } from 'recharts';
import styled from 'styled-components';

import { DashboardHeader } from 'components/shared/MemberProfile';
import DashboardStatisticWidget from 'components/shared/DashboardStatisticWidget';
import { theme } from 'components';
import { space, layout, flexbox, shadow, border } from 'styled-system';
import SelectComponent from 'components/shared/Select';
import RadioButtons from 'components/shared/RadioButtons';

const ChartContainer = styled.div`
  ${space};
  ${layout};
  @media (max-width: 1336px) {
    width: 100%;
  }
`;

ChartContainer.defaultProps = {
  width: '100%',
};

const ChartWrapper = styled.div`
  ${space};
  ${layout};
  ${flexbox};
  ${shadow};
  ${border};
`;

ChartWrapper.defaultProps = {
  display: 'flex',
  p: 2,
  width: '100%',
  flexDirection: 'column',
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
  borderRadius: 20,
  minHeight: 845,
};

const ChartHeader = styled.div`
  ${layout};
  ${space};
  ${flexbox};
`;

ChartHeader.defaultProps = {
  display: 'flex',
  width: '100%',
  minHeight: 46,
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  p: 2,
};

const options = [
  { value: 8, title: '8 sessions' },
  { value: 12, title: '12 sessions' },
];

export default function Rechart(props) {
  const { getWidgetRequest, memberId, data, questions, coachId } = props;

  const [questionId, setQuestionId] = useState(questions?.length ? questions[0].id : '');
  const [sessionsValue, setSessionsValue] = useState(options[0].value);

  const filters = `sessions_limit.${sessionsValue},member_profile_id.${memberId},report_question_id.${questionId}`;

  useEffect(() => {
    if (coachId && questionId) {
      getWidgetRequest('condition_assessment_by_member', filters);
    }
  }, [questionId, sessionsValue]);

  return (
    <ChartContainer>
      <ChartWrapper>
        <ChartHeader>
          <DashboardHeader>{(questions?.find((item) => item.id === questionId) || {}).title}</DashboardHeader>
          <SelectComponent options={options} onChange={(value) => setSessionsValue(value)} />
        </ChartHeader>
        {data.length ? (
          <ResponsiveContainer width="100%" height={500}>
            <AreaChart
              data={data}
              margin={{
                top: 16,
                right: 32,
                left: 32,
                bottom: 16,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.colors.darkPink} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme.colors.darkPink} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} domain={[0, 10]} width={30} axisLine={false} tickLine={false} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={theme.colors.gray1000}
                fillOpacity={1}
                fill="url(#colorUv)"
                dot={{
                  stroke: theme.colors.black,
                  strokeWidth: 2,
                  r: 4,
                  fill: theme.colors.white,
                  fillOpacity: 1,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <DashboardStatisticWidget minHeight={500} />
        )}
        <RadioButtons options={questions || []} onChange={(id) => setQuestionId(id)} />
      </ChartWrapper>
    </ChartContainer>
  );
}
