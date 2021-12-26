import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { emailValidation, mobileNumberValidation } from "../../utils/Validations";
import { classNames, districtName, genders, groupNames, occupations } from "../../utils/Constants";
import { BaseAPI } from "../../utils/Api";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const StudentProfile = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  // states
  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/students/${sessionStorage.getItem("id")}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          const info = res.data.data;
          setGender(info.gender);
          form.setFieldsValue({
            name: info.name,
            email: info.email,
            phone_number: info.phone,
            dob: moment(info.dob),
            address: info.address,
            occupation: info.occupation,
            district: info.district,
            institute_name: info.institute_name,
            group_name: info.group_name,
            class_name: info.class_name,
          });
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
  }, [history, form]);

  const onFinish = async (values) => {
    setLoading(true);
    const info = {
      id: sessionStorage.getItem("id"),
      name: values.name,
      email: values.email,
      phone: values.phone_number,
      dob: moment(values.dob).format("YYYY-MM-DD"),
      gender: gender,
      address: values.address,
      district: values.district,
      occupation: values.occupation,
      institute_name: values.institute_name,
      group_name: values.group_name,
      class_name: values.class_name,
    };

    await BaseAPI.patch("/students", info, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    })
      .then(() => {
        Notification("Congratulations", "Your profile has been updated successfully", "success");
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
      <Row justify="center">
        <Title level={2}>Profile</Title>
      </Row>

      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="name" label="Full Name" labelCol={{ span: 24 }} rules={[{ required: true, message: "Name is required" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item
              name="email"
              label="Email"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Email is required" },
                { pattern: emailValidation, message: "Please enter a valid email" },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item
              name="phone_number"
              label="Phone Number"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Phone number is required" },
                { pattern: mobileNumberValidation, message: "Please enter valid number" },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="dob" label="Date Of Birth" labelCol={{ span: 24 }} rules={[{ required: true, message: "DoB is required" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Text>
              Select gender &nbsp; &nbsp;
              <Radio.Group options={genders} onChange={(e) => setGender(e.target.value)} value={gender} optionType="button" buttonStyle="solid" />
            </Text>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="address" label="Address" labelCol={{ span: 24 }} rules={[{ required: true, message: "Address is required" }]}>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="occupation" label="Occupation" labelCol={{ span: 24 }} rules={[{ required: true, message: "Occupation is required" }]}>
              <Select>
                {occupations.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="district" label="District" labelCol={{ span: 24 }} rules={[{ required: true, message: "District is required" }]}>
              <Select showSearch optionFilterProp="children" allowClear>
                {districtName.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="institute_name" label="Institute Name" labelCol={{ span: 24 }} rules={[{ required: true, message: "Institute name is required" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="group_name" label="Group Name" labelCol={{ span: 24 }} rules={[{ required: true, message: "Group name is required" }]}>
              <Select>
                {groupNames.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="class_name" label="Class Name" labelCol={{ span: 24 }} rules={[{ required: true, message: "Class name is required" }]}>
              <Select>
                {classNames.map((el) => (
                  <Option key={el.id} value={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" className="mt-2">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item>
              <Button block type="primary" htmlType="submit" className="bg white-text">
                Update Profile
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default StudentProfile;
