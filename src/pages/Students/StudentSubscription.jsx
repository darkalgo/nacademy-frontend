import React from "react";
import { Card, Tabs } from "antd";
import { BsFillCalendarRangeFill, BsTagsFill } from "react-icons/bs";

import MySubscriptionInfo from "../../components/Student/MySubscriptionInfo";
import AllSubscription from "../../components/Student/AllSubscription";

const { TabPane } = Tabs;

const StudentSubscription = () => {
  return (
    <Card className="card">
      <Tabs defaultActiveKey="1" centered>
        <TabPane
          tab={
            <span>
              <BsTagsFill /> &nbsp; My Subscription Information
            </span>
          }
          key="1">
          <MySubscriptionInfo />
        </TabPane>
        <TabPane
          tab={
            <span>
              <BsFillCalendarRangeFill /> &nbsp; Get New Subscription
            </span>
          }
          key="2">
          <AllSubscription />
        </TabPane>
      </Tabs>
    </Card>
  );
};

export default StudentSubscription;
