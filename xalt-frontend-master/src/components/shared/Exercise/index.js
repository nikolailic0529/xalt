import React from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'components';
import When from 'components/shared/When';
import VimeoEmbed from 'components/shared/VimeoEmbed';
import SvgIcon from 'components/shared/SvgIcon';
import { flexbox, layout } from 'styled-system';
import takeValue from 'utils/takeValue';
import { DarkResult } from 'containers/roles/coach/Exercises/View/styles';
import Text from 'components/shared/Text';
import ButtonAux from 'components/shared/ButtonAux';

const ExerciseWrapper = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ExerciseItem = styled.div`
  ${flexbox};
  ${layout};
  padding: 8px 0;
  width: 100%;
`;

ExerciseItem.defaultProps = {
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignItems: 'center',
};

const ExerciseTitle = styled.span`
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

const ExerciseDesc = styled.span`
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

const ExerciseLink = styled.div`
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

const ExerciseUrl = styled.span`
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

const Exercise = (props) => {
  const {
    exercise: {
      exercise,
      repetitions,
      repetitions_duration,
      sets,
      link_url,
      id,
    },
    deleteProgramExerciseRequest,
    program_id,
    type,
    role,
  } = props;

  const copy = () => {
    link_url && navigator.clipboard.writeText(link_url);
  };

  const deleteExercise = () => {
    deleteProgramExerciseRequest(type, program_id, id);
  };

  return (
    <ExerciseWrapper>
      {role === 'coach' && (
        <ExerciseItem justifyContent="flex-end">
          <PointerIcon
            onClick={deleteExercise}
            name="trash"
            width="24px"
            height="24px"
          />
        </ExerciseItem>
      )}
      {exercise?.vimeo_video_info && (
        <VideoWrapper>
          <When condition={exercise?.vimeo_video_info?.uri}>
            <VimeoEmbed url={exercise?.vimeo_video_info?.uri} type="player" />
          </When>
          <When condition={!exercise?.vimeo_video_info?.uri}>
            <DarkResult
              status="error"
              title={(
                <Text white bigSize>
                  Video cannot be played
                </Text>
              )}
              subTitle={
                exercise?.video_url ? (
                  <Text white>
                    You can proceed to video by link
                    {' '}
                    <a
                      href={`https://${exercise?.video_url}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <u>{exercise?.video_url}</u>
                    </a>
                  </Text>
                ) : (
                  ''
                )
              }
              extra={[
                exercise?.video_url ? (
                  <a
                    href={exercise?.video_url}
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
      {exercise?.categorie && (
        <ExerciseItem>
          <ExerciseTitle>Category</ExerciseTitle>
          <ExerciseDesc>
            {takeValue('CATEGORIES', exercise?.categorie)}
          </ExerciseDesc>
        </ExerciseItem>
      )}
      {exercise?.equipment && (
        <ExerciseItem>
          <ExerciseTitle>Equipment</ExerciseTitle>
          <ExerciseDesc>
            {takeValue('EQUIPMENTS', exercise?.equipment)}
          </ExerciseDesc>
        </ExerciseItem>
      )}
      {exercise?.difficulty && (
        <ExerciseItem>
          <ExerciseTitle>Difficulty</ExerciseTitle>
          <ExerciseDesc>
            {takeValue('DIFFICULTIES', exercise?.difficulty)}
          </ExerciseDesc>
        </ExerciseItem>
      )}
      {exercise?.pose && (
        <ExerciseItem>
          <ExerciseTitle>Pose/Posture</ExerciseTitle>
          <ExerciseDesc>{exercise?.pose}</ExerciseDesc>
        </ExerciseItem>
      )}
      {exercise?.set_up && (
        <ExerciseItem>
          <ExerciseTitle>Set up</ExerciseTitle>
          <ExerciseDesc>{exercise?.set_up}</ExerciseDesc>
        </ExerciseItem>
      )}
      <ExerciseItem>
        <ExerciseTitle className="title">Repetition</ExerciseTitle>
        <ExerciseDesc bold className="desc">
          {repetitions}
        </ExerciseDesc>
      </ExerciseItem>
      <ExerciseItem>
        <ExerciseTitle className="title">Duration</ExerciseTitle>
        <ExerciseDesc bold className="desc">
          {repetitions_duration}
        </ExerciseDesc>
      </ExerciseItem>
      <ExerciseItem>
        <ExerciseTitle className="title">Sets</ExerciseTitle>
        <ExerciseDesc bold className="desc">
          {sets}
        </ExerciseDesc>
      </ExerciseItem>
      {link_url && (
        <ExerciseItem>
          <ExerciseLink>
            <PointerIcon
              name="link"
              width="24px"
              height="24px"
              onClick={copy}
            />
            <ExerciseUrl>
              <a href={link_url} target="_blank" rel="noopener noreferrer">
                {link_url}
              </a>
            </ExerciseUrl>
          </ExerciseLink>
        </ExerciseItem>
      )}
    </ExerciseWrapper>
  );
};

export default Exercise;
