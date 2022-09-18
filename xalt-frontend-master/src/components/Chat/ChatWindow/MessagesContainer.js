import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import ProfileActions from 'lib/redux/reducers/profile';
import When from 'components/shared/When';
import Text from 'components/shared/Text';
import { Empty } from 'antd';
import { MessagesContainer, Message, EmptyBox } from './styles';

const Messages = ({ messages, myId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  });

  return (
    <MessagesContainer ref={containerRef}>
      <When condition={messages.length}>
        {
          messages.map(({ content, sender_id: senderId }, key) => (
            <Message key={key} myMessage={senderId === myId}>
              <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }} />
            </Message>
          ))
        }
      </When>

      <When condition={!messages.length}>
        <EmptyBox justifyContent="center" alignItems="center">
          <Empty description={(<Text>Your history is Empty</Text>)} />
        </EmptyBox>
      </When>
    </MessagesContainer>
  );
};

const mapStateToProps = (state) => ({
  myId: state.profile.id,
  messages: state.messages.chatMessages,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getUserProfileRequest: () => dispatch(ProfileActions.getUserProfileRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
