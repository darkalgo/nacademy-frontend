import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select, Spin, TimePicker, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { weekdays } from "../../utils/Constants";
import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;
const { Option } = Select;
const format = "HH:mm";

const TutorTimeSlot = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  // states
  const [loading, setLoading] = useState(false);
  const [dayNumber, setDayNumber] = useState([1]);
  const [existingSlots, setExistingSlots] = useState([]);
  const [timeChecked, setTimeChecked] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/tutors/slots/${sessionStorage.getItem("id")}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          setExistingSlots(res.data.data);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            ErrorHandler(err?.response?.data?.message, history);
          } else {
            Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
          }
        })
        .finally(() => setLoading(false));
    })();
  }, []);

  // functions
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

    // const Mins = (moment(values.start_time_1).hours() * 60) + moment(values.start_time_1).minutes();
    // console.log(Mins); // 1200
    // console.log(moment(values.start_time_1).format('LT')); // 8:10 PM
  };

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>Teaching Time Slots</Title>
      </div>
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
              <Form.Item name={`end_time_${i + 1}`} label="End Time" labelCol={{ span: 24 }}>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col lg={{ span: 1 }}>
              <Button type="primary" onClick={addNewTimeSlot} icon={<PlusOutlined />} style={{ marginTop: "40px" }} className="bg white-text"></Button>
            </Col>
            <Col lg={{ span: 2 }}>{dayNumber.length > 1 && <Button danger onClick={() => onCancel(i)} icon={<CloseOutlined />} style={{ marginTop: "40px" }}></Button>}</Col>
          </Row>
        ))}
        <Row>
          <Col xs={{ span: 24 }}>
            <Form.Item name="continue_time">
              <Checkbox checked={timeChecked} onChange={(e) => setTimeChecked(e.target.checked)}>
                Continue this time for every month
              </Checkbox>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" className="mt-2">
          <Button type="primary" htmlType="submit" className="bg white-text">
            Save Time Slots
          </Button>
        </Row>
      </Form>
    </Spin>
  );
};

export default TutorTimeSlot;
