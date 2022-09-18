import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import * as R from 'ramda'
import ReportsActions from 'lib/redux/reducers/reports';

export const useReports = (member_id = null) => {
  const reports = useSelector(state => state.reports.reports || []);
  const dispatch = useDispatch();
  const getReports = (filters) => dispatch(ReportsActions.getReportsRequest(filters));

  const applyFilters = (params) => {
    const clearParams = R.pipe(
      (parameters) => ({ ...parameters, sort: parameters.created_at === 'asc' ? 'created_at' : '-created_at' }),
      R.reject(R.anyPass([R.isEmpty, R.isNil, R.equals("null")])),
      (parameters) => member_id ? { ...parameters, member_id } : parameters
    )(params)

    return getReports(clearParams)
  };

  useEffect(() => {
    if (R.isNil(member_id)) {
      getReports({})
    } else {
      getReports({ member_id })
    }
  }, []);

  return [reports, applyFilters]
}
