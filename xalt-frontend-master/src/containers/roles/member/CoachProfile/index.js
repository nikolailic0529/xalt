import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Modal } from 'antd';

import { MainWrapper } from 'components/shared/Layout';
import {
  CoachProfileWrapper,
  CoachProfileLayoutItem,
  CoachProfileItem,
  CoachProfileCard,
  CoachProfileCardsWrapper,
} from 'components/shared/CoachProfile';
import {
  CoachCertificate,
  CoachListItemWrapper,
} from 'components/shared/CoachList';
import CoachUserPic from 'components/shared/CoachUserPic';
import CoachAbout from 'components/shared/CoachAbout';
import ButtonAux from 'components/shared/ButtonAux';
import CoachProfileCertification from 'components/shared/CoachProfileCertification';
import CoachProfileDomain from 'components/shared/CoachProfileDomain';
import CoachProfilesActions from 'lib/redux/reducers/coach_profiles';
import ProfileActions from 'lib/redux/reducers/profile';

const CoachBookBtn = styled(ButtonAux)`
  box-shadow: 0px 1px 2px rgba(51, 51, 51, 0.12);
`;

const CoachProfile = (props) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const coachId = props.match.params.id;
  const {
    coaches,
    bookCoachRequest,
    member_profile_id,
    coach_profile_id,
    getCoachProfilesRequest,
    coach_profiles,
  } = props;

  const coachProfileId = coaches.filter((coach) => coach.id === coachId)[0]
    ?.coach_profile.id;

  const showModal = () => {
    setVisible(true);
  };

  useEffect(() => {
    if (coachProfileId) {
      getCoachProfilesRequest(coachProfileId);
    }
  }, []);

  useEffect(() => {
    if (coach_profile_id) {
      history.push('/dashboard');
    }
  });

  return (
    <>
      {coach_profiles && (
        <MainWrapper key={coach_profiles.id}>
          <CoachProfileWrapper alignItems="stretch">
            <CoachProfileLayoutItem flexDirection="row">
              <CoachProfileItem width="50%">
                <CoachProfileCard>
                  <CoachUserPic
                    name={coach_profiles?.user?.name}
                    avatar={coach_profiles?.user?.avatar}
                    imgSize="110px"
                  />
                </CoachProfileCard>
              </CoachProfileItem>
              <CoachProfileItem width="50%">
                <CoachProfileCard>
                  <CoachListItemWrapper maxWidth={140} p="0 8px 16px">
                    <CoachCertificate
                      status={coach_profiles.xalt_sertified}
                      id="certified"
                    >
                      xAlt certified
                    </CoachCertificate>
                  </CoachListItemWrapper>
                  <CoachListItemWrapper maxWidth={100}>
                    <CoachCertificate
                      status={coach_profiles.verified}
                      id="verified"
                    >
                      Verified
                    </CoachCertificate>
                  </CoachListItemWrapper>
                </CoachProfileCard>
              </CoachProfileItem>
            </CoachProfileLayoutItem>
            <CoachProfileLayoutItem flexDirection="column">
              <CoachProfileItem width="100%">
                <CoachProfileCard alignItems="center" justifyContent="center">
                  <CoachBookBtn
                    pinkBtn
                    width="188px"
                    maxWidth="188px"
                    onClick={() => showModal(coach_profiles.id)}
                  >
                    Book this coach
                  </CoachBookBtn>
                </CoachProfileCard>
              </CoachProfileItem>
            </CoachProfileLayoutItem>
          </CoachProfileWrapper>
          <CoachProfileWrapper alignItems="flex-start">
            <CoachProfileLayoutItem flexDirection="column">
              <CoachProfileItem width="100%">
                <CoachProfileCard>
                  <CoachAbout profile={coach_profiles} />
                </CoachProfileCard>
              </CoachProfileItem>
            </CoachProfileLayoutItem>
            <CoachProfileLayoutItem flexDirection="column">
              <CoachProfileItem width="100%">
                <CoachProfileCard>
                  <CoachProfileCertification
                    certificats={coach_profiles?.coach_documents}
                  />
                </CoachProfileCard>
              </CoachProfileItem>
              <CoachProfileItem width="100%">
                <CoachProfileCard>
                  <CoachProfileCardsWrapper>
                    {(coach_profiles?.fitnes_domains || []).map((domain) => (
                      <CoachProfileDomain
                        name={domain.name}
                        key={domain.id}
                        id={domain.id}
                      >
                        {domain.coach_domain_name}
                      </CoachProfileDomain>
                    ))}
                  </CoachProfileCardsWrapper>
                </CoachProfileCard>
              </CoachProfileItem>
            </CoachProfileLayoutItem>
          </CoachProfileWrapper>
        </MainWrapper>
      )}
      <Modal
        visible={!!visible}
        title={false}
        width={638}
        okText="Confirm"
        cancelText="Cancel"
        onOk={() => {
          bookCoachRequest(member_profile_id, coachProfileId);
          setVisible(false);
        }}
        onCancel={() => setVisible(false)}
      >
        <div className="dialog-wrapper">
          <h3 className="dialog-title">
            Are you sure you want to book this coach ?
          </h3>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  coach_profiles: state.coach_profiles.coach_profiles,
  coaches: state.coaches.coaches,
  member_profile_id: state.profile.member_profile?.id,
  coach_profile_id: state.profile.member_profile?.coach_profile_id,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getCoachProfilesRequest: (id) =>
    dispatch(CoachProfilesActions.getCoachProfilesRequest(id)),
  bookCoachRequest: (member_profile_id, coach_profile_id) =>
    dispatch(
      ProfileActions.bookCoachRequest(member_profile_id, coach_profile_id),
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoachProfile);
