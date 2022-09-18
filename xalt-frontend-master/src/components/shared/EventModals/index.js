import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { CoachDetails as ModalDetails } from 'components/shared/CoachList';
import SvgIcon from 'components/shared/SvgIcon';
import Icon from 'components/shared/Icon';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import { Modal, Dropdown } from 'antd';
import useDebounce from 'utils/debounce';
import MembersActions from 'lib/redux/reducers/members';
import MeetingsActions from 'lib/redux/reducers/meetings';
import ProgramsActions from 'lib/redux/reducers/programs';
import {
  ModalWrapper,
  ModalContainer,
  ModalItem,
  CreateSectionWrapper,
  CreateSection,
  ModalInfo,
  ModalButton,
  MeetingInfo,
  MeetingTime,
  MemberName,
  ModalAction,
  ProgramDescription,
  DescriptionHeader,
  DescriptionText,
  Pending,
  SearchSection,
  FilterSection,
  SearchInput,
  NoChosenMember,
  UserList,
  UserListItem,
  UserName,
  RemoveIcon,
  FilterResult,
  StyledMenu,
  StyledItem,
} from './styles';

export const EventModal = (props) => {
  const { events, visible, setIsModalVisible, role, updateMeetingRequest } = props;

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (id, status) => {
    return role === 'member' ? (
      <StyledMenu>
        <StyledItem
          onClick={() => {
            updateMeetingRequest(id, !status);
            handleCancel();
          }}
          key="0"
        >
          {status ? 'Cancel meeting' : 'Confirm meeting'}
        </StyledItem>
      </StyledMenu>
    ) : (
      <></>
    );
  };

  return (
    <Modal
      centered={true}
      destroyOnClose={true}
      title={null}
      footer={null}
      visible={visible}
      onCancel={handleCancel}
    >
      <ModalWrapper>
        <ModalContainer isFullWidth={events.length <= 2}>
          {events.map((item, index) => {
            return (
              <ModalItem
                key={item.id || index}
                direction="column"
                justify="space-between"
                align="flex-start"
              >
                <ModalInfo>
                  <Icon src="empty-user-profile" />
                  <MeetingInfo>
                    <MeetingTime>{`${item.from} - ${item.to}`}</MeetingTime>
                    <MemberName>
                      {role === 'member'
                        ? item?.coach_profile?.user?.name
                        : item?.member_profile?.user?.name}
                    </MemberName>
                  </MeetingInfo>
                  <ModalAction>
                    <ButtonAux
                      pinkBtn
                      onClick={() => {
                        updateMeetingRequest(item.id, !status);
                        handleCancel();
                      }}
                    >
                      {status ? 'Cancel meeting' : 'Confirm meeting'}
                    </ButtonAux>
                  </ModalAction>
                </ModalInfo>
                <ProgramDescription>
                  <DescriptionHeader>Program Description</DescriptionHeader>
                  <DescriptionText>{item?.program?.description}</DescriptionText>
                </ProgramDescription>
                {!item.is_member_confirmed && (
                  <Pending>
                    <SvgIcon name="warning" width="16px" height="16px" />
                    Invite still pending
                  </Pending>
                )}
                <ModalButton disabled={!item.is_member_confirmed}>
                  <a href={item.google_meet_url} target="_blank" rel="noopener noreferrer">
                    Go to the meeting
                  </a>
                </ModalButton>
              </ModalItem>
            );
          })}
        </ModalContainer>
      </ModalWrapper>
    </Modal>
  );
};

const CreateModal = (props) => {
  const {
    members,
    programs,
    getMembersRequest,
    getProgramsRequest,
    cleanupMembers,
    cleanupPrograms,
    currentSlot,
    coach_profile_id,
    createMeetingRequest,
    visible,
    setIsModalVisible,
  } = props;
  const [userId, setUserId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [programId, setProgramId] = useState('');
  const [programTerm, setProgramTerm] = useState('');
  const [isMemberInputTouched, setIsMemberInputTouched] = useState(false);
  const [isProgramInputTouched, setIsProgramInputTouched] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const debouncedProgramTerm = useDebounce(programTerm, 500);

  const currentUser = useMemo(() => {
    return members.find((item) => item?.member_profile?.id === userId);
  }, [userId]);

  const currentProgram = useMemo(() => {
    return programs.find((item) => item.id === programId);
  }, [programId]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      cleanupMembers();
      getMembersRequest({ search_string: searchTerm });
      setIsMemberInputTouched(true);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedProgramTerm) {
      getProgramsRequest('session', programTerm);
      setIsProgramInputTouched(true);
    }
  }, [debouncedProgramTerm]);

  const handleInput = (event) => {
    setUserId('');
    setSearchTerm(event.target.value);
  };

  const handleProgram = (event) => {
    setProgramId('');
    setProgramTerm(event.target.value);
  };

  const handleCancel = () => {
    cleanupMembers();
    cleanupPrograms();
    setIsMemberInputTouched(false);
    setIsProgramInputTouched(false);
    setIsModalVisible(false);
  };

  return (
    <Modal
      centered={true}
      destroyOnClose={true}
      title={null}
      footer={null}
      visible={visible}
      onCancel={handleCancel}
    >
      <ModalWrapper isCreateForm={true}>
        <ModalContainer isFullWidth={true}>
          <ModalItem isCreateForm={true} direction="row" justify="flex-start" align="center">
            <CreateSectionWrapper>
              <CreateSection>
                <SearchSection>
                  <SvgIcon name="search" width="24px" height="24px" />
                  <SearchInput
                    name="search"
                    placeholder="Type member name..."
                    onChange={(event) => handleInput(event)}
                    onInput={(event) => handleInput(event)}
                  />
                </SearchSection>
                <FilterSection>
                  {!members.length ? (
                    <FilterResult>
                      <SvgIcon name="homework" width="40px" height="46px" />
                      <NoChosenMember>
                        {isMemberInputTouched ? 'Users not found' : 'Choose a member'}
                      </NoChosenMember>
                    </FilterResult>
                  ) : (
                    <UserList>
                      {currentUser ? (
                        <UserListItem key={userId} isChosen={true}>
                          <Icon src="empty-user-profile" />
                          <UserName>{currentUser.name}</UserName>
                          <RemoveIcon onClick={() => setUserId('')}>
                            <SvgIcon name="trash" width="24px" height="24px" />
                          </RemoveIcon>
                        </UserListItem>
                      ) : (
                        members.map((item) => (
                          <UserListItem
                            key={item?.member_profile?.id}
                            onClick={() => setUserId(item?.member_profile?.id)}
                          >
                            <Icon src="empty-user-profile" />
                            <UserName>{item.name}</UserName>
                          </UserListItem>
                        ))
                      )}
                    </UserList>
                  )}
                </FilterSection>
              </CreateSection>
            </CreateSectionWrapper>
            <CreateSectionWrapper>
              <CreateSection>
                <SearchSection>
                  <SvgIcon name="search" width="24px" height="24px" />
                  <SearchInput
                    name="search"
                    placeholder="Find program..."
                    onChange={(event) => handleProgram(event)}
                    onInput={(event) => handleProgram(event)}
                  />
                </SearchSection>
                <FilterSection>
                  {!programs.length ? (
                    <FilterResult>
                      <SvgIcon name="homework" width="40px" height="46px" />
                      <NoChosenMember>
                        {isProgramInputTouched ? 'Programs not found' : 'Choose a program'}
                      </NoChosenMember>
                    </FilterResult>
                  ) : (
                    <UserList>
                      {programId ? (
                        <UserListItem key={programId} isChosen={true}>
                          <UserName>{currentProgram.name}</UserName>
                          <RemoveIcon onClick={() => setProgramId('')}>
                            <SvgIcon name="trash" width="24px" height="24px" />
                          </RemoveIcon>
                        </UserListItem>
                      ) : (
                        programs.map((program) => (
                          <UserListItem key={program.id} onClick={() => setProgramId(program.id)}>
                            <UserName>{program.name}</UserName>
                          </UserListItem>
                        ))
                      )}
                    </UserList>
                  )}
                </FilterSection>
              </CreateSection>
            </CreateSectionWrapper>
            <ModalButton
              disabled={!userId || !programId}
              onClick={() => {
                createMeetingRequest(
                  coach_profile_id,
                  userId,
                  programId,
                  moment.utc(currentSlot),
                  moment.utc(currentSlot).add(15, 'minutes'),
                );
                handleCancel();
              }}
            >
              Add program
            </ModalButton>
          </ModalItem>
        </ModalContainer>
      </ModalWrapper>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    members: state.members.members,
    programs: state.programs.programs,
    coach_profile_id: state.profile.coach_profile?.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    getMembersRequest: (filters) => dispatch(MembersActions.getMembersRequest(filters)),
    getProgramsRequest: (program_type, search_string) =>
      dispatch(ProgramsActions.getProgramsRequest(program_type, search_string)),
    createMeetingRequest: (coach_profile_id, member_profile_id, program_id, time_from, time_to) =>
      dispatch(
        MeetingsActions.createMeetingRequest(
          coach_profile_id,
          member_profile_id,
          program_id,
          time_from,
          time_to,
        ),
      ),
    cleanupMembers: () => dispatch(MembersActions.cleanupMembers()),
    cleanupPrograms: () => dispatch(ProgramsActions.cleanupPrograms()),
  };
};

export const CreateModalComponent = connect(mapStateToProps, mapDispatchToProps)(CreateModal);
