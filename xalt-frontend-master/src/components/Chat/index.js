import React, { useEffect, useState } from 'react';
import When from 'components/shared/When';
import Text from 'components/shared/Text';
import Flex from 'components/shared/Flex';
import { Input } from 'components/shared/Form';
import { SearchOutlined } from '@ant-design/icons';
import { Row, Empty, Layout } from 'antd';
import ProfileActions from 'lib/redux/reducers/profile';
import { connect, useDispatch } from 'react-redux';
import MessagesActions from 'lib/redux/reducers/messages';
import { uniqBy } from 'lodash';
import moment from 'moment';
import MembersList from './MembersList';
import ChatWindow from './ChatWindow';
import {
  Container, StyledCol, MembersListHeader, MembersListWrapper,
} from './styles';

const Chat = ({
  getUserProfileRequest, getMessages, members, conversations, isCoach,
}) => {
  useEffect(() => {
    getUserProfileRequest();
  }, []);

  const [nameFilter, setNameFilter] = useState('');
  const [
    selectedConversation, setSelectedConversation,
  ] = useState(!isCoach ? conversations[0] : null);

  const selectConversation = (conversationId) => {
    const conversation = conversations.find(({ id }) => id === conversationId);
    setSelectedConversation(conversation);
    getMessages(conversationId);
  };

  return (
    <>
      <When condition={!conversations || !conversations.length}>
        <Container>
          <Flex alignItems="center" justifyContent="center" className="h-100">
            <Empty description={(<Text bigSize>No Conversations were found</Text>)} />
          </Flex>
        </Container>
      </When>
      <When condition={conversations && conversations.length}>
        <Row>
          <StyledCol xl={10} md={12} xs={24}>
            <Container>
              <Layout style={{ height: '100%' }}>
                <When condition={isCoach}>
                  <MembersListHeader>
                    <Input
                      placeholder="Search ..."
                      onChange={(e) => setNameFilter(new RegExp(e.target.value, 'gi'))}
                      prefix={<SearchOutlined />}
                      theme="classic-light"
                    />
                  </MembersListHeader>
                </When>
                <MembersListWrapper>
                  <When condition={!members.filter(({ name }) => name.match(nameFilter)).length}>
                    <Flex className="h-100" alignItems="center" justifyContent="center">
                      <Empty />
                    </Flex>
                  </When>
                  <MembersList
                    selectFirst={!isCoach}
                    members={members.filter(({ name }) => name.match(nameFilter))}
                    selectConversation={selectConversation}
                  />
                </MembersListWrapper>
              </Layout>
            </Container>
          </StyledCol>
          <StyledCol xl={14} md={12} xs={24}>
            <Container>
              <When condition={selectedConversation}>
                <ChatWindow conversation={selectedConversation} />
              </When>

              <When condition={!selectedConversation}>
                <Flex alignItems="center" justifyContent="center" className="h-100">
                  <Empty
                    description={
                      (
                        <>
                          <br />
                          <Text bigSize darkPink>&larr; Select user to start chatting</Text>
                          <br />
                        </>
                      )
                    }
                  />
                </Flex>
              </When>
            </Container>
          </StyledCol>
        </Row>
      </When>
    </>
  );
};

const mapStateToProps = (state) => ({
  isCoach: state.profile?.role === 'coach',
  conversations: state.messages.conversations,
  members: state.profile
    ? uniqBy(
      state.messages.conversations
        ?.map(({
          id, users, messages, read_marks: readMarks,
        }) => users.filter((user) => user.id !== state.profile.id).map((user) => {
          const isRead = readMarks
            .filter(({ reader_id: readerId }) => readerId === state.profile.id)
            .find(
              ({ timestamp }) => {
                const lastReadTime = moment(moment(timestamp).format());
                const lastMessageTime = moment(moment(messages[0]?.created_at).format());

                return lastReadTime.isSame(lastMessageTime);
              },
            );

          let unreadMessagesCount;

          if (!isRead) {
            const readMarkTimestamp = moment(
              moment(readMarks.find(
                ({ reader_id: readerId }) => readerId === state.profile.id,
              )?.timestamp).format(),
            );

            unreadMessagesCount = messages.findIndex(
              ({ created_at: createdAt, sender_id }) => sender_id !== state.profile.id && readMarkTimestamp.isSame(moment(createdAt).format()),
            ) + 1;
          }

          return {
            ...user,
            conversationId: id,
            isRead,
            unreadMessagesCount,
            lastMessage: {
              content: messages[0]?.content,
              createdAt: moment(messages[0]?.created_at).format('hh:mm A'),
            },
          };
        })).flat(1)
        .filter(({ role }) => role !== state.profile?.role),
      'id',
    ) : [],
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getUserProfileRequest: () => dispatch(ProfileActions.getUserProfileRequest()),
  updateConversation: (conversationId) => dispatch(MessagesActions.updateConversationRequest(conversationId)),
  getMessages: (conversationId) => dispatch(MessagesActions.getMessagesRequest(conversationId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
