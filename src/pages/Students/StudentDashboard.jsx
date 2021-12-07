import React from "react";
import { Col, Row } from "antd";

import AppCard from "../../components/assets/AppCard";
import DashboardCard from "../../components/assets/DashboardCard";
import TeacherListTable from "../../components/Student/TeacherListTable";

const StudentDashboard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <DashboardCard title="Completed Classes" count="50" color="#2196f3" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <DashboardCard title="Total Teacher Consultations" count="6" color="#673ab7" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <DashboardCard title="Upcoming Classes" count="6" color="#f57c00" />
        </Col>
        <Col xs={{ span: 24 }}>
          <AppCard heading="Consulted Teacher List">
            <TeacherListTable />
          </AppCard>
        </Col>
      </Row>
    </div>
  );
};

export default StudentDashboard;
