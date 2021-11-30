import React from "react";
import { Col, DatePicker, Form, Row, Typography } from "antd";
import moment from "moment";

const { Title } = Typography;

const StudentBookTutors = () => {
  const [form] = Form.useForm();

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="center">
        <Title level={2}>Book A Tutor</Title>
      </div>

      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col xs={{ span: 24 }}>
            <Title level={5}>Please select a date to see available teachers </Title>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="date" label="Select A Date" labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select a date" }]}>
              <DatePicker disabledDate={disabledDate} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default StudentBookTutors;
