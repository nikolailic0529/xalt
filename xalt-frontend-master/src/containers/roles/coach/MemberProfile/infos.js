import React from 'react';
import { connect } from 'react-redux';
import { MemberTabWrapper } from 'components/shared/MemberProfile';
import { InfoWrapper, ItemWrapper, Question, QuestionText, RoundedAnswer } from './styles';

const Infos = (props) => {
  const { member_profile } = props;
  return (
    <MemberTabWrapper>
      <InfoWrapper>
        <ItemWrapper flexDirection="column" alignItems="flex-start">
          <Question>
            <span>Question 1: </span>
            <QuestionText>What are your health and fitness goals?</QuestionText>
          </Question>
          {member_profile.fitnes_domains.map((item) => (
            <span>{item.member_goal_name}</span>
          ))}
        </ItemWrapper>
        <ItemWrapper>
          <Question>
            <span>Question 2: </span>
            <QuestionText>
              How many hours did you spend exercising/moving in the past week?
            </QuestionText>
          </Question>
          <RoundedAnswer>{member_profile?.hours_spend_last_week} hours</RoundedAnswer>
        </ItemWrapper>
        <ItemWrapper>
          <Question>
            <span>Question 3: </span>
            <QuestionText>
              How many sessions per week would you like to schedule with your coach?
            </QuestionText>
          </Question>
          <span>{member_profile?.subscription?.description}</span>
        </ItemWrapper>
      </InfoWrapper>
    </MemberTabWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    member_profile: state.member_profile.member_profile,
  };
};

export default connect(mapStateToProps, null)(Infos);
