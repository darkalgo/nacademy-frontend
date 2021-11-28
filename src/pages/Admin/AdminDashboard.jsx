import React from "react";
import { Col, Row } from "antd";

import AppCard from "../../components/assets/AppCard";
import DashboardCard from "../../components/assets/DashboardCard";
import StudentTransactionHistoryTable from "../../components/Admin/StudentTransactionHistoryTable";

const AdminDashboard = () => {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <DashboardCard title="Registered Tutors" count="55" color="#66bb6a" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <DashboardCard title="Total Students" count="155" color="#7e57c2" />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <DashboardCard title="Total Earned" count="58900" color="#2196f3" />
        </Col>
        <Col xs={{ span: 24 }}>
          <AppCard heading="Student Transaction History">
            <StudentTransactionHistoryTable />
          </AppCard>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
