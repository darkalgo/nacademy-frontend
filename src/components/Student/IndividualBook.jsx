import React, { useState } from "react";
import { Button, Calendar, Col, Form, Row, Select, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { subjectNames } from "../../utils/Constants";
import ErrorHandler from "../controls/ErrorHandler";
import Notification from "../controls/Notification";
import { BaseAPI } from "../../utils/Api";
import EmptyState from "../controls/EmptyState";
import AvailableTeacherCard from "./AvailableTeacherCard";

const { Title } = Typography;
const { Option } = Select;

const IndividualBook = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(null);
  const [subject, setSubject] = useState("");

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf("day");
  };

  const onFinish = async (values) => {
    setLoading(true);
    setSubject(values.subject);

    const body = {
      date: moment(values.selected_date).format("YYYY-MM-DD"),
      subject: values.subject,
    };

    await BaseAPI.post("/students/get-available-teachers-single", body, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data.length !== 0) {
          setNoData(false);
          setAvailableTeachers(res.data.data);
        } else {
          setNoData(true);
        }
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
        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <Title level={5}>Please select a date to see available teachers</Title>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <Form.Item name="subject" label="Subjects" labelCol={{ span: 24 }} rules={[{ required: true, message: "Please select subject" }]}>
              <Select placeholder="Select a subject" style={{ width: "100%" }} allowClear showArrow>
                {subjectNames.map((el) => (
                  <Option value={el.id} key={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12, offset: 6 }}>
            <Form.Item name="selected_date" label="Select Date" labelCol={{ span: 24 }}>
              <Calendar fullscreen={false} disabledDate={disabledDate} />
            </Form.Item>
          </Col>
        </Row>
        <div className="center">
          <Form.Item>
            <Button className="bg white-text" htmlType="submit">
              Find Available Teachers
            </Button>
          </Form.Item>
        </div>
      </Form>

      <Row gutter={[16, 16]} justify="center">
        {availableTeachers.map((el) => (
          <Col xs={{ span: 24 }} lg={{ span: 12 }} key={el.tutor_id}>
            <AvailableTeacherCard info={el} subject={subject} />
          </Col>
        ))}
        {noData && <EmptyState description="Sorry! No teacher found on given data 😢" />}
      </Row>
    </Spin>
  );
};

export default IndividualBook;
