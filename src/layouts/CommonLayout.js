import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import { AppRootContextProvider } from "../contexts/AppRootContext";

import AdminLayout from "./AdminLayout";
import LoggedInRoute from "../routes/ProtectedRoute/LoggedInRoute";
import Login from "../pages/Login";

function CommonLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppRootContextProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <LoggedInRoute component={AdminLayout} />
      </Switch>
    </AppRootContextProvider>
  );
}

export default CommonLayout;
