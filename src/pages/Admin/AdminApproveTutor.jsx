import React from "react";
import { Col, Row, Typography } from "antd";

import ApproveTutorCard from "../../components/Admin/ApproveTutorCard";

const { Title } = Typography;

const AdminApproveTutor = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Approve Tutor</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <ApproveTutorCard />
        </Col>
      </Row>
    </div>
  );
};

export default AdminApproveTutor;
