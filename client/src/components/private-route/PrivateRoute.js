import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function PrivateRoute({component: Component, auth, ...rest}) { // auth is passed as a prop to Private Route
  // Render Component if authenticated
  // Else, render Login
  return (
    <Route {...rest} render={(props) => auth.isAuthenticated ? (<Component {...props} />) : (<Redirect to="/users/login"/>)} />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
