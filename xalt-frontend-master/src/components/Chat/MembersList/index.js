import React, { useState } from 'react';
import When from 'components/shared/When';
import Spacer from 'components/shared/Spacer';
import MemberCard from './MemberCard';

const MembersList = ({ selectFirst, members, selectConversation }) => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(selectFirst ? 0 : -1);

  return (
    <When condition={members}>
      <Spacer direction="vertical" fullWidth>
        {
          members.map((member, key) => (
            <MemberCard
              key={key}
              member={member}
              selected={selectedCardIndex === key}
              onClick={() => {
                setSelectedCardIndex(key);
                selectConversation(members[key].conversationId);
              }}
            />
          ))
        }
      </Spacer>
    </When>
  );
};

export default MembersList;
