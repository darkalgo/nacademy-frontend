import React from "react";
import { Switch, Route } from "react-router-dom";
import TutorCompletedClasses from "../pages/Tutors/TutorCompletedClasses";
import TutorDashboard from "../pages/Tutors/TutorDashboard";
import TutorFeedback from "../pages/Tutors/TutorFeedback";
import TutorOngoingClasses from "../pages/Tutors/TutorOngoingClasses";
import TutorNotices from "../pages/Tutors/TutorNotices";
import TutorProfile from "../pages/Tutors/TutorProfile";
import TutorTimeSlot from "../pages/Tutors/TutorTimeSlot";
import TutorUpcomingClasses from "../pages/Tutors/TutorUpcomingClasses";

function AppRoutes() {
  return (
    <div>
      <Switch>
        <Route exact path="/tutor/dashboard" component={TutorDashboard} />
        <Route exact path="/tutor/time-slot" component={TutorTimeSlot} />
        <Route exact path="/tutor/upcoming-classes" component={TutorUpcomingClasses} />
        <Route exact path="/tutor/ongoing-classes" component={TutorOngoingClasses} />
        <Route exact path="/tutor/completed-classes" component={TutorCompletedClasses} />
        <Route exact path="/tutor/notices" component={TutorNotices} />
        <Route exact path="/tutor/feedback" component={TutorFeedback} />
        <Route exact path="/tutor/profile" component={TutorProfile} />
      </Switch>
    </div>
  );
}

export default AppRoutes;
