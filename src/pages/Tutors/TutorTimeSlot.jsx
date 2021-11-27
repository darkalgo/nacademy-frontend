import React, { useState } from "react";
import { Button, Col, Form, Row, Select, TimePicker, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";

import { weekdays } from "../../utils/Constants";

const { Title } = Typography;
const { Option } = Select;
const format = "HH:mm";

const TutorTimeSlot = () => {
  const [form] = Form.useForm();

  const [dayNumber, setDayNumber] = useState([1]);

  const addNewTimeSlot = () => {
    setDayNumber([...dayNumber, 1]);
  };

  const onCancel = (pos) => {
    let oldData = [];
    for (let i = 0; i < dayNumber.length; i++) {
      oldData.push({
        idx: i,
        weekday: form.getFieldValue(`weekday_${i + 1}`),
        start_time: form.getFieldValue(`start_time_${i + 1}`),
        end_time: form.getFieldValue(`end_time_${i + 1}`),
      });
    }

    form.resetFields();
    oldData = oldData.filter((el) => el.idx !== pos);

    for (let i = 0; i < oldData.length; i++) {
      form.setFieldsValue({
        [`weekday_${i + 1}`]: oldData[i]["weekday"],
        [`start_time_${i + 1}`]: oldData[i]["start_time"],
        [`end_time_${i + 1}`]: oldData[i]["end_time"],
      });
    }

    const values = [...dayNumber];
    values.splice(pos, 1);
    setDayNumber(values);
  };

  const formatDataFromValue = (value) => {
    const objArr = Object.getOwnPropertyNames(value);
    const formattedData = [];
    for (let i = 0; i < objArr.length; i += 3) {
      formattedData.push({
        weekday: value[objArr[i]],
        start_time: moment(value[objArr[i + 1]]).format("LT"),
        end_time: moment(value[objArr[i + 2]]).format("LT"),
      });
    }
    return formattedData;
  };

  const onFinish = (values) => {
    console.log(values);
    const body = formatDataFromValue(values);
    console.log(body);
  };

  return (
    <>
      <Row justify="center">
        <Title level={2}>Teaching Time Slots</Title>
      </Row>
      <Form form={form} onFinish={onFinish}>
        {dayNumber.map((x, i) => (
          <Row key={i} gutter={[16, 16]}>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
              <Form.Item name={`weekday_${i + 1}`} label="Day" labelCol={{ span: 24 }} rules={[{ required: true, message: "Day is required" }]}>
                <Select placeholder="Select day">
                  {weekdays.map((el) => (
                    <Option key={el.id} value={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
              <Form.Item name={`start_time_${i + 1}`} label="Start Time" labelCol={{ span: 24 }} rules={[{ required: true, message: "Start time is required" }]}>
                <TimePicker minuteStep={10} use12Hours format={format} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
              <Form.Item name={`end_time_${i + 1}`} label="End Time" labelCol={{ span: 24 }} rules={[{ required: true, message: "End time is required" }]}>
                <TimePicker minuteStep={10} use12Hours format={format} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col lg={{ span: 1 }}>
              <Button type="primary" onClick={addNewTimeSlot} icon={<PlusOutlined />} style={{ marginTop: "40px" }} className="bg white-text"></Button>
            </Col>
            <Col lg={{ span: 2 }}>{dayNumber.length > 1 && <Button danger onClick={() => onCancel(i)} icon={<CloseOutlined />} style={{ marginTop: "40px" }}></Button>}</Col>
          </Row>
        ))}
        <Row justify="center" className="mt-2">
          <Button type="primary" htmlType="submit" className="bg white-text">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default TutorTimeSlot;
