import React from 'react';
import ButtonAux from 'components/shared/ButtonAux';
import { Box } from '@material-ui/core';

class ChallengeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // do nothing
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box>
          {this.props.errorScreen}
          <ButtonAux
            onClick={() => {
              this.props.reset();
              this.setState({ hasError: false });
            }}
          >
            Reset
          </ButtonAux>
        </Box>
      );
    }
    return this.props.defaultScreen;
  }
}

export default ChallengeErrorBoundary;
