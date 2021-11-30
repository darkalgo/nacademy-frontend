import React from "react";
import { Switch, Route } from "react-router-dom";

import AdminApproveTutor from "../pages/Admin/AdminApproveTutor";
import AdminCreateNotice from "../pages/Admin/AdminCreateNotice";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminNoticeDetails from "../pages/Admin/AdminNoticeDetails";
import AdminPayTutor from "../pages/Admin/AdminPayTutor";
import AdminStudentList from "../pages/Admin/AdminStudentList";
import AdminStudentPackage from "../pages/Admin/AdminStudentPackage";
import AdminTutorDetails from "../pages/Admin/AdminTutorDetails";
import AdminTutorList from "../pages/Admin/AdminTutorList";
import AdminViewNotice from "../pages/Admin/AdminViewNotice";
import AdminViewFeedback from "../pages/Admin/AdminViewFeedback";
import AdminViewTransactions from "../pages/Admin/AdminViewTransactions";
import StudentAllTutors from "../pages/Students/StudentAllTutors";
import StudentBookTutors from "../pages/Students/StudentBookTutors";
import StudentCompletedClasses from "../pages/Students/StudentCompletedClasses";
import StudentDashboard from "../pages/Students/StudentDashboard";
import StudentFeedback from "../pages/Students/StudentFeedback";
import StudentNotices from "../pages/Students/StudentNotices";
import StudentOngoingClasses from "../pages/Students/StudentOngoingClasses";
import StudentOnlineTutors from "../pages/Students/StudentOnlineTutors";
import StudentProfile from "../pages/Students/StudentProfile";
import StudentSubscription from "../pages/Students/StudentSubscription";
import StudentUpcomingClasses from "../pages/Students/StudentUpcomingClasses";
import StudentTutorDetails from "../pages/Students/StudentTutorDetails";
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
        {/* tutor routes */}
        <Route exact path="/tutor/dashboard" component={TutorDashboard} />
        <Route exact path="/tutor/time-slot" component={TutorTimeSlot} />
        <Route exact path="/tutor/upcoming-classes" component={TutorUpcomingClasses} />
        <Route exact path="/tutor/ongoing-classes" component={TutorOngoingClasses} />
        <Route exact path="/tutor/completed-classes" component={TutorCompletedClasses} />
        <Route exact path="/tutor/notices" component={TutorNotices} />
        <Route exact path="/tutor/feedback" component={TutorFeedback} />
        <Route exact path="/tutor/profile" component={TutorProfile} />

        {/* student routes */}
        <Route exact path="/student/dashboard" component={StudentDashboard} />
        <Route exact path="/student/online-tutors" component={StudentOnlineTutors} />
        <Route exact path="/student/book-tutors" component={StudentBookTutors} />
        <Route exact path="/student/upcoming-classes" component={StudentUpcomingClasses} />
        <Route exact path="/student/ongoing-classes" component={StudentOngoingClasses} />
        <Route exact path="/student/completed-classes" component={StudentCompletedClasses} />
        <Route exact path="/student/notices" component={StudentNotices} />
        <Route exact path="/student/feedback" component={StudentFeedback} />
        <Route exact path="/student/profile" component={StudentProfile} />
        <Route exact path="/student/subscription" component={StudentSubscription} />
        <Route exact path="/student/all-tutors" component={StudentAllTutors} />
        <Route exact path="/student/all-tutors/:id" component={StudentTutorDetails} />

        {/* admin routes */}
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/student-list" component={AdminStudentList} />
        <Route exact path="/admin/tutor-list" component={AdminTutorList} />
        <Route exact path="/admin/approve-tutor" component={AdminApproveTutor} />
        <Route exact path="/admin/pay-tutor" component={AdminPayTutor} />
        <Route exact path="/admin/view-transactions" component={AdminViewTransactions} />
        <Route exact path="/admin/create-notice" component={AdminCreateNotice} />
        <Route exact path="/admin/view-notice" component={AdminViewNotice} />
        <Route exact path="/admin/view-feedback" component={AdminViewFeedback} />
        <Route exact path="/admin/student-package/:id" component={AdminStudentPackage} />
        <Route exact path="/admin/approve-tutor/:id" component={AdminTutorDetails} />
        <Route exact path="/admin/view-notice/:id" component={AdminNoticeDetails} />
      </Switch>
    </div>
  );
}

export default AppRoutes;
