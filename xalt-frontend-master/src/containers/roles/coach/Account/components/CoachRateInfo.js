import React, { useState } from 'react';
import Text from 'components/shared/Text';
import Spacer from 'components/shared/Spacer';
import Flex from 'components/shared/Flex';
import { Card, StyledIcon } from 'containers/roles/coach/Account/styles';
import { Row, Col } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { Box, makeStyles, Slider, Grid } from '@material-ui/core';
import ProfileActions from 'lib/redux/reducers/profile';
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
  slider: {
    display: 'flex',
    alignItems: 'center',

    '& .MuiSlider-root': {
      height: 10,
    },
    '& .MuiSlider-thumb': {
      width: 18,
      height: 18,
      background: 'linear-gradient(113.19deg, #652F79 3.41%, #E6447D 100%)',
    },
    '& .MuiSlider-track': {
      height: 10,
      borderRadius: 20,
    },

    '& .MuiSlider-rail': {
      height: 10,
      borderRadius: 20,
    },
  },
  hourlyValue: {
    background: '#FEF9FB',
    border: '1px solid #E6447D',
    boxSizing: 'border-box',
    boxShadow: '0px 1px 2px rgba(51, 51, 51, 0.06)',
    borderRadius: 10,
    padding: '14px 32px',
    fontSize: 18,
    color: '#E6447D',
    marginTop: 20,
    width: 160,
    textAlign: 'center',
    margin: 'auto',
  },
}));

const CoachRateInfo = ({ profile, updateMemberProfileRequest, role }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(profile.coach_profile?.rate || 85);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSave = () => {
    updateMemberProfileRequest(
      {
        rate: value,
      },
      role,
      profile?.coach_profile?.id,
    );
    setIsEditMode(false);
  };

  return (
    <Row>
      <Col xl={16} md={18} xs={24}>
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
              <Flex flexDirection="column">
                <Grid container spacing={2} alignItems="center">
                  <Grid item>$50/hour</Grid>
                  <Grid item xs className={classes.slider}>
                    <Slider
                      value={value}
                      min={50}
                      max={400}
                      onChange={handleChange}
                      color="secondary"
                      aria-labelledby="continuous-slider"
                    />
                  </Grid>
                  <Grid item>$400/hour</Grid>
                </Grid>
                <Box className={classes.hourlyValue}>{`$${value}/hour`}</Box>
              </Flex>
            </Spacer>
          ) : (
            <Spacer direction="vertical" fullWidth size={24}>
              <Box className={classes.editBtn} onClick={() => setIsEditMode(true)}>
                <StyledIcon name="edit" clickable />
              </Box>
              <Flex flexDirection="column">
                <Box className={classes.label}>
                  Price per hour: {profile.coach_profile?.rate || 85}
                </Box>
                <Text>Clientelle: own clients, eligable for corporate clients</Text>
              </Flex>
            </Spacer>
          )}
        </Card>
      </Col>
    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(CoachRateInfo);
