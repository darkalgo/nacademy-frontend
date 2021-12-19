import React, { useState } from "react";
import { Col, Form, Input, Row, Typography, Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import Notification from "../../components/controls/Notification";

const { Title } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

const TutorFeedback = () => {
  const { form } = Form.useForm();

  const [fileList, setFileList] = useState([]);

  const props = {
    name: "Images",
    multiple: true,
    listType: "picture",
    fileList: fileList,
    action: `${process.env.REACT_APP_cloudinary}`,
    beforeUpload: (file) => {
      if (file.type !== "image/jpeg" && file.type !== "image/png" && file.type !== "image/svg+xml") {
        Notification(`${file.name} is not an image`, "Please upload a correct image file", "error");
      }
      return file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/svg+xml";
    },
    onChange(info) {
      let fileList = [...info.fileList];
      // 1. Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      fileList = fileList.slice(-3);
      // 2. Read from response and show file link
      console.log(fileList);
      fileList = fileList.map((file) => {
        console.log("file", file);
        // if (file.response) {
        //   console.log(file);
        //   // Component will show file.url as link
        //   file.url = process.env.REACT_APP_s3_cdn + file.response.file_name;
        //   file.image_name = file.response.file_name;
        // }
        return file;
      });
      setFileList(fileList.filter((file) => !!file.status));
    },
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <div className="center mb-2">
          <Title level={2}>Share Your Feedback</Title>
        </div>

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
          <Button type="primary" htmlType="submit" className="bg white-text">
            Submit Feedback
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default TutorFeedback;
