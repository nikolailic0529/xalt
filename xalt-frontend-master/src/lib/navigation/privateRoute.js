import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = (props) => {
  const { accessToken, accessClient, accessUID } = props;
  const isLogin = accessToken && accessClient && accessUID;

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    isLogin ? (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Route {...props} />
    ) : (
      <Redirect to="/" />
    )
  );
};

const mapStateToProps = (state) => ({
  accessToken: state.auth.accessToken,
  accessClient: state.auth.accessClient,
  accessUID: state.auth.accessUID,
});

export default connect(mapStateToProps)(PrivateRoute);
