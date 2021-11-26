import { MdAlarm, MdAlarmOn, MdBookmarkAdd, MdCalendarToday, MdDashboard, MdFeedback, MdNotificationsActive, MdPendingActions, MdWifiTethering } from "react-icons/md";
import { HiCollection } from "react-icons/hi";
import { FaInfoCircle, FaPlusCircle, FaRegListAlt, FaRegMoneyBillAlt, FaUserCog, FaUsers, FaUserTie, FaWallet } from "react-icons/fa";

export const TUTOR_MENUS = [
  { name: "Dashboard", to: "/tutor/dashboard", key: "dashboard", icon: <MdDashboard /> },
  { name: "Time Slot", to: "/tutor/time-slot", key: "time-slot", icon: <MdCalendarToday /> },
  { name: "Upcoming Classes", to: "/tutor/upcoming-classes", key: "upcoming-classes", icon: <MdPendingActions /> },
  { name: "Ongoing Classes", to: "/tutor/ongoing-classes", key: "ongoing-classes", icon: <MdAlarm /> },
  { name: "Completed Classes", to: "/tutor/completed-classes", key: "completed-classes", icon: <MdAlarmOn /> },
  { name: "Notices", to: "/tutor/notices", key: "notices", icon: <MdNotificationsActive /> },
  { name: "Feedback", to: "/tutor/feedback", key: "feedback", icon: <MdFeedback /> },
];

export const STUDENT_MENUS = [
  { name: "Dashboard", to: "/student/dashboard", key: "dashboard", icon: <MdDashboard /> },
  { name: "Online Tutors", to: "/student/online-tutors", key: "online-tutors", icon: <MdWifiTethering /> },
  { name: "Book Tutor", to: "/student/book-tutors", key: "book-tutors", icon: <MdBookmarkAdd /> },
  { name: "Upcoming Classes", to: "/student/upcoming-classes", key: "upcoming-classes", icon: <MdPendingActions /> },
  { name: "Ongoing Classes", to: "/student/ongoing-classes", key: "ongoing-classes", icon: <MdAlarm /> },
  { name: "Completed Classes", to: "/student/completed-classes", key: "completed-classes", icon: <MdAlarmOn /> },
  { name: "Notices", to: "/student/notices", key: "notices", icon: <MdNotificationsActive /> },
  { name: "Feedback", to: "/student/feedback", key: "feedback", icon: <MdFeedback /> },
  { name: "Subscription", to: "/student/subscription", key: "subscription", icon: <HiCollection /> },
];

export const ADMIN_MENUS = [
  { name: "Dashboard", to: "/admin/dashboard", key: "dashboard", icon: <MdDashboard /> },
  { name: "Student List", to: "/admin/student-list", key: "student-list", icon: <FaUsers /> },
  { name: "Tutor List", to: "/admin/tutor-list", key: "tutor-list", icon: <FaUserTie /> },
  { name: "Approve Tutor", to: "/admin/approve-tutor", key: "approve-tutor", icon: <FaUserCog /> },
  { name: "Pay to Tutor", to: "/admin/pay-tutor", key: "pay-tutor", icon: <FaRegMoneyBillAlt /> },
  { name: "View Transactions", to: "/admin/view-transactions", key: "view-transactions", icon: <FaWallet /> },
  { name: "Create Notice", to: "/admin/create-notice", key: "create-notice", icon: <FaPlusCircle /> },
  { name: "View Notice", to: "/admin/view-notice", key: "view-notice", icon: <FaRegListAlt /> },
  { name: "View Feedback", to: "/admin/view-feedback", key: "view-feedback", icon: <FaInfoCircle /> },
];
