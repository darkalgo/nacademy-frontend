import React, { useState, useContext } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory, Link } from "react-router-dom";
import openSocket from "socket.io-client";

import "../styles/PageStyles/Login.less";
import { BaseAPI } from "../utils/Api";
import Notification from "../components/controls/Notification";
import { AppRootContext } from "../contexts/AppRootContext";

const { Title } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const { setSocket } = useContext(AppRootContext);

  const onFinish = async ({ user_name, password }) => {
    setLoading(true);
    await BaseAPI.post("/auth/signin", { user_name, password })
      .then((res) => {
        const response = res.data.data;
        sessionStorage.setItem("accessToken", response.token);
        sessionStorage.setItem("role", response.role);
        sessionStorage.setItem("id", response.id);

        const socket = openSocket(process.env.REACT_APP_SocketUrl);
        socket.on("connect", (msg) => {
          console.log("connection ok");
          if (response.role === "tutor") {
            socket.emit("register", { user_id: `${response.id}`, socket_id: `${socket.id}` });
          }
          setSocket(socket);
        });

        if (response.role === "tutor") {
          history.push("/tutor/dashboard");
        } else if (response.role === "admin") {
          history.push("/admin/dashboard");
        } else if (response.role === "student") {
          history.push("/student/dashboard");
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          Notification(err?.response?.data?.message, "Please fix this error and try again. Otherwise communicate with the admin", "error");
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      })
      .finally(() => setLoading(false));
    // window.location.reload(false);
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
                name="user_name"
                label="User Name"
                labelCol={{ span: 24 }}
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}>
                <Input placeholder="Enter your username" />
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
                <Button block type="primary" disabled={loading} htmlType="submit" className="bg white-text">
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
