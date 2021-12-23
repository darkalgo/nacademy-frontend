import { Tabs, Typography } from "antd";

import TutorFeedbackList from "../../components/Admin/TutorFeedbackList";
import StudentFeedbackList from "../../components/Admin/StudentFeedbackList";

const { TabPane } = Tabs;
const { Title } = Typography;

const AdminViewFeedback = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>All Feedback</Title>
      </div>

      <Tabs centered>
        <TabPane tab="Teacher Feedback" key="1">
          <TutorFeedbackList />
        </TabPane>
        <TabPane tab="Student Feedback" key="2">
          <StudentFeedbackList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminViewFeedback;
