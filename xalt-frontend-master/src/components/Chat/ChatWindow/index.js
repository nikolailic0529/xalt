import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Space, Form } from 'antd';
import MessagesActions from 'lib/redux/reducers/messages';
import Flex from 'components/shared/Flex';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';
import { TextArea } from 'components/shared/Form';
import styled from 'styled-components';
import { createConsumer } from '@rails/actioncable';
import messagesTypes from 'lib/redux/types/messages';
import MessagesContainer from './MessagesContainer';
import Header from './Header';

const { SET_CHAT_MESSAGES } = messagesTypes;

const FullWidthSpace = styled(Space)`
  width: 100%;
`;

const { useForm } = Form;

let activeSubscription;
let currentConversationId;

const ChatWindow = ({
  sendMessage,
  conversation,
  accessToken,
  accessClient,
  accessUID,
  myId,
  messages,
}) => {
  const [form] = useForm();
  const dispatch = useDispatch();

  const url = `${process.env.WS_URL}/cable?access_token=${accessToken}&access_client=${accessClient}&access_uid=${accessUID}`;

  const consumer = createConsumer(url);

  const initializeSocket = () => {
    currentConversationId = conversation.id;

    if (activeSubscription) {
      consumer.subscriptions.remove(activeSubscription);
    }

    activeSubscription = consumer.subscriptions.create(
      {
        channel: 'ConversationChannel',
        conversation_id: conversation.id,
      },
      {
        initialized() {
          console.info('>>> initialized');
        },

        connected() {
          console.info('>>> connected');
        },

        disconnected() {
          console.error('>>> disconnected');
        },

        received(data) {
          console.info('>>> received', data);

          form.resetFields();

          dispatch({
            type: SET_CHAT_MESSAGES,
            data: [
              {
                id: data.id,
                sender_id: data.sender_id,
                content: data.content,
                created_at: data.created_at,
              },
            ],
          });
        },
      },
    );
  };

  useEffect(() => {
    if (consumer && conversation.id !== currentConversationId) {
      initializeSocket();
    }
  });

  const onSubmit = ({ content }) => {
    console.log('---content----', content);
    if (content && content.trim()) {
      sendMessage({ content: content.trim(), conversation_id: conversation.id });
    }
  };

  const getOpponent = () => ({
    ...conversation.users.find(({ id }) => id !== myId),
    lastMessage: messages ? messages[0] : null,
  });

  return (
    <>
      <Header opponent={getOpponent()} />

      <MessagesContainer />

      <Form form={form} name="login" onFinish={onSubmit} initialValues={{}}>
        <FullWidthSpace direction="vertical">
          <TextArea
            id="content"
            name="content"
            theme="chat"
            placeholder="Type your message here..."
            resize={false}
            onEnter={(content, node) => onSubmit({ content, node })}
            focusOnMount
          />

          <Flex justifyContent="flex-end">
            <ButtonAux pinkBtn>
              <Text white uppercase>
                send
              </Text>
            </ButtonAux>
          </Flex>
        </FullWidthSpace>
      </Form>
    </>
  );
};

const mapStateToProps = (state) => ({
  myId: state.profile.id,
  messages: state.messages.chatMessages,
  accessToken: state.auth.accessToken,
  accessClient: state.auth.accessClient,
  accessUID: state.auth.accessUID,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  sendMessage: (data) => dispatch(MessagesActions.sendMessageRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);
