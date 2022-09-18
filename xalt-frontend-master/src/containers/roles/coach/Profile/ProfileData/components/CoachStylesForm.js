import React from 'react';
import { Grid, FormControlLabel, Checkbox } from '@material-ui/core';

const CoachStylesForm = (props) => {
  const { coachStyles, handleChange } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('high-energy')}
              onChange={handleChange}
              name="high-energy"
            />
          }
          label="High energy"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('calm-cool')}
              onChange={handleChange}
              name="calm-cool"
            />
          }
          label="Calm and cool"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('always-positive')}
              onChange={handleChange}
              name="always-positive"
            />
          }
          label="Always positive"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('drill-sergeant')}
              onChange={handleChange}
              name="drill-sergeant"
            />
          }
          label="Drill sergeant"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('stricly-business')}
              onChange={handleChange}
              name="stricly-business"
            />
          }
          label="Stricly business"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('sense-of-humour')}
              onChange={handleChange}
              name="sense-of-humour"
            />
          }
          label="Has a sense of humour"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('analyitical')}
              onChange={handleChange}
              name="analyitical"
            />
          }
          label="Analyitical & results driven"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('extra-mile')}
              onChange={handleChange}
              name="extra-mile"
            />
          }
          label="Goes the extra mile every time"
        />
      </Grid>
      <Grid item xs={12} sm={12} md={6} style={{ textAlign: 'left' }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={coachStyles.includes('flexible')}
              onChange={handleChange}
              name="flexible"
            />
          }
          label="I’m flexible to match clients needs"
        />
      </Grid>
    </Grid>
  );
};

export default CoachStylesForm;
