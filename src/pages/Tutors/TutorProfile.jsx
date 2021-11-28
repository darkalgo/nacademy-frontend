import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from "antd";

import { emailValidation, mobileNumberValidation } from "../../utils/Validations";
import { classNames, districtName, genders, occupations, subjectNames } from "../../utils/Constants";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const TutorProfile = () => {
  const [form] = Form.useForm();

  const [gender, setGender] = useState("Male");

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Title level={3}>Profile</Title>
        </Row>
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
            <Form.Item name="institution" label="Institution" labelCol={{ span: 24 }} rules={[{ required: true, message: "Institution is required" }]}>
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
            <Form.Item name="tutor_class" label="Which class you will teach" labelCol={{ span: 24 }} rules={[{ required: true, message: "Class name is required" }]}>
              <Select mode="tags" style={{ width: "100%" }} tokenSeparators={[","]} showSearch optionFilterProp="children" allowClear>
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
            <Form.Item name="subject" label="Subject You Are Good At" labelCol={{ span: 24 }} rules={[{ required: true, message: "Subject name is required" }]}>
              <Select mode="tags" style={{ width: "100%" }} tokenSeparators={[","]} showSearch optionFilterProp="children" allowClear>
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
    </div>
  );
};

export default TutorProfile;
