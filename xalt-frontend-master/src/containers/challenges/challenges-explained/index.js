import React, { useState } from 'react';
import Container from 'components/shared/Container';
import { BaseTitle } from 'components/shared/General';
import { ChallengeAlert, ChallengeAlertWrapper, ChallengesExplainedWrapper, ListItem, OrderedList, SmallText } from './styles';
import challenge2 from './challenge-2.png';
import { ArticleItemWithImage, BaseText } from '../../../components/shared/General';
import Img from '../../../components/shared/Img';
import Icon from '@ant-design/icons/lib/components/Icon';
import infoIcon from '../../../assets/images/info-icon.png';

// import { Space } from 'antd';
// import { OrderedList } from '../Layout';

const ChallengesExplained = () => {
return (
    <ChallengesExplainedWrapper>
    <Container medium>
        <BaseTitle>How Do Corporate Challenges Work?</BaseTitle>
        <ArticleItemWithImage image={challenge2} variant="blue">
        <OrderedList>
        <ListItem>Corporate manager(s) contact xAlt</ListItem>
        <ListItem>xAlt assigns the organization/manager(s) an xAlt Certified Coach</ListItem>
        <ListItem>
            Manager(s) work with xAlt representative to customize their challenge (i.e. rules,
            objectives, time of day to participate, leadership board, incentives, etc.)
        </ListItem>
        <ListItem>
            Managers select employee(s) to act as Team Leaders to assist in managing the
            challenge
        </ListItem>
        <ListItem>Employees sign-up and attend a kick off event</ListItem>
        </OrderedList>
        <SmallText>
        *Organizations can engage in company-wide, interdepartmental and/or interdepartmental
        challenges.
        </SmallText>
        </ArticleItemWithImage>
    </Container>
    <ChallengeAlertWrapper>
        <Container medium>
        <ChallengeAlert>
            <Img alignSelf='center' maxWidth='100px' src="info-icon.png" />
            <BaseText color="#84BDDF">
            Signing up and implementing Corporate Competitions with xAlt is maximizing the
            benefits xAlt has to offer!
            </BaseText>
        </ChallengeAlert>
        </Container>
    </ChallengeAlertWrapper>
    </ChallengesExplainedWrapper>
);
};

export default ChallengesExplained;
