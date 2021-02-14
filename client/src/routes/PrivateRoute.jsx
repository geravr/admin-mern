import React from "react";

import { isLogin } from "@utils/auth";

// Router
import { Route, Redirect } from "react-router-dom";

// Components
import Layout from "@layout/Layout";

// PropTypes
import PropTypes from "prop-types";

const PrivateRoute = (props) => {
  const { component: Component, path } = props;

  return (
    <>
      {isLogin() ? (
        <Route path={path}>
          <Layout>
            <Component />
          </Layout>
        </Route>
      ) : (
          <Redirect to="/login" />
        )}
    </>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  Component: PropTypes.func,
  path: PropTypes.string
}

export default PrivateRoute;
