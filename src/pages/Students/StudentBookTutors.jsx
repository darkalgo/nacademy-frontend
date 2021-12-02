import React, { useState } from "react";
import { Button, Calendar, Card, Col, Form, Modal, Row, Select, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;
const { Option } = Select;

const StudentBookTutors = () => {
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const onPanelChange = (value, mode) => {
    console.log(value, mode);
  };

  const onCalenderChange = (value) => {
    console.log(moment(value).format("LL"));
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <div className="center">
        <Title level={2}>Book A Tutor</Title>
      </div>

      <Row>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Title level={5}>Please select a date to see available teachers </Title>
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
          <Calendar fullscreen={false} disabledDate={disabledDate} onPanelChange={onPanelChange} onChange={onCalenderChange} />
        </Col>
      </Row>

      <div className="center mb-2 mt-2">
        <Title level={2}>Available Teachers</Title>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <Card className="card">
            <Row gutter={[8, 8]}>
              <Col xs={{ span: 6 }}>
                <Title level={5} className="primary-color">
                  Name:
                </Title>
              </Col>
              <Col xs={{ span: 18 }}>
                <Title level={5}>Kamal Hossain</Title>
              </Col>
              <Col xs={{ span: 6 }}>
                <Title level={5} className="primary-color">
                  Varsity Name:
                </Title>
              </Col>
              <Col xs={{ span: 18 }}>
                <Title level={5}>Daffodil International University</Title>
              </Col>
              <Col xs={{ span: 6 }}>
                <Title level={5} className="primary-color">
                  Department Name:
                </Title>
              </Col>
              <Col xs={{ span: 18 }}>
                <Title level={5}>Software Engineering</Title>
              </Col>
            </Row>
            <Row justify="center">
              <Button block className="bg white-text mt-1" icon={<ClockCircleOutlined />} onClick={showModal}>
                View Available Slots
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
      <Modal title="Available Time Slots" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={onFinish}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Form.Item name="time_slot" label="Available Time Slots" labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select a time slot" }]}>
                <Select>
                  <Option></Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }}>
              <Form.Item>
                <Button block className="bg white-text" htmlType="submit">
                  Get Slot
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentBookTutors;
