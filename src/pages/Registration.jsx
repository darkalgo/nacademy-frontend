import React from "react";
import { Button, Col, Form, Row, Typography } from "antd";

const { Title } = Typography;

const Registration = () => {
  const [form] = Form.useForm();

  //   functions
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div style={{ padding: "20px 20px" }}>
      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Title level={3}>Create account to get started</Title>
        </Row>
      </Form>
    </div>
  );
};

export default Registration;
