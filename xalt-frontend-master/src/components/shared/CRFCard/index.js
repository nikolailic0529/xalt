import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import GaugeChart from 'react-gauge-chart';
import MemberCRFActions from 'lib/redux/reducers/member_crf';
import { Spin } from 'antd';
import { DashboardHeader } from 'components/shared/MemberProfile';

const crfGeneralData = {
  '20-29': {
    female: [0.43, 0.57],
    male: [0.544, 0.456],
  },
  '30-39': {
    female: [0.4, 0.6],
    male: [0.491, 0.509],
  },
  '40-49': {
    female: [0.384, 0.616],
    male: [0.472, 0.528],
  },
  '50-59': {
    female: [0.344, 0.656],
    male: [0.426, 0.574],
  },
  '60-69': {
    female: [0.311, 0.689],
    male: [0.392, 0.608],
  },
  '70-79': {
    female: [0.283, 0.717],
    male: [0.353, 0.647],
  },
};

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
}));

const CRFCard = (props) => {
  const { crfs, fetching, getMemberCRFRequest, memberId, calculateMemberCRFRequest } = props;
  const [range, setRange] = useState([0.43, 0.57]);
  const [value, setValue] = useState(0.0);

  const classes = useStyles();

  useEffect(() => {
    // getMemberCRFRequest();
    calculateMemberCRFRequest(memberId);
  }, []);

  useEffect(() => {
    if (crfs.age < 30) {
      setRange(
        crfGeneralData['20-29'][crfs.sex]
          ? crfGeneralData['20-29'][crfs.sex]
          : crfGeneralData['20-29'].female,
      );
    } else if (crfs.age < 40) {
      setRange(
        crfGeneralData['30-39'][crfs.sex]
          ? crfGeneralData['30-39'][crfs.sex]
          : crfGeneralData['30-39'].female,
      );
    } else if (crfs.age < 50) {
      setRange(
        crfGeneralData['40-49'][crfs.sex]
          ? crfGeneralData['40-49'][crfs.sex]
          : crfGeneralData['40-49'].female,
      );
    } else if (crfs.age < 60) {
      setRange(
        crfGeneralData['50-59'][crfs.sex]
          ? crfGeneralData['50-59'][crfs.sex]
          : crfGeneralData['50-59'].female,
      );
    } else if (crfs.age < 70) {
      setRange(
        crfGeneralData['60-69'][crfs.sex]
          ? crfGeneralData['60-69'][crfs.sex]
          : crfGeneralData['60-69'].female,
      );
    } else {
      setRange(
        crfGeneralData['70-79'][crfs.sex]
          ? crfGeneralData['70-79'][crfs.sex]
          : crfGeneralData['70-79'].female,
      );
    }
    setValue(parseFloat(crfs.crf) / 100);
  }, [crfs]);

  const calculateCRF = () => {
    calculateMemberCRFRequest();
  };

  return (
    <Box className={classes.root}>
      {fetching ? (
        <Box display="flex" justifyContent="center">
          <Spin size="large" />
        </Box>
      ) : (
        <>
          <DashboardHeader>CRF Estimate</DashboardHeader>
          <Box>
            {/* <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.saveButton}
              startIcon={<CallToActionIcon />}
              onClick={calculateCRF}
            >
              Calculate CRF
            </Button> */}
            <GaugeChart
              id="chart"
              nrOfLevels={100}
              // arcsLength={range}
              arcsLength={[0, 1]}
              colors={['#E6447D']}
              percent={value}
              arcPadding={0.02}
              textColor={value > range[0] ? '#5BE12C' : '#EA4228'}
              formatTextValue={(val) => val}
            />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            {value > range[0] ? (
              <span>
                Your estimate of {(value * 100).toFixed(2)} is <b>Good</b> for your age
              </span>
            ) : (
              <span>
                Your estimate of {(value * 100).toFixed(2)} is <b>Below Average</b> for your age
              </span>
            )}
            <p>Ask your xAlt coach how to improve your score.</p>
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => ({
  crfs: state.member_crfs.member_crfs,
  fetching: state.member_crfs.fetching,
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  getMemberCRFRequest: () => dispatch(MemberCRFActions.getMemberCRFRequest()),
  calculateMemberCRFRequest: (memberId) =>
    dispatch(MemberCRFActions.calculateMemberCRFRequest(memberId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CRFCard);
