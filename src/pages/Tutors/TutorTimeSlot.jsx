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
const format = "h:mm A";

const TutorTimeSlot = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  // states
  const [loading, setLoading] = useState(false);
  const [dayNumber, setDayNumber] = useState([1]);
  const [data, setData] = useState([]);
  const [validateData, setValidateData] = useState([]);
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
          const { data } = res.data;
          setData(data);
          setDayNumber([...Array(data.SlotsInfo.length > 0 ? data.SlotsInfo.length : 1).fill(1)]);
          setTimeChecked(data.continue_every_month);

          data.SlotsInfo.map((el, i) => {
            const dateObj = new Date();
            const dateStr = dateObj.toISOString().split('T').shift();
            form.setFieldsValue({
              [`weekday_${i + 1}`]: el.day,
              [`start_time_${i + 1}`]: moment(dateStr + ' ' + el.start_time),
              [`end_time_${i + 1}`]: el.end_time,
            });
          })
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
    delete value.continue_time;
    const objArr = Object.getOwnPropertyNames(value);
    const formattedData = [];
    for (let i = 0; i < objArr.length; i += 3) {
      const pos = formattedData.findIndex(el => el.day === value[objArr[i]]);
      if (pos === -1) {
        formattedData.push({
          day: value[objArr[i]],
          slots: [{
            "start_str": moment(value[objArr[i + 1]]).format("LT"),
            "start_num": (moment(value[objArr[i + 1]]).hours() * 60) + moment(value[objArr[i + 1]]).minutes(),
            "end_str": moment(value[objArr[i + 1]]).add(70, 'minutes').format("LT"),
            "end_num": (moment(value[objArr[i + 1]]).hours() * 60) + moment(value[objArr[i + 1]]).minutes() + 70,
          }]
        });
      } else {
        formattedData[pos].slots.push({
          "start_str": moment(value[objArr[i + 1]]).format("LT"),
          "start_num": (moment(value[objArr[i + 1]]).hours() * 60) + moment(value[objArr[i + 1]]).minutes(),
          "end_str": moment(value[objArr[i + 1]]).add(70, 'minutes').format("LT"),
          "end_num": (moment(value[objArr[i + 1]]).hours() * 60) + moment(value[objArr[i + 1]]).minutes() + 70,
        })
      }
    }

    let duplicated_day = "";
    for (let i = 0; i < formattedData.length; i++) {
      const { day, slots } = formattedData[i];
      if (slots.length > 1) {
        for (let j = 0; j < slots.length - 1; j++) {
          if (slots[j].start_num <= slots[j + 1].start_num && slots[j + 1].start_num < slots[j].end_num) {
            duplicated_day = day;
            break;
          }
        }
      }
      if (duplicated_day.length > 0) break;
    }

    return { body: formattedData, duplicated_day};
  };

  const onFinish = (values) => {
    const { body, duplicated_day } = formatDataFromValue(values);
    if (duplicated_day.length > 0) return Notification("Duplicated", `Duplicated slot in ${duplicated_day}`, "error");
    console.log(body);
    console.log(timeChecked)
  };

  const onChangeStartTime = (time, pos) => {
    form.setFieldsValue({
      [`end_time_${pos}`]: moment(time).add(70, 'minutes').format("LT")
    });
  }

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
                    <Option key={el.id} value={el.name}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 7 }}>
              <Form.Item name={`start_time_${i + 1}`} label="Start Time" labelCol={{ span: 24 }} rules={[{ required: true, message: "Start time is required" }]}>
                <TimePicker minuteStep={10} use12Hours format={format} onChange={(e) => onChangeStartTime(e, i + 1)} style={{ width: "100%" }} />
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
