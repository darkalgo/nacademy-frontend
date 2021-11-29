import React from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Link, Title } = Typography;

const TutorOngoingClasses = () => {
  return (
    <>
      <div className="center">
        <Title level={2}>Ongoing Class</Title>
      </div>

      <Card className="card">
        <Row gutter={[8, 8]} justify="center">
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              Class Name:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Title level={5}>Biology class 2nd chapter </Title>
          </Col>
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              Date:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Title level={5}>November 21, 2021 </Title>
          </Col>
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              Start Time:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Title level={5}>10:00 am </Title>
          </Col>
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              End Time:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Title level={5}>11:00 am </Title>
          </Col>
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              Student Name:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Title level={5}>Md. Kamal Ahmed </Title>
          </Col>
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              Subject Name:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Title level={5}>Biology </Title>
          </Col>
          <Col xs={{ span: 8 }}>
            <Title level={5} className="primary-color">
              Class Link:
            </Title>
          </Col>
          <Col xs={{ span: 16 }}>
            <Link
              copyable
              href="https://images.indianexpress.com/2018/12/Sunny-759.jpg"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "1.1em", color: "#1890ff", textDecoration: "underline" }}>
              https://images.indianexpress.com/2018/12/Sunny-759.jpg
            </Link>
          </Col>
          <Col xs={{ span: 6 }} className="mt-2">
            <Button block type="primary" icon={<CheckCircleOutlined />} className="bg white-text" size="large">
              Join Class
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default TutorOngoingClasses;
