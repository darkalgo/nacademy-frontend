import React from "react";
import { Button, Card, Col, Form, Input, Row, Select, Typography } from "antd";
import { noticeType } from "../../utils/Constants";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AdminCreateNotice = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="center">
        <Title level={2}>Create Notice</Title>
      </div>

      <Card className="card">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Form.Item name="notice_type" label="Notice Type" labelCol={{ span: 24 }} rules={[{ required: true, message: "Notice type is required" }]}>
                <Select>
                  {noticeType.map((el) => (
                    <Option value={el.id} key={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Form.Item name="teacher_list" label="Teacher List" labelCol={{ span: 24 }}>
                <Select showSearch optionFilterProp="children" allowClear showArrow>
                  {noticeType.map((el) => (
                    <Option value={el.id} key={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Form.Item name="student_list" label="Student List" labelCol={{ span: 24 }}>
                <Select showSearch optionFilterProp="children" allowClear showArrow>
                  {noticeType.map((el) => (
                    <Option value={el.id} key={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }}>
              <Form.Item name="header" label="Message Header" labelCol={{ span: 24 }} rules={[{ required: true, message: "Message header is required" }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }}>
              <Form.Item name="body" label="Message Body" labelCol={{ span: 24 }} rules={[{ required: true, message: "Message body is required" }]}>
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <div className="center">
            <Form.Item>
              <Button htmlType="submit" className="bg white-text">
                Send Notice
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AdminCreateNotice;
