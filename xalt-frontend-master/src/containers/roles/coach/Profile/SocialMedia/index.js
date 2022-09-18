import { Row } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import Input from 'components/shared/Form/Input';
import { Card, StyledCol, StyledIcon } from 'containers/roles/coach/Profile/styles';
import ProfileActions from 'lib/redux/reducers/profile';
import { Box, makeStyles } from '@material-ui/core';
import ButtonAux from 'components/shared/ButtonAux';

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
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',

    '& button:first-child': {
      marginRight: 10,
    },
  },
  select: {
    height: 42,
    maxWidth: 500,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  link: {
    marginRight: 10,
    display: 'flex',

    '& svg': {
      width: 32,
      height: 32,
    },

    '&.disabled': {
      pointerEvents: 'none',
      cursor: 'default',

      '& svg': {
        color: '#CFCFCF',
      },
    },
  },
}));

const mediaTypes = ['Instagram', 'Linkedin', 'Youtube', 'Facebook'];

const SocialMedia = ({ updateProfileSocialLinks, profile }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialValues, setInitialValues] = useState(
    profile?.coach_profile?.social_network_links || {},
  );

  useEffect(() => {
    if (profile?.coach_profile?.social_network_links) {
      setInitialValues(profile?.coach_profile?.social_network_links);
    }
  }, [JSON.stringify(profile?.coach_profile?.social_network_links || {})]);

  const classes = useStyles();

  const handleSave = () => {
    updateProfileSocialLinks({
      id: profile?.coach_profile?.id,
      socialNetworkLinks: initialValues,
    });
    setIsEditMode(false);
  };

  return (
    <>
      <Row>
        <StyledCol xl={24} md={24} xs={24}>
          <Card padding="2rem 2rem">
            {isEditMode ? (
              <Spacer direction="vertical" fullWidth size={24}>
                <Box className={classes.buttonContainer}>
                  <ButtonAux pinkBtn onClick={handleSave}>
                    Save
                  </ButtonAux>
                  <ButtonAux pinkBrdrBtn onClick={() => setIsEditMode(false)}>
                    Cancel
                  </ButtonAux>
                </Box>
                {mediaTypes.map((mediaType) => (
                  <Flex alignItems="center">
                    <Box className={classes.link}>
                      <StyledIcon fill="none" name={`socialButton${mediaType}`} />
                    </Box>
                    <Input
                      theme="classic"
                      value={initialValues[mediaType.toLowerCase()] || ''}
                      onChange={(e) =>
                        setInitialValues({
                          ...initialValues,
                          [mediaType.toLowerCase()]: e.target.value,
                        })
                      }
                    />
                  </Flex>
                ))}
              </Spacer>
            ) : (
              <Spacer direction="vertical" fullWidth size={24}>
                <Box className={classes.editBtn} onClick={() => setIsEditMode(true)}>
                  <StyledIcon name="edit" clickable />
                </Box>
                <Flex>
                  {mediaTypes.map((mediaType) => (
                    <a
                      href={initialValues[mediaType.toLowerCase()] || '#'}
                      target="_blank"
                      className={`${classes.link} ${
                        initialValues[mediaType.toLowerCase()] ? '' : 'disabled'
                      }`}
                    >
                      <StyledIcon fill="none" name={`socialButton${mediaType}`} />
                    </a>
                  ))}
                </Flex>
              </Spacer>
            )}
          </Card>
        </StyledCol>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateProfileSocialLinks: (data) =>
    dispatch(ProfileActions.updateProfileSocialLinksRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SocialMedia);
