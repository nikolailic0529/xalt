import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Row } from 'antd';
import { Box, makeStyles } from '@material-ui/core';
import ProfileActions from 'lib/redux/reducers/profile';
import ButtonAux from 'components/shared/ButtonAux';
import Flex from 'components/shared/Flex';
import { Input } from 'components/shared/Form';
import VimeoEmbed from 'components/shared/VimeoEmbed';
import Text from 'components/shared/Text';
import { Card, StyledCol, StyledIcon } from 'containers/roles/coach/Profile/styles';

const useStyles = makeStyles(() => ({
  editBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: 700,
    textDecoration: 'none',
    color: '#505d68',
    marginBottom: 10,
  },
  list: {
    listStyleType: 'disc',
    marginBlockEnd: '1em',
    marginInlineStart: 0,
    marginInlineEnd: 0,
    paddingInlineStart: 40,

    '& li': {
      listStyle: 'disc',
      fontSize: 16,
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& button:first-child': {
      marginRight: 10,
    },
  },
  videoPlayer: {
    width: '70%',
    margin: 'auto',
  },
  videoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: '40%',
    display: 'flex',
    justifyContent: 'flex-end',

    '& img': {
      width: 250,
    },
  },
  helperText: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Roboto',
    textDecoration: 'none',
    color: '#505d68',
    textTransform: 'none',
    lineHeight: '30px',
    letterSpacing: '0.2px',
  },
  helperTitle: {
    fontWeight: 700,
    marginBottom: 10,
  },
  helperBody: {
    fontWeight: 400,
  },
}));

const WhyTrainWithMeVideo = ({ profile, updateMemberProfileRequest, role }) => {
  const classes = useStyles();
  const [isEditMode, setIsEditMode] = useState(false);
  const [videoUrl, setVideoUrl] = useState(profile?.coach_profile?.why_with_me_video || '');

  const handleSave = () => {
    updateMemberProfileRequest(
      {
        why_with_me_video: videoUrl,
      },
      role,
      profile?.coach_profile?.id,
    );
    setIsEditMode(false);
  };

  return (
    <>
      <Row>
        <StyledCol xl={24} md={12} xs={24}>
          <Card padding="2rem 2rem">
            {isEditMode ? (
              <>
                <Box className={classes.buttonContainer}>
                  <ButtonAux pinkBtn onClick={handleSave}>
                    Save
                  </ButtonAux>
                  <ButtonAux pinkBrdrBtn onClick={() => setIsEditMode(false)}>
                    Cancel
                  </ButtonAux>
                </Box>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Video Link</Box>
                  <Input
                    theme="classic"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </Flex>
              </>
            ) : (
              <>
                <Box className={classes.editBtn} onClick={() => setIsEditMode(true)}>
                  <StyledIcon name="edit" clickable />
                </Box>
                {videoUrl ? (
                  <Box className={classes.videoPlayer}>
                    <VimeoEmbed url={videoUrl} type="player" />
                  </Box>
                ) : (
                  <Box className={classes.videoContainer}>
                    <Box className={classes.imageWrapper}>
                      <img src="../../../../../assets/images/carbon_laptop.svg" alt="" />
                    </Box>
                    <Box className={classes.helperText}>
                      <p className={classes.helperTitle}>Sell yourself with a video</p>
                      <p className={classes.helperBody}>
                        Show potential clients what makes you and your business unique and get them
                        excited about the prospect of training with you. Tell them a bit about your
                        training style, experience, areas of specialization, and personal or
                        business mission.
                      </p>
                    </Box>
                  </Box>
                )}
              </>
            )}
          </Card>
        </StyledCol>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  role: state.profile.role,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WhyTrainWithMeVideo);
