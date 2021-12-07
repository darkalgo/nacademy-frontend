import React from "react";
import { Tabs, Typography } from "antd";

import FeedbackCard from "../../components/Admin/FeedbackCard";

const { TabPane } = Tabs;
const { Title } = Typography;

const AdminViewFeedback = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>All Feedback</Title>
      </div>

      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="Teacher Feedback" key="1">
          <FeedbackCard />
        </TabPane>
        <TabPane tab="Student Feedback" key="2">
          <FeedbackCard />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminViewFeedback;
