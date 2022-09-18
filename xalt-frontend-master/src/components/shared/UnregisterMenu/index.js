import React from 'react';
import styled from 'styled-components';

import { Box, makeStyles } from '@material-ui/core';
import Flex from 'components/shared/Flex';
import ButtonAux from 'components/shared/ButtonAux';
import InnerLink from 'components/shared/InnerLink';
import SignupDropdown from 'components/Header/components/SignupDropdown';

const useStyles = makeStyles(() => ({
  unregister: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const UnregisterMenuWrapper = styled(Flex)`
  display: inline-flex;
`;

UnregisterMenuWrapper.defaultProps = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  bg: 'transparent',
  border: 'none',
  m: 0,
  p: 0,
};

const UnregisterMenu = () => {
  const classes = useStyles();

  return (
    <Box className={classes.unregister}>
      <Box className={classes.navigation}>
        {/* <InnerLink to="/login" m={['0 6px 0 0', null, null, null]}>
          <ButtonAux pinkBtn width="116px">
            Sign in
          </ButtonAux>
        </InnerLink> */}
      </Box>
      <UnregisterMenuWrapper>
        <InnerLink to="/login" m={['0 6px 0 0', null, null, null]}>
          <ButtonAux pinkBtn width="116px">
            Sign in
          </ButtonAux>
        </InnerLink>
        <SignupDropdown />
      </UnregisterMenuWrapper>
    </Box>
  );
};

export default UnregisterMenu;
