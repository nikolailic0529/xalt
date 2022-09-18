import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Spin, Empty } from 'antd';
import styled from 'styled-components';

import Pagination from 'components/shared/Pagination';
import FiltersPanel from 'components/shared/FiltersPanel';
import Flex from 'components/shared/Flex';
import When from 'components/shared/When';
import { MembersScreenWrapper, MembersScreenCard } from 'components/shared/MembersScreen';
import MembersActions from 'lib/redux/reducers/members';

const perPage = 12;

const FiltersPanelWapper = styled.div`
  margin: 1.5rem 0rem 0.5rem 0rem;
`;

const Members = (props) => {
  const { getMembersRequest, cleanupMembers, members, fetching, isLimit } = props;
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getMembersRequest({ page, per_page: perPage });
    // return () => cleanupMembers();
  }, []);

  const getSort = ({ name }) => {
    if (name) {
      return name === 'asc' ? 'name' : '-name';
    }
  };

  const onPageChange = (item) => {
    setPage(item);
    getMembersRequest({
      page: item,
      per_page: perPage,
      search_string: filters.search_string,
      sort: getSort(filters),
    });
  };

  const applyFilters = (filters) => {
    setPage(1);
    cleanupMembers();
    setFilters(filters);
    getMembersRequest({
      page: 1,
      per_page: perPage,
      search_string: filters.search_string,
      sort: getSort(filters),
    });
  };

  return (
    <>
      <FiltersPanelWapper>
        <FiltersPanel
          onChange={applyFilters}
          filters={[
            {
              name: 'search_string',
              type: 'search',
              span: 7,
            },
            {
              name: 'name',
              title: 'A to Z',
              type: 'asc/desc',
              span: 2,
            },
          ]}
          clearable
        />
      </FiltersPanelWapper>
      <When condition={!!members.length}>
        {fetching ? (
          <MembersScreenWrapper justifyContent="center" alignItems="center">
            <Spin size="large" />
          </MembersScreenWrapper>
        ) : (
          <MembersScreenWrapper>
            {members.slice((page - 1) * perPage, page * perPage).map((item) => (
              <MembersScreenCard
                name={item.name}
                id={item?.member_profile?.id}
                avatar={item?.avatar}
              />
            ))}
          </MembersScreenWrapper>
        )}
        <Pagination
          onPageChange={onPageChange}
          pageNeighbours={1}
          page={page}
          setPage={setPage}
          total={members.length}
          perPage={perPage}
          isLimit={isLimit}
        />
      </When>
      <When condition={!members.length}>
        <Flex height="50vh" alignItems="center" justifyContent="center">
          <Empty />
        </Flex>
      </When>
    </>
  );
};

const mapStateToProps = (state) => ({
  members: state.members.members,
  fetching: state.members.fetching,
  isLimit: state.members.isLimit,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMembersRequest: (filters) => dispatch(MembersActions.getMembersRequest(filters)),
  cleanupMembers: () => dispatch(MembersActions.cleanupMembers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Members);
