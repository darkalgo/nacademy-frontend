import {
  ApartmentOutlined,
  AppstoreAddOutlined,
  AppstoreOutlined,
  FieldTimeOutlined,
  FontSizeOutlined,
  PlusOutlined,
  TagOutlined,
  VideoCameraOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export const TUTOR_MENUS = [
  { name: "Dashboard", to: "/tutor/dashboard", key: "dashboard", icon: <AppstoreOutlined /> },
  { name: "Time Slot", to: "/tutor/time-slot", key: "time-slot", icon: <FieldTimeOutlined /> },
  { name: "Upcoming Classes", to: "/tutor/upcoming-classes", key: "upcoming-classes", icon: <AppstoreOutlined /> },
  { name: "Ongoing Classes", to: "/tutor/ongoing-classes", key: "ongoing-classes", icon: <AppstoreOutlined /> },
  { name: "Completed Classes", to: "/tutor/completed-classes", key: "completed-classes", icon: <AppstoreOutlined /> },
  { name: "Notices", to: "/tutor/notices", key: "notices", icon: <AppstoreOutlined /> },
  { name: "Feedback", to: "/tutor/feedback", key: "feedback", icon: <AppstoreOutlined /> },
];
