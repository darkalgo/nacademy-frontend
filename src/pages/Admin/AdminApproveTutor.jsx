import { Tabs, Typography } from "antd";

import PendingTeacherList from "../../components/Admin/PendingTeacherList";
import RejectedTeacherList from "../../components/Admin/RejectedTeacherList";

const { Title } = Typography;
const { TabPane } = Tabs;

const AdminApproveTutor = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Approve Tutor</Title>
      </div>

      <Tabs centered>
        <TabPane tab="Pending Teacher" key="1">
          <PendingTeacherList />
        </TabPane>
        <TabPane tab="Rejected Teacher" key="2">
          <RejectedTeacherList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminApproveTutor;
