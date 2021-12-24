import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";

import { emailValidation, mobileNumberValidation } from "../../utils/Validations";
import { classNames, districtName, genders, occupations, subjectNames } from "../../utils/Constants";
import { BaseAPI } from "../../utils/Api";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TutorProfile = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const [gender, setGender] = useState("Male");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/tutors/${sessionStorage.getItem("id")}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          const info = res.data.data;
          setGender(info.gender);
          form.setFieldsValue({
            name: info.name,
            email: info.email,
            phone_number: info.phone,
            dob: moment(info.dob),
            occupation: info.occupation,
            address: info.address,
            district: info.district,
            institute_name: info.institute_name,
            department_name: info.department_name,
            teaching_class: info.teaching_class.split(","),
            subject_good_at: info.good_at_subjects.split(","),
            favorite_subject: info.favorite_subject.split(","),
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
  }, []);

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
      department_name: values.department_name,
      teaching_class: values.teaching_class,
      why_want_join: "Valo lagce",
      class_teach: values.teaching_class,
      good_at_subject: values.subject_good_at,
      favorite_subject: values.favorite_subject,
    };
    console.log(info);

    await BaseAPI.patch("/tutors", info, {
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
      <Form form={form} onFinish={onFinish}>
        <div className="center">
          <Title level={3}>Profile</Title>
        </div>
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
            <Form.Item name="address" label="Address" labelCol={{ span: 24 }} rules={[{ required: true, message: "Address is required" }]}>
              <TextArea />
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
            <Form.Item name="institute_name" label="Institution Name" labelCol={{ span: 24 }} rules={[{ required: true, message: "Institution is required" }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="department_name" label="Department Name" labelCol={{ span: 24 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="teaching_class" label="Which class you will teach" labelCol={{ span: 24 }} rules={[{ required: true, message: "Class name is required" }]}>
              <Select mode="tags" style={{ width: "100%" }} tokenSeparators={[","]} showSearch optionFilterProp="children" allowClear showArrow>
                {classNames.map((el) => (
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
            <Form.Item name="subject_good_at" label="Subject You Are Good At" labelCol={{ span: 24 }} rules={[{ required: true, message: "Subject name is required" }]}>
              <Select mode="multiple" style={{ width: "100%" }} showSearch optionFilterProp="children" allowClear showArrow>
                {subjectNames.map((el) => (
                  <Option value={el.id} key={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <small>You can add subject name that are not listed by typing on the field</small>
          </Col>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="favorite_subject" label="Favorite Subject" labelCol={{ span: 24 }} rules={[{ required: true, message: "Subject name is required" }]}>
              <Select mode="multiple" style={{ width: "100%" }} showSearch optionFilterProp="children" allowClear showArrow>
                {subjectNames.map((el) => (
                  <Option value={el.id} key={el.id}>
                    {el.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <small>You can add subject name that are not listed by typing on the field</small>
          </Col>
        </Row>
        <Row justify="center" className="mt-2">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default TutorProfile;
