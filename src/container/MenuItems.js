import { MdAlarm, MdAlarmOn, MdCalendarToday, MdDashboard, MdFeedback, MdNotificationsActive, MdPendingActions } from "react-icons/md";

export const TUTOR_MENUS = [
  { name: "Dashboard", to: "/tutor/dashboard", key: "dashboard", icon: <MdDashboard /> },
  { name: "Time Slot", to: "/tutor/time-slot", key: "time-slot", icon: <MdCalendarToday /> },
  { name: "Upcoming Classes", to: "/tutor/upcoming-classes", key: "upcoming-classes", icon: <MdPendingActions /> },
  { name: "Ongoing Classes", to: "/tutor/ongoing-classes", key: "ongoing-classes", icon: <MdAlarm /> },
  { name: "Completed Classes", to: "/tutor/completed-classes", key: "completed-classes", icon: <MdAlarmOn /> },
  { name: "Notices", to: "/tutor/notices", key: "notices", icon: <MdNotificationsActive /> },
  { name: "Feedback", to: "/tutor/feedback", key: "feedback", icon: <MdFeedback /> },
];
