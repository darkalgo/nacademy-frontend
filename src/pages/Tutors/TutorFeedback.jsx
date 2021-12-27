import React, { useState } from "react";
import { Col, Form, Input, Row, Typography, Upload, message, Button, Spin } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";
import { BaseAPI } from "../../utils/Api";

const { Title } = Typography;
const { TextArea } = Input;

const TutorFeedback = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  // states
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // functions
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      Notification("Error", "You can only upload JPG/PNG file.", "error");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Notification("Error", "Image must smaller than 5MB.", "error");
    }

    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async ({ subject, description }) => {
    let info = {};
    if (imageUrl === "") {
      info = {
        subject,
        description,
      };
    } else {
      info = {
        subject,
        description,
        upload_file: imageUrl,
      };
    }
    setLoading(true);
    await BaseAPI.post("/students/supports", info, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        Notification("Thank You", "Your feedback has been sent.", "success");
        setImageUrl("");
        form.resetFields();
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          ErrorHandler(err?.response?.data?.message, history);
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <Spin spinning={loading}>
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
            <label>Upload Image (If necessary)</label>
            <Upload
              name="product image"
              listType="picture-card"
              showUploadList={false}
              maxCount={3}
              multiple
              action={async (file) => {
                setLoading(true);
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "refgi3u1");

                await axios
                  .post(process.env.REACT_APP_cloudinary, formData)
                  .then((res) => {
                    console.log(res.data.secure_url);
                    setImageUrl(res.data.secure_url);
                    message.success("Image uploaded successfully");
                  })
                  .catch((err) => {
                    console.log(err);
                    Notification("Error", "Something went wrong while uploading image", "error");
                  })
                  .finally(() => setLoading(false));
              }}
              beforeUpload={beforeUpload}>
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ maxWidth: "55%" }} /> : uploadButton}
            </Upload>
          </Col>
        </Row>
        <Row justify="center" className="mt-2">
          <Button type="primary" htmlType="submit" className="bg white-text">
            Submit Feedback
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default TutorFeedback;
