import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";

const { Link, Title } = Typography;

const AdminViewFeedback = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>All Feedback</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card className="card">
            <Row gutter={[8, 8]}>
              <Col xs={{ span: 7 }}>
                <Title level={5}>Full Name:</Title>
              </Col>
              <Col xs={{ span: 14 }}>
                <Title level={5}>Kalam Miyaji</Title>
              </Col>
              <Col xs={{ span: 7 }}>
                <Title level={5}>User Type:</Title>
              </Col>
              <Col xs={{ span: 14 }}>
                <Title level={5}>Student</Title>
              </Col>
              <Col xs={{ span: 7 }}>
                <Title level={5}>Phone Number:</Title>
              </Col>
              <Col xs={{ span: 14 }}>
                <Title level={5}>0145778945</Title>
              </Col>
              <Col xs={{ span: 7 }}>
                <Title level={5}>Email:</Title>
              </Col>
              <Col xs={{ span: 14 }}>
                <Title level={5}>kalam@gmail.com</Title>
              </Col>
            </Row>
            <Divider plain>Feedback</Divider>
            <Title level={4}>Lorem ipsum dolor sit amet.</Title>

            <Title level={5}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione nemo pariatur repudiandae, molestiae laudantium ut cupiditate odit commodi sapiente doloribus..</Title>
            <Link href="https://images.indianexpress.com/2018/12/Sunny-759.jpg" target="_blank" rel="noopener noreferrer" style={{ fontSize: "1.1em", color: "#1890ff", textDecoration: "underline" }}>
              https://images.indianexpress.com/2018/12/Sunny-759.jpg
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminViewFeedback;
