import React from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import ProfileDropdown from 'components/Header/components/ProfileDropdown';

const LogoutDropdown = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      style={{
        position: 'absolute',
        right: isMobile ? 'auto' : 20,
        left: isMobile ? 10 : 'auto',
      }}
    >
      <ProfileDropdown onlyLogout />
    </Box>
  );
};

export default LogoutDropdown;
