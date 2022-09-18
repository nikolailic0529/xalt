import React from 'react';
import FiltersPanel from 'components/shared/FiltersPanel';
import { MemberTabWrapper } from 'components/shared/MemberProfile';
import ReportsList from 'components/ReportsList';
import { REPORT_OPTIONS } from 'lib/constants';
import { useReports } from 'utils/reportsHook';

const MemberReports = ({ memberId }) => {
  const filters = [
    {
      name: 'is_filled',
      title: 'Status',
      type: 'dropdown',
      options: REPORT_OPTIONS.IS_FILLED,
      span: 3,
    },
    {
      name: 'created_at',
      title: 'Date',
      type  : 'asc/desc',
      span: 2,
    },
  ]

  const [reports, applyFilters] = useReports(memberId)

  return (
    <MemberTabWrapper flexDirection="column">
      <FiltersPanel
        onChange={applyFilters}
        clearable
        filters={filters}
      />

      <br />
      <ReportsList reports={reports} />
    </MemberTabWrapper>
  )
};

export default MemberReports;
