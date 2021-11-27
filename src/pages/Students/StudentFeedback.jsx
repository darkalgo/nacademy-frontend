import React from "react";
import { Col, Form, Input, Row, Typography, Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

const StudentFeedback = () => {
  const { form } = Form.useForm();

  const props = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row justify="center" className="mb-2">
          <Title level={2}>Share Your Feedback</Title>
        </Row>

        <Row justify="center">
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item name="subject" label="Subject" labelCol={{ span: 24 }} rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Form.Item name="description" label="Description" labelCol={{ span: 24 }} rules={[{ required: true }]}>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <Form.Item label="Upload file" labelCol={{ span: 24 }}>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
              </Dragger>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" className="mt-2">
          <Button type="primary" htmlType="submit" size="large" className="bg white-text">
            Submit Feedback
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default StudentFeedback;
