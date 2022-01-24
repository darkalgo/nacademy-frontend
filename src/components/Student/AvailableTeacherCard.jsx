import { useState } from "react";
import { Button, Card, Col, Form, Modal, Rate, Row, Select, Spin, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import Notification from "../controls/Notification";
import ErrorHandler from "../controls/ErrorHandler";

const { Title } = Typography;
const { Option } = Select;

const AvailableTeacherCard = ({ info, subject }) => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getSlot = async (values) => {
    setLoading(false);
    const body = {
      slot: values.time_slot,
      subject,
    };

    await BaseAPI.post("/students/booking-single-slot", body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        Notification("Hooray!", "You've booked your teacher", "success");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          ErrorHandler(err?.response?.data?.message, history);
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      })
      .finally(() => setLoading(false), isModalVisible(false));
  };

  return (
    <>
      <Card className="card">
        <Row justify="center" className="mb-2">
          <img src="https://picsum.photos/200/300" alt="image" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
        </Row>
        <Row gutter={[8, 8]}>
          <Col xs={{ span: 6 }}>
            <Title level={5} className="primary-color">
              Name:
            </Title>
          </Col>
          <Col xs={{ span: 18 }}>
            <Title level={5}>{info.name}</Title>
          </Col>
          <Col xs={{ span: 6 }}>
            <Title level={5} className="primary-color">
              Varsity Name:
            </Title>
          </Col>
          <Col xs={{ span: 18 }}>
            <Title level={5}>{info.institute_name}</Title>
          </Col>
          <Col xs={{ span: 6 }}>
            <Title level={5} className="primary-color">
              Rating:
            </Title>
          </Col>
          <Col xs={{ span: 18 }}>
            <Title level={5}>
              <Rate allowHalf defaultValue={2.5} />
            </Title>
          </Col>
        </Row>
        <Row justify="center">
          <Button block className="bg white-text mt-1" icon={<ClockCircleOutlined />} onClick={showModal}>
            {loading ? "Booking slot..." : "View Available Slots"}
          </Button>
        </Row>
      </Card>

      <Modal title="Available Time Slots" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
        <Form form={form} onFinish={getSlot}>
          <Row>
            <Col xs={{ span: 24 }}>
              <Form.Item name="time_slot" label="Available Time Slots" labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select a time slot" }]}>
                <Select placeholder="Select your preferable time slot">
                  {info.slots.map((el) => (
                    <Option key={el.id} value={el.id}>
                      {el.start_time} - {el.end_time}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }}>
              <Form.Item>
                <Button block className="bg white-text" htmlType="submit">
                  Book Slot
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AvailableTeacherCard;
