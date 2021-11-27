import React from "react";
import { Col, Row, Typography } from "antd";

import AppCard from "../../components/assets/AppCard";
import OnlineTutorsTable from "../../components/Student/OnlineTutorsTable";

const { Title } = Typography;

const StudentOnlineTutors = () => {
  return (
    <>
      <Row justify="center">
        <Title level={2}>Currently Online</Title>
      </Row>
      <Row justify="center">
        <span style={{ fontSize: "5em", color: "#00c853", fontWeight: "bold" }}>45</span>
      </Row>
      <Row>
        <Col xs={{ span: 24 }}>
          <AppCard heading="Teacher Information">
            <OnlineTutorsTable />
          </AppCard>
        </Col>
      </Row>
    </>
  );
};

export default StudentOnlineTutors;
