/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { Row, Space } from 'antd';
import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Text from 'components/shared/Text';
import CancelIcon from '@material-ui/icons/Cancel';
import Flex from 'components/shared/Flex';
import Spacer from 'components/shared/Spacer';
import { Input, TextArea } from 'components/shared/Form';
import ButtonAux from 'components/shared/ButtonAux';
import ProfileActions from 'lib/redux/reducers/profile';
import {
  Card,
  ProfileLogoWrapper,
  ProfileLogoButtonWrapper,
  ProfileLogo,
  StyledIcon,
  StyledCol,
} from 'containers/roles/coach/Profile/styles';
import { Box, MenuItem, Select, makeStyles, FormControlLabel, Checkbox } from '@material-ui/core';
import moment from 'moment-timezone';
import modalsTypes from 'lib/redux/types/modals';
import ChangePasswordModal from './components/ChangePasswordModal';
import ChangeNameModal from './components/ChangeNameModal';
import ChangeAvatarModal from './components/ChangeAvatarModal';
import CoachStylesForm from './components/CoachStylesForm';
import ChangeLovesForm from './components/ChangeLovesForm';

const { TOGGLE_CHANGE_PASSWORD_MODAL } = modalsTypes;

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
  alert: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      fontSize: 36,
    },

    '& p': {
      fontSize: 12,
      marginBottom: 0,
      marginLeft: 10,
      color: '#000',
      fontWeight: 400,
    },
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
  select: {
    height: 42,
    maxWidth: 500,
  },
  capitalize: {
    textTransform: 'capitalize',
  },
}));

const COACH_STYLES = {
  'high-energy': 'High energy',
  'calm-cool': 'Calm and cool',
  'always-positive': 'Always positive',
  'drill-sergeant': 'Drill sergeant',
  'stricly-business': 'Stricly business',
  'sense-of-humour': 'Has a sense of humour',
  analyitical: 'Analyitical & results driven',
  'extra-mile': 'Goes the extra mile every time',
  flexible: 'I’m flexible to match clients needs',
};

const ProfileData = ({ profile, updateMemberProfileRequest, role, updateProfileData }) => {
  const [isChangeNameModalVisible, setIsChangeNameModalVisible] = useState();
  const [isChangeAvatarModalVisible, setIsChangeAvatarModalVisible] = useState();
  const [isEditMode, setIsEditMode] = useState(false);
  const [email, setEmail] = useState(profile?.email);
  const [sex, setSex] = useState(profile.coach_profile?.gender || 'male');
  const [timezone, setTimezone] = useState(profile.coach_profile?.timezone);
  const [trainingSince, setTrainingSince] = useState(profile.coach_profile?.training_since);
  const [about, setAbout] = useState(profile.coach_profile?.about);
  const [featured, setFeatured] = useState(profile.coach_profile?.featured);
  const [loves, setLoves] = useState(
    !profile.coach_profile?.loves
      ? []
      : Array.isArray(profile.coach_profile?.loves)
      ? profile.coach_profile?.loves
      : Object.keys(profile.coach_profile?.loves),
  );
  const [coachStyles, setCoachStyles] = useState(
    !profile.coach_profile?.coach_styles
      ? []
      : Array.isArray(profile.coach_profile?.coach_styles)
      ? profile.coach_profile?.coach_styles
      : Object.keys(profile.coach_profile?.coach_styles),
  );

  const currentLoves = !profile.coach_profile?.loves
    ? []
    : Array.isArray(profile.coach_profile?.loves)
    ? profile.coach_profile?.loves
    : Object.keys(profile.coach_profile?.loves);

  const currentCoachStyles = !profile.coach_profile?.coach_styles
    ? []
    : Array.isArray(profile.coach_profile?.coach_styles)
    ? profile.coach_profile?.coach_styles
    : Object.keys(profile.coach_profile?.coach_styles);

  const classes = useStyles();

  const dispatch = useDispatch();

  const handleSexChange = (e) => {
    setSex(e.target.value);
  };

  const handleTimezoneChange = (e) => {
    setTimezone(e.target.value);
  };

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
  };

  const handleCoachStylesChange = (e) => {
    const newCoachStyles = coachStyles.includes(e.target.name)
      ? coachStyles.filter((style) => style !== e.target.name)
      : [...coachStyles, e.target.name];
    setCoachStyles(newCoachStyles);
  };

  const handleTrainingSinceChange = (e) => {
    setTrainingSince(e.target.value);
  };

  const years = Array(100)
    .fill(0)
    .map((val, index) => moment().subtract(index, 'years').format('YYYY'));

  const handleSave = () => {
    if (profile?.email !== email) {
      updateProfileData({ email });
    }
    updateMemberProfileRequest(
      {
        timezone,
        gender: sex,
        training_since: trainingSince,
        about,
        loves,
        featured,
        coach_styles: coachStyles,
      },
      role,
      profile?.coach_profile?.id,
    );
    setIsEditMode(false);
  };

  return (
    <>
      <ChangeNameModal
        visible={isChangeNameModalVisible}
        setVisible={setIsChangeNameModalVisible}
      />
      <ChangeAvatarModal
        visible={isChangeAvatarModalVisible}
        setVisible={setIsChangeAvatarModalVisible}
      />
      <ChangePasswordModal />

      <Row>
        <StyledCol xl={24} md={24} xs={24}>
          <Flex justifyContent="center">
            <ProfileLogoWrapper>
              <ProfileLogoButtonWrapper>
                <StyledIcon
                  name="profileCamera"
                  clickable
                  onClick={() => setIsChangeAvatarModalVisible(true)}
                />
              </ProfileLogoButtonWrapper>
              <ProfileLogo
                src={profile?.avatar?.url || 'assets/icons/empty-user-profile.svg'}
                preview={false}
              />
            </ProfileLogoWrapper>
          </Flex>
          <Flex justifyContent="center" alignItems="flex-end">
            <Space direction="horizontal">
              <Text bold>{profile.name}</Text>
              <StyledIcon clickable name="edit" onClick={() => setIsChangeNameModalVisible(true)} />
            </Space>
          </Flex>
        </StyledCol>
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
                <Flex flexDirection="column">
                  <Box className={classes.label}>Publish Profile</Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        name="featured"
                      />
                    }
                    label="Feature My Profile"
                  />
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Email Address</Box>
                  <Input theme="classic" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Password</Box>
                  <Input
                    theme="classic"
                    placeholder="********"
                    disabled
                    suffix={
                      <StyledIcon
                        name="edit"
                        clickable
                        onClick={() => dispatch({ type: TOGGLE_CHANGE_PASSWORD_MODAL })}
                      />
                    }
                  />
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Sex</Box>
                  <Select
                    className={classes.select}
                    value={sex}
                    onChange={handleSexChange}
                    variant="outlined"
                  >
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Timezone</Box>
                  <Select
                    className={classes.select}
                    value={timezone}
                    onChange={handleTimezoneChange}
                    variant="outlined"
                  >
                    {moment.tz.names().map((tz, index) => (
                      <MenuItem value={tz} key={`tz-${index}`}>
                        {tz}
                      </MenuItem>
                    ))}
                  </Select>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>About Yourself</Box>
                  <TextArea
                    id="about"
                    name="about"
                    placeholder="About Yourself"
                    theme="classic"
                    value={about}
                    rows={5}
                    onChange={handleAboutChange}
                  />
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Coaching Styles</Box>
                  <CoachStylesForm
                    coachStyles={coachStyles}
                    handleChange={handleCoachStylesChange}
                  />
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Loves</Box>
                  <ChangeLovesForm loves={loves} setLoves={setLoves} />
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Training Since</Box>
                  <Select
                    className={classes.select}
                    value={trainingSince}
                    onChange={handleTrainingSinceChange}
                    variant="outlined"
                  >
                    {years.map((year, index) => (
                      <MenuItem value={year} key={`year-${index}`}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </Flex>
              </Spacer>
            ) : (
              <Spacer direction="vertical" fullWidth size={24}>
                <Box className={classes.editBtn} onClick={() => setIsEditMode(true)}>
                  <StyledIcon name="edit" clickable />
                </Box>
                {!profile.coach_profile?.featured && (
                  <Flex flexDirection="column">
                    <Box className={`${classes.label} ${classes.alert}`}>
                      <CancelIcon />
                      <p>
                        Your profile is not live on www.xAlt.fit. <br />
                        Edit your profile to showcase yourself & allow potential clients to connect
                        with you.
                      </p>
                    </Box>
                  </Flex>
                )}
                <Flex flexDirection="column">
                  <Box className={classes.label}>Email Address</Box>
                  <Text>{profile.email}</Text>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Sex</Box>
                  <Text className={classes.capitalize}>
                    {profile.coach_profile?.gender === 'female'
                      ? 'F'
                      : profile.coach_profile?.gender === 'male'
                      ? 'M'
                      : 'Other'}
                  </Text>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Timezone</Box>
                  <Text>{profile.coach_profile?.timezone}</Text>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>About Yourself</Box>
                  <Text>{profile.coach_profile?.about}</Text>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Coaching Styles</Box>
                  <ul className={classes.list}>
                    {currentCoachStyles?.map((coachStyle, index) => (
                      <li key={`coach-style-${index}`}>{COACH_STYLES[coachStyle]}</li>
                    ))}
                  </ul>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Loves</Box>
                  <ul className={classes.list}>
                    {currentLoves?.map((love, index) => (
                      <li key={`love-${index}`}>{love}</li>
                    ))}
                  </ul>
                </Flex>
                <Flex flexDirection="column">
                  <Box className={classes.label}>Training Since</Box>
                  <Text>{profile.coach_profile?.training_since}</Text>
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
  role: state.profile.role,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateMemberProfileRequest: (onboardingProfile, role, id) =>
    dispatch(ProfileActions.updateMemberProfileRequest(onboardingProfile, role, id)),
  updateProfileData: (data) => dispatch(ProfileActions.updateProfileDataRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileData);
