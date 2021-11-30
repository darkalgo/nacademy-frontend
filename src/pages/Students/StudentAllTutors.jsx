import React from "react";
import { Card, Typography } from "antd";
import AllAvailableTutorTable from "../../components/Student/AllAvailableTutorTable";

const { Title } = Typography;

const StudentAllTutors = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>All Teachers Information</Title>
      </div>

      <Card className="card">
        <AllAvailableTutorTable />
      </Card>
    </div>
  );
};

export default StudentAllTutors;
