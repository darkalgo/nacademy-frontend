import React from "react";
import { Col, Row, Typography } from "antd";

import UpcomingClassCard from "../../components/Student/UpcomingClassCard";

const { Title } = Typography;

const StudentUpcomingClasses = () => {
  return (
    <div>
      <Row justify="center">
        <Title level={2}>List Of Upcoming Classes</Title>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <UpcomingClassCard />
        </Col>
      </Row>
    </div>
  );
};

export default StudentUpcomingClasses;
