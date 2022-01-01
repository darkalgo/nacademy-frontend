import { Tabs, Typography } from "antd";

import IndividualBook from "../../components/Student/IndividualBook";
import MonthlyBook from "../../components/Student/MonthlyBook";

const { Title } = Typography;
const { TabPane } = Tabs;

const StudentBookTutors = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Book A Tutor</Title>
      </div>

      <Tabs centered>
        <TabPane tab="For Single Class" key="1">
          <IndividualBook />
        </TabPane>
        <TabPane tab="For Monthly Class" key="2">
          <MonthlyBook />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default StudentBookTutors;
