import React from "react";
import { Switch, Route } from "react-router-dom";
import DemoPage from "../pages/DemoPage";

function AppRoutes() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={DemoPage} />
      </Switch>
    </div>
  );
}

export default AppRoutes;
