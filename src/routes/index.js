import React from "react";
import { Switch, Route } from "react-router-dom";
import TutorDashboard from "../pages/Tutors/TutorDashboard";

function AppRoutes() {
  return (
    <div>
      <Switch>
        <Route exact path="/tutor/dashboard" component={TutorDashboard} />
      </Switch>
    </div>
  );
}

export default AppRoutes;
