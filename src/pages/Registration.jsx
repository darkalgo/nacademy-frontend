import React, { useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from "antd";
import { accountType, classNames, districtName, genders, groupNames, occupations, subjectNames } from "../utils/Constants";
import { mobileNumberValidation, passwordValidation } from "../utils/Validations";

const { Text, Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const Registration = () => {
  const [form] = Form.useForm();

  const [selectedAccount, setSelectedAccount] = useState("Tutor");
  const [gender, setGender] = useState("Male");

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div style={{ padding: "20px 20px" }}>
      <Form form={form} onFinish={onFinish}>
        <Row justify="center">
          <Title level={3}>Create account to get started</Title>
        </Row>
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Title level={5}>
              I am a &nbsp; &nbsp;
              <Radio.Group options={accountType} onChange={(e) => setSelectedAccount(e.target.value)} value={selectedAccount} optionType="button" buttonStyle="solid" />
            </Title>
          </Col>
        </Row>

        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item name="name" label="Name" labelCol={{ span: 24 }} rules={[{ required: true, message: "Name is required" }]}>
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
                { type: "email", message: "The input is not valid E-mail!" },
                { required: true, message: "Email is required" },
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
                { required: true, message: "Number is required" },
                { pattern: mobileNumberValidation, message: "Number is not valid" },
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
        {selectedAccount === "Student" ? (
          <>
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
          </>
        ) : (
          <>
            <Row justify="center">
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                <Form.Item name="department_name" label="Department Name" labelCol={{ span: 24 }}>
                  <Input />
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
            <Row justify="center">
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                <Form.Item name="favorite_subject" label="Favorite Subject" labelCol={{ span: 24 }} rules={[{ required: true, message: "Favorite subject name is required" }]}>
                  <Select mode="tags" style={{ width: "100%" }} tokenSeparators={[","]} showSearch optionFilterProp="children" allowClear>
                    {subjectNames.map((el) => (
                      <Option value={el.id} key={el.id}>
                        {el.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                <Form.Item name="join_reason" label="Why You Want To Join nAcademy" labelCol={{ span: 24 }} rules={[{ required: true, message: "Field is required" }]}>
                  <TextArea />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item
              name="password"
              label="Password"
              labelCol={{ span: 24 }}
              rules={[
                { pattern: passwordValidation, message: "Minimum 8 characters with at least one uppercase, one lowercase, one special character and one number" },
                { required: true, message: "Password is required" },
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: "1.5em" }}>
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Registration;
