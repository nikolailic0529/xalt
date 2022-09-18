import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Tooltip } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MemberRecommendationActions from 'lib/redux/reducers/member_recommendations';
import { Spin } from 'antd';
import { DashboardHeader } from 'components/shared/MemberProfile';
import RingProgressChart from 'components/shared/RingProgressChart';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: 270,
    boxShadow: '0px 2px 8px rgba(51, 51, 51, 0.12)',
    borderRadius: 20,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
  },
  saveButton: {},
  chart: {
    height: 200,
  },
  recommendationTitle: {
    fontSize: 16,
  },
  askToCoach: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  recommendationWrapper: {
    maxWidth: 700,
  },
  recommendation: {
    marginBottom: 10,
    fontSize: 13,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    '& svg': {
      marginRight: 10,
      color: '#e6447d',
    },

    '& span': {
      marginLeft: 5,
    },
  },
  recommendationSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noRecommendation: {
    fontSize: 13,
    fontWeight: 500,
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    color: 'rgb(91, 225, 44)',

    '& svg': {
      marginRight: 10,
    },
  },
}));

const recommendationText = {
  balance: {
    text: 'Balance is a fundamental aspect of any movement you perform.',
    helpText:
      'Improving your balance improves the efficiency of your daily movements, your posture, ability to recover, and reduces your risk of  injuries. Good balance and leg strength prevents falls, which has a significant mortality rate. The more active you are now, the better your longevity!',
  },
  joint_health: {
    text: 'Healthy joints are essential for you to maintain mobility, and provides long-term stability, reducing wear-and-tear with age.',
    helpText:
      'Being mobile gives you the freedom to live without restriction. Improving joint health and mobility allows you to move more efficiently and reduces the risk of injury and pain. Exercise stimulates the production of collagen which is an important component of cartilage.',
  },
  endurance: {
    text: 'Endurance decreases risk of injury, morbidity, mortality, and keeps your body weight healthy.',
    helpText:
      'Improving your endurance helps keep your heart and lungs healthy, which increases your overall fitness levels and keeps you working towards longevity.',
  },
  muscle: {
    text: 'Your muscle health plays an important role in longevity. It contributes to strength, energy and ability to live a healthier, more active life.',
    helpText:
      'Increased muscle mass reduces body fat, improves your immune system and reduces stress and disease onset.',
  },
  sleep: {
    text: 'Adequate sleep is directly connected with physical and mental health, both necessary components of longevity.',
    helpText: 'Sleep enhances our cognitive and physical health and performance.',
  },
  diet: {
    text: 'The foods we consume dictate our ability to optimize muscle development and fat loss.',
    helpText: 'Proper nutrition is necessary to keep you feeling better for longer.',
  },
};

const fullRecommendation = {};

const RecommendationCard = (props) => {
  const { memberRecommendations, fetching, getMemberRecommendationRequest, memberId } = props;
  const [recommends, setRecommends] = useState({});
  const classes = useStyles();

  useEffect(() => {
    getMemberRecommendationRequest(memberId);
  }, []);

  useEffect(() => {
    const recommendations = [];
    Object.keys(memberRecommendations).forEach((key) => {
      let displayKey = 'Balance: ';
      if (key === 'joint_health') {
        displayKey = 'Joint Health & Mobility: ';
      } else if (key === 'endurance') {
        displayKey = 'Endurance: ';
      } else if (key === 'muscle') {
        displayKey = 'Muscle Health: ';
      } else if (key === 'sleep') {
        displayKey = 'Sleep: ';
      } else if (key === 'diet') {
        displayKey = 'Diet and Nutrition: ';
      }
      if (memberRecommendations[key] < 50) {
        recommendations[displayKey] = recommendationText[key];
      }
      fullRecommendation[displayKey] = recommendationText[key];
    });

    setRecommends(recommendations);
  }, [memberRecommendations]);

  return (
    <Box className={classes.root}>
      {fetching ? (
        <Box display="flex" justifyContent="center">
          <Spin size="large" />
        </Box>
      ) : (
        <>
          <DashboardHeader>Recommendations</DashboardHeader>
          <Box mt={2} mb={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={12} md={6} lg={5}>
                <Grid container>
                  <Grid item xs={12} sm={4} md={6} lg={6} xl={4}>
                    <Box className={classes.chart}>
                      <RingProgressChart title="Balance" value={memberRecommendations.balance} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={6} lg={6} xl={4}>
                    <Box className={classes.chart}>
                      <RingProgressChart
                        title="Joint Health & Mobility"
                        value={memberRecommendations.joint_health}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={6} lg={6} xl={4}>
                    <Box className={classes.chart}>
                      <RingProgressChart
                        title="Endurance"
                        value={memberRecommendations.endurance}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={6} lg={6} xl={4}>
                    <Box className={classes.chart}>
                      <RingProgressChart
                        title="Muscle Health"
                        value={memberRecommendations.muscle}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={6} lg={6} xl={4}>
                    <Box className={classes.chart}>
                      <RingProgressChart title="Sleep" value={memberRecommendations.sleep} />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4} md={6} lg={6} xl={4}>
                    <Box className={classes.chart}>
                      <RingProgressChart
                        title="Diet and Nutrition"
                        value={memberRecommendations.diet}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={7} className={classes.recommendationSection}>
                <Box className={classes.recommendationWrapper}>
                  <Box>
                    <h4 className={classes.recommendationTitle}>
                      Based on your responses and our systems technology created by our team of
                      experts, improving the following aspects will improve your health, fitness,
                      and longevity:
                    </h4>
                    <Box>
                      {recommends && Object.keys(recommends).length ? (
                        <>
                          {Object.keys(recommends).map((key) => (
                            <Box className={classes.recommendation}>
                              <Tooltip title={recommends[key].helpText}>
                                <InfoIcon />
                              </Tooltip>
                              <Box>
                                <b>{key}</b>
                                <span>{recommends[key].text}</span>
                              </Box>
                            </Box>
                          ))}
                          <h5 className={classes.askToCoach}>
                            Ask your coach how to improve your scores!
                          </h5>
                        </>
                      ) : (
                        Object.keys(fullRecommendation).map((key) => (
                          <Box className={classes.recommendation}>
                            <Tooltip title={fullRecommendation[key].helpText}>
                              <InfoIcon />
                            </Tooltip>
                            <Box>
                              <b>{key}</b>
                              <span>{fullRecommendation[key].text}</span>
                            </Box>
                          </Box>
                        ))
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  memberRecommendations: state.member_recommendations.member_recommendations,
  fetching: state.member_recommendations.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMemberRecommendationRequest: (memberId) =>
    dispatch(MemberRecommendationActions.getMemberRecommendationRequest(memberId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendationCard);
