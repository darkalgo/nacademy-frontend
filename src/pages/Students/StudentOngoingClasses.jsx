import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Rate, Row, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import AppCard from "../../components/assets/AppCard";

const { Link, Title } = Typography;
const { TextArea } = Input;

const StudentOngoingClasses = () => {
  const { form } = Form.useForm();

  const [reviewMode, setReviewMode] = useState("");
  const [textColor, setTextColor] = useState("");

  const onRatingChange = (value) => {
    console.log(value);
    if (value <= 2 && value >= 1) {
      setReviewMode("Bad");
      setTextColor("#f44336");
    } else if (value === 3) {
      setReviewMode("Average");
      setTextColor("#ff9800");
    } else if (value === 4) {
      setReviewMode("Good");
      setTextColor("#03a9f4");
    } else if (value === 5) {
      setReviewMode("Excellent");
      setTextColor("#00c853");
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Row justify="center">
        <Title level={2}>Ongoing Class</Title>
      </Row>

      <Card className="card" className="mb-2">
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
              Teacher Name:
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

      <AppCard heading="Give Rating">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }}>
              <Form.Item name="rating">
                <Rate onChange={onRatingChange} />
              </Form.Item>

              <Title level={5} style={{ color: `${textColor}` }}>
                {reviewMode}
              </Title>
            </Col>
            <Col xs={{ span: 24 }}>
              <Form.Item name="comment" label="Comment" labelCol={{ span: 24 }}>
                <TextArea />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }}>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="bg white-text">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </AppCard>
    </>
  );
};

export default StudentOngoingClasses;
