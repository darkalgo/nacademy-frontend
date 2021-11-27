import React from "react";
import { Route, Redirect } from "react-router-dom";

const LoggedInRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (sessionStorage && sessionStorage.getItem("accessToken")) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default LoggedInRoute;
