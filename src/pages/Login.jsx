import React, { useState } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";

import "../styles/PageStyles/Login.less";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    sessionStorage.setItem("accessToken", "lsdkfjlsdkf");
    history.push("/tutor/dashboard");
    window.location.reload(false);
  };

  return (
    <div className="login-layout">
      <div style={{ padding: "20px 20px" }}>
        <Form form={form} name="normal_login" className="login-form" onFinish={onFinish}>
          <Row justify="center">
            <Title level={3}>Good to see you again!</Title>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Form.Item
                name="email"
                label="Email"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}>
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Form.Item
                name="password"
                label="Password"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}>
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={{ span: 24 }} lg={{ span: 8 }}>
              <Form.Item>
                <Button block type="primary" disabled={loading} htmlType="submit" className="login-form-button">
                  {loading && <LoadingOutlined />} Log In
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Form.Item>
              <Link className="login-form-forgot" to="/forgot-password">
                <Title level={5}>Forgot password?</Title>
              </Link>
            </Form.Item>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Login;
