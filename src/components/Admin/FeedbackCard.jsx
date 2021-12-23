import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";

const { Link, Title } = Typography;

const FeedbackCard = ({ feedback }) => {
  return (
    <>
      <Card className="card">
        <Row gutter={[8, 8]}>
          <Col xs={{ span: 7 }}>
            <Title level={5}>Full Name:</Title>
          </Col>
          <Col xs={{ span: 14 }}>
            <Title level={5}>{feedback.name}</Title>
          </Col>
          <Col xs={{ span: 7 }}>
            <Title level={5}>User Type:</Title>
          </Col>
          <Col xs={{ span: 14 }}>
            <Title level={5}>{feedback.role}</Title>
          </Col>
          <Col xs={{ span: 7 }}>
            <Title level={5}>Phone Number:</Title>
          </Col>
          <Col xs={{ span: 14 }}>
            <Title level={5}>{feedback.phone}</Title>
          </Col>
          <Col xs={{ span: 7 }}>
            <Title level={5}>Email:</Title>
          </Col>
          <Col xs={{ span: 14 }}>
            <Title level={5}>{feedback.email}</Title>
          </Col>
        </Row>
        <Divider plain>Feedback</Divider>
        <Title level={4}>{feedback.subject}</Title>

        <Title level={5}>{feedback.description}</Title>
        <Link href={feedback.upload_file} target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.1em", color: "#1890ff", textDecoration: "underline" }}>
          {feedback.upload_file}
        </Link>
      </Card>
    </>
  );
};

export default FeedbackCard;
