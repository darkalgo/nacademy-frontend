import React from "react";
import { Button, Card, Col, Descriptions, Row, Typography } from "antd";

const { Title } = Typography;
const AdminTutorDetails = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Tutor Information</Title>
      </div>
      <Row>
        <Col xs={{ span: 24 }}>
          <Card className="card">
            <Descriptions bordered>
              <Descriptions.Item label="Full Name">Zhou Maomao</Descriptions.Item>
              <Descriptions.Item label="Email">sldf@gmail.com</Descriptions.Item>
              <Descriptions.Item label="Phone Number">01487556546</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">12 November, 1998</Descriptions.Item>
              <Descriptions.Item label="Gender">Male</Descriptions.Item>
              <Descriptions.Item label="Address">No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</Descriptions.Item>
              <Descriptions.Item label="District">Dhaka</Descriptions.Item>
              <Descriptions.Item label="Occupation">Student</Descriptions.Item>
              <Descriptions.Item label="Institute Name">Daffodil International University</Descriptions.Item>
              <Descriptions.Item label="Department Name">Software Engineering</Descriptions.Item>
              <Descriptions.Item label="Classes Will Teach">Class 1, Class 2</Descriptions.Item>
              <Descriptions.Item label="Subjects Good At">Physics, Math, English</Descriptions.Item>
              <Descriptions.Item label="Favorite Subject">Physics, Math, English</Descriptions.Item>
              <Descriptions.Item label="Joining Reason">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel nisi necessitatibus sapiente quas laudantium voluptas sed dolorem quos quod nostrum!
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      <div className="center mt-2">
        <Button type="primary" style={{ marginRight: "1em" }}>
          Accept Request
        </Button>
        <Button danger>Reject Request</Button>
      </div>
    </div>
  );
};

export default AdminTutorDetails;
