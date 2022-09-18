/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import Flex from 'components/shared/Flex';
import ProfileActions from 'lib/redux/reducers/profile';
import DomainsActions from 'lib/redux/reducers/domains';
import { useFormik } from 'formik';
import ButtonAux from 'components/shared/ButtonAux';
import { Card } from 'containers/roles/coach/Profile/styles';
import { connect } from 'react-redux';
import Spacer from 'components/shared/Spacer';
import { Grid, makeStyles, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { StyledIcon, StyledCol } from '../styles';

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
  select: {
    height: 42,
    maxWidth: 500,
  },
}));

const Domains = ({ profile, updateDomains, getFitnesDomainsRequest, domains, currentDomains }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState(currentDomains.map(({ id }) => id));
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {},
    onSubmit: () => {
      updateDomains({
        id: profile?.coach_profile?.id,
        ids: selected,
      });

      setIsEditing(false);
    },
  });

  useEffect(() => {
    getFitnesDomainsRequest();
  }, []);

  useEffect(() => {
    setSelected(currentDomains.map(({ id }) => id));
  }, [JSON.stringify(currentDomains)]);

  const handleChange = (e) => {
    setSelected(
      selected.includes(e.target.name)
        ? selected.filter((id) => id !== e.target.name)
        : [...selected, e.target.name],
    );
  };

  return (
    <Row>
      <StyledCol xl={24} md={24} xs={24}>
        <form
          id="update-domains"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
            setIsEditing(false);
          }}
        >
          <Card padding="2rem 2rem">
            {isEditing ? (
              <Spacer direction="vertical" fullWidth size={24}>
                <Box className={classes.buttonContainer}>
                  <ButtonAux pinkBtn type="submit" form="update-domains">
                    Save
                  </ButtonAux>
                  <ButtonAux pinkBrdrBtn onClick={() => setIsEditing(false)}>
                    Cancel
                  </ButtonAux>
                </Box>
                <Grid container spacing={2}>
                  {domains.map((domain, index) => (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ textAlign: 'left' }}
                      key={`domain-check-${index}`}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={!!selected.find((id) => id === domain.id)}
                            onChange={handleChange}
                            name={domain.id}
                          />
                        }
                        label={domain.coach_domain_name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Spacer>
            ) : (
              <Spacer direction="vertical" fullWidth size={24}>
                <Box className={classes.editBtn} onClick={() => setIsEditing(true)}>
                  <StyledIcon name="edit" clickable />
                </Box>
                <Flex flexDirection="column">
                  <ul className={classes.list}>
                    {currentDomains?.map((domain, index) => (
                      <li key={`domain-${index}`}>{domain.coach_domain_name}</li>
                    ))}
                  </ul>
                </Flex>
              </Spacer>
            )}
          </Card>
        </form>
      </StyledCol>
    </Row>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  domains: state.domains.domains,
  currentDomains: state.profile?.coach_profile?.fitnes_domains || [],
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  updateDomains: (data) => dispatch(ProfileActions.updateProfileFitnessDomainsRequest(data)),
  getFitnesDomainsRequest: () => dispatch(DomainsActions.getFitnesDomainsRequest('coach')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
