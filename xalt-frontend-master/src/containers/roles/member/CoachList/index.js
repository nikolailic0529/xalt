import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { Modal, Spin } from 'antd';
import {
  CoachesList,
  CoachesListCard,
  CoachesListCardL,
  CoachesListCardR,
  CoachListCertWrapper,
  CoachDescription,
  CoachCertificate,
  CoachBookingButton,
  CoachDetails,
  CoachListItemWrapper,
  UserPicName,
} from 'components/shared/CoachList';
import Icon from 'components/shared/Icon';
import Pagination from 'components/shared/Pagination';
import CoachesActions from 'lib/redux/reducers/coaches';
import ProfileActions from 'lib/redux/reducers/profile';

const perPage = 3;

const CoachList = (props) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const {
    coaches,
    getCoaches,
    bookCoachRequest,
    memberProfileId,
    coachProfileId,
    fetching,
    isLimit,
    subscriptionType,
  } = props;

  const [page, setPage] = useState(1);

  const showModal = (id) => {
    setVisible(id);
  };

  useEffect(() => {
    getCoaches(page, perPage, subscriptionType === 'rehabilitation' ? subscriptionType : '');
  }, []);

  useEffect(() => {
    if (coachProfileId) {
      history.push('/dashboard');
    }
  });

  const onPageChange = (item) => {
    setPage(item);
    getCoaches(item, perPage, subscriptionType === 'rehabilitation' ? subscriptionType : '');
  };

  return (
    <>
      {fetching ? (
        <CoachesList justifyContent="center" alignItems="center">
          <Spin size="large" />
        </CoachesList>
      ) : (
        <CoachesList>
          {coaches.slice((page - 1) * perPage, page * perPage).map((item) => (
            <CoachesListCard key={item.id}>
              <CoachesListCardL>
                <CoachListItemWrapper minWidth={100} maxWidth={223}>
                  <Icon
                    src={item?.avatar?.url ? item?.avatar?.url : 'empty-user-profile'}
                    width="55px"
                    height="55px"
                  />
                  <UserPicName>{item.name}</UserPicName>
                </CoachListItemWrapper>
                <CoachListItemWrapper maxWidth={462}>
                  <CoachDescription>{item?.coach_profile?.about}</CoachDescription>
                </CoachListItemWrapper>
              </CoachesListCardL>
              <CoachesListCardR>
                <CoachListCertWrapper>
                  <CoachListItemWrapper maxWidth={140}>
                    <CoachCertificate status={item?.coach_profile.xalt_sertified} id="certified">
                      xAlt certified
                    </CoachCertificate>
                  </CoachListItemWrapper>
                  <CoachListItemWrapper maxWidth={100}>
                    <CoachCertificate status={item?.coach_profile.verified} id="verified">
                      Verified
                    </CoachCertificate>
                  </CoachListItemWrapper>
                </CoachListCertWrapper>
                <CoachListItemWrapper maxWidth={164}>
                  <CoachBookingButton onClick={() => showModal(item?.coach_profile?.id)}>
                    Book Coach
                  </CoachBookingButton>
                  <CoachDetails to={`/coach-profile/${item.id}`}>See details</CoachDetails>
                </CoachListItemWrapper>
              </CoachesListCardR>
            </CoachesListCard>
          ))}
          <Modal
            visible={!!visible}
            title={false}
            width={638}
            okText="Confirm"
            cancelText="Cancel"
            onOk={() => {
              bookCoachRequest(memberProfileId, visible);
              setVisible(false);
            }}
            onCancel={() => setVisible(false)}
            closeIcon={false}
          >
            <div className="dialog-wrapper">
              <h3 className="dialog-title">Are you sure you want to book this coach ?</h3>
            </div>
          </Modal>
        </CoachesList>
      )}
      <Pagination
        onPageChange={onPageChange}
        pageNeighbours={1}
        page={page}
        setPage={setPage}
        isLimit={isLimit}
        total={coaches.length}
        perPage={perPage}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  coaches: state.coaches.coaches,
  memberProfileId: state.profile.member_profile?.id,
  coachProfileId: state.profile.member_profile?.coach_profile_id,
  fetching: state.coaches.fetching,
  isLimit: state.coaches.isLimit,
  subscriptionType: state.profile?.subscription_type || 'subscription',
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getCoaches: (page, per_page, coachType) =>
    dispatch(CoachesActions.getCoachesRequest(page, per_page, coachType)),
  bookCoachRequest: (member_profile_id, coach_profile_id) =>
    dispatch(ProfileActions.bookCoachRequest(member_profile_id, coach_profile_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoachList);
