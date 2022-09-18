import React from 'react';

export default ({ condition, children }) => (
  <>{condition ? children : null}</>
);
