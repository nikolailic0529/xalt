import React, { useEffect } from 'react';
import FiltersPanel from 'components/shared/FiltersPanel';
import ReportsList from 'components/ReportsList';
import { useReports } from 'utils/reportsHook';
import MembersActions from 'lib/redux/reducers/members';
import { REPORT_OPTIONS } from 'lib/constants';
import { connect } from 'react-redux';

const Reports = ({ getMembers, cleanupMembers }) => {
  const filters = [
    {
      name: 'member_id',
      title: 'User name',
      type: 'searchable_dropdown',
      action: (userId) =>
        getMembers({ search_string: userId, pagination: false }),
      onUpdated: (props) =>
        props.members.members.map(({ id: value, name: label }) => ({
          value,
          label,
        })),
      span: 3,
    },
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
      type: 'asc/desc',
      span: 2,
    },
  ];

  const [reports, applyFilters] = useReports();

  useEffect(() => {
    return () => cleanupMembers();
  }, []);

  return (
    <>
      <FiltersPanel onChange={applyFilters} clearable filters={filters} />

      <br />
      <ReportsList reports={reports} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMembers: (filters) => dispatch(MembersActions.getMembersRequest(filters)),
  cleanupMembers: () => dispatch(MembersActions.cleanupMembers()),
});

export default connect(null, mapDispatchToProps)(Reports);
