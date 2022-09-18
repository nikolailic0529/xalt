import React from 'react';
import styled from 'styled-components';
import { theme } from 'components';
import CoachUserPic from 'components/shared/CoachUserPic';
import ButtonAux from 'components/shared/ButtonAux';
import { Link } from 'react-router-dom';
import { flexbox, layout, space } from 'styled-system';

export const MembersScreenWrapper = styled.ul`
  ${flexbox};
  ${layout};
  ${space};
`;

MembersScreenWrapper.defaultProps = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  width: 'calc(100% + 16px)',
  m: '0 -8px',
  minHeight: '618px',
};

export const MemberCardWrapper = styled.li`
  width: 100%;
  background: ${theme.colors.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  height: 190px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const Wrapper = styled.div`
  padding: 8px;
  width: 25%;
  min-width: 190px;
  @media (max-width: 1010px) {
    width: 33%;
  }
  @media (max-width: 820px) {
    width: 50%;
  }
  @media (max-width: 645px) {
    width: 100%;
  }
`;

const MemberButton = styled(ButtonAux)`
  border: none;
  color: ${theme.colors.white};
  background: ${theme.colors.darkPink};
`;

export const MembersScreenCard = (props) => {
  const { id, name, avatar } = props;
  return (
    <Wrapper>
      <MemberCardWrapper>
        <CoachUserPic avatar={avatar} name={name} imgSize={55} />
        <Link to={`/member-profile/${id}`}>
          <MemberButton width="152px">See member</MemberButton>
        </Link>
      </MemberCardWrapper>
    </Wrapper>
  );
};
