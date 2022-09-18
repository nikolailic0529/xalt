import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'components';
import When from 'components/shared/When';
import VimeoEmbed from 'components/shared/VimeoEmbed';
import SvgIcon from 'components/shared/SvgIcon';
import { flexbox, layout } from 'styled-system';
import takeValue from 'utils/takeValue';
import { DarkResult } from 'containers/roles/coach/MemberChallenges/View/styles';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';

const ChallengeWrapper = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ChallengeItem = styled.div`
  ${flexbox};
  ${layout};
  padding: 8px 0;
  width: 100%;
`;

ChallengeItem.defaultProps = {
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
};

const ChallengeTitle = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0.2px;
  text-align: left;
  width: 20%;
  min-width: 140px;
  padding: 0 8px;
  color: ${theme.colors.gray1000};
`;

const ChallengeDesc = styled.span`
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-align: left;
  padding: 0 8px;
  color: ${theme.colors.gray1000};
  ${(props) => (props.bold
    ? css`
          font-weight: bold;
        `
    : css`
          font-weight: 400;
        `)};
`;

const ChallengeLink = styled.div`
  width: 100%;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${theme.colors.darkPink};
  filter: drop-shadow(0px 1px 2px rgba(51, 51, 51, 0.06));
  border-radius: 10px;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  color: ${theme.colors.darkPink};
`;

const ChallengeUrl = styled.span`
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PointerIcon = styled(SvgIcon)`
  cursor: pointer;
`;

const VideoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 16px;
`;

const Challenge = (props) => {
  const {
    challenge: {
      challenge,
      repetitions,
      repetitions_duration,
      sets,
      link_url,
      id,
    },
    deleteProgramChallengeRequest,
    program_id,
    type,
    role,
  } = props;

  const copy = () => {
    link_url && navigator.clipboard.writeText(link_url);
  };

  const deleteChallenge = () => {
    deleteProgramChallengeRequest(type, program_id, id);
  };

  return (
    <ChallengeWrapper>
      {role === 'member' && (
        <ChallengeItem justifyContent="flex-end">
          <PointerIcon
            onClick={deleteChallenge}
            name="trash"
            width="24px"
            height="24px"
          />
        </ChallengeItem>
      )}
      {challenge?.vimeo_video_info && (
        <VideoWrapper>
          <When condition={challenge?.vimeo_video_info?.uri}>
            <VimeoEmbed url={challenge?.vimeo_video_info?.uri} type="player" />
          </When>
          <When condition={!challenge?.vimeo_video_info?.uri}>
            <DarkResult
              status="error"
              title={(
                <Text white bigSize>
                  Video cannot be played
                </Text>
              )}
              subTitle={
                challenge?.video_url ? (
                  <Text white>
                    You can proceed to video by link
                    {' '}
                    <a
                      href={`https://${challenge?.video_url}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <u>{challenge?.video_url}</u>
                    </a>
                  </Text>
                ) : (
                  ''
                )
              }
              extra={[
                challenge?.video_url ? (
                  <a
                    href={challenge?.video_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ButtonAux pinkBtn>Go to Link &rarr;</ButtonAux>
                  </a>
                ) : (
                  ''
                ),
              ]}
            />
          </When>
        </VideoWrapper>
      )}
      {challenge?.category && (
        <ChallengeItem>
          <ChallengeTitle>Category</ChallengeTitle>
          <ChallengeDesc>
            {takeValue('CATEGORIES', challenge?.category)}
          </ChallengeDesc>
        </ChallengeItem>
      )}
      {challenge?.equipment && (
        <ChallengeItem>
          <ChallengeTitle>Equipment</ChallengeTitle>
          <ChallengeDesc>
            {takeValue('EQUIPMENTS', challenge?.equipment)}
          </ChallengeDesc>
        </ChallengeItem>
      )}
      {challenge?.difficulty && (
        <ChallengeItem>
          <ChallengeTitle>Difficulty</ChallengeTitle>
          <ChallengeDesc>
            {takeValue('DIFFICULTIES', challenge?.difficulty)}
          </ChallengeDesc>
        </ChallengeItem>
      )}
      {challenge?.pose && (
        <ChallengeItem>
          <ChallengeTitle>Pose/Posture</ChallengeTitle>
          <ChallengeDesc>{challenge?.pose}</ChallengeDesc>
        </ChallengeItem>
      )}
      {challenge?.set_up && (
        <ChallengeItem>
          <ChallengeTitle>Set up</ChallengeTitle>
          <ChallengeDesc>{challenge?.set_up}</ChallengeDesc>
        </ChallengeItem>
      )}
      <ChallengeItem>
        <ChallengeTitle className="title">Repetition</ChallengeTitle>
        <ChallengeDesc bold className="desc">
          {repetitions}
        </ChallengeDesc>
      </ChallengeItem>
      <ChallengeItem>
        <ChallengeTitle className="title">Duration</ChallengeTitle>
        <ChallengeDesc bold className="desc">
          {repetitions_duration}
        </ChallengeDesc>
      </ChallengeItem>
      <ChallengeItem>
        <ChallengeTitle className="title">Sets</ChallengeTitle>
        <ChallengeDesc bold className="desc">
          {sets}
        </ChallengeDesc>
      </ChallengeItem>
      {link_url && (
        <ChallengeItem>
          <ChallengeLink>
            <PointerIcon
              name="link"
              width="24px"
              height="24px"
              onClick={copy}
            />
            <ChallengeUrl>
              <a href={link_url} target="_blank" rel="noopener noreferrer">
                {link_url}
              </a>
            </ChallengeUrl>
          </ChallengeLink>
        </ChallengeItem>
      )}
    </ChallengeWrapper>
  );
};

export default Challenge;