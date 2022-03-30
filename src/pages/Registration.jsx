import {useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Radio, Row, Select, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import { accountType, classNames, districtName, genders, groupNames, occupations, subjectNames } from "../utils/Constants";
import { mobileNumberValidation, passwordValidation } from "../utils/Validations";
import { BaseAPI } from "../utils/Api";
import moment from "moment";
import Notification from "../components/controls/Notification";

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Registration = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("Tutor");
  const [gender, setGender] = useState("Male");
  const [classList, setClassList] = useState([]);
  const [goodAtSubjects, setGoodAtSubjects] = useState([])
  const [favoriteSubjects, setFavoriteSubjects] = useState([])

  useEffect(() => {
    (async() => {
      await BaseAPI.get('/tutors/get-subjects').then(res => {
        console.log(res.data)
        setClassList(res.data.data)
      }).catch(err => {
        if (err?.response?.data?.message) {
          Notification(err?.response?.data?.message, "Please fix this error and try again. Otherwise communicate with the admin", "error");
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      })
    })()
  }, [])

  const onClassChange = value => {
    let subjects = [];
    value.forEach(gro => {
      subjects = [...subjects, ...classList.find(el => el.group_id === gro).subjects];
    });
    setGoodAtSubjects([...subjects]);
    setFavoriteSubjects([...subjects]);
  }

  const onFinish = async (values) => {
    let info = null;
    if (selectedAccount === "Tuftor") {
      info = {
        name: values.name,
        email: values.email,
        phone: values.phone_number,
        dob: moment(values.dob).format("YYYY-MM-DD"),
        gender: gender,
        address: values.address,
        district: values.district,
        occupation: values.occupation,
        institute_name: values.institute_name,
        user_name: values.username,
        password: values.password,
        department_name: values.department_name,
        why_want_join: values.join_reason,
        class_teach: values.tutor_class,
        good_at_subject: values.subject,
        favorite_subject: values.favorite_subject,
      };
    } else {
      info = {
        name: values.name,
        email: values.email,
        phone: values.phone_number,
        dob: moment(values.dob).format("YYYY-MM-DD"),
        gender: gender,
        address: values.address,
        district: values.district,
        occupation: values.occupation,
        institute_name: values.institute_name,
        user_name: values.username,
        password: values.password,
        group_name: values.group_name,
        class_name: values.class_name,
      };
    }

    let apiRoute = "";
    if (selectedAccount === "Tutor") {
      apiRoute = "/auth/signup-tutor";
    } else {
      apiRoute = "/auth/signup-student";
    }

    setLoading(true);
    await BaseAPI.post(`${apiRoute}`, info)
      .then((res) => {
        Notification("Success", `${res.data.message}`, "success");
        history.push("/login");
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          Notification(err?.response?.data?.message, "Please fix this error and try again. Otherwise communicate with the admin", "error");
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(values);
  };

  return (
    <div className="mt-2">
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row justify="center" className="mb-2">
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
            <Form.Item name="username" label="Username" labelCol={{ span: 24 }} rules={[{ required: true, message: "Username is required" }]}>
              <Input />
            </Form.Item>
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
            <Title level={5}>
              Select gender &nbsp; &nbsp;
              <Radio.Group options={genders} onChange={(e) => setGender(e.target.value)} value={gender} optionType="button" buttonStyle="solid" />
            </Title>
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
              <Select showSearch allowClear showArrow>
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
                <Form.Item name="tutor_class" label="Which class you will teach" labelCol={{ span: 24 }} rules={[{ required: true, message: "Class name is required" }]}>
                  <Select mode="multiple" style={{ width: "100%" }} allowClear showArrow onChange={onClassChange}>
                    {classList.map((el) => (
                      <Option key={el.group_id} value={el.group_id}>
                        {el.group_name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center">
              <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                <Form.Item name="subject" label="Subject You Are Good At" labelCol={{ span: 24 }} rules={[{ required: true, message: "Subject name is required" }]}>
                  <Select mode="multiple" style={{ width: "100%" }} showSearch allowClear showArrow>
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
                <Form.Item name="favorite_subject" label="Favorite Subject" labelCol={{ span: 24 }} rules={[{ required: true, message: "Favorite subject name is required" }]}>
                  <Select mode="multiple" style={{ width: "100%" }} tokenSeparators={[","]} showSearch allowClear showArrow>
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
        <Row justify="center">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              labelCol={{ span: 24 }}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("The two passwords that you entered do not match!");
                  },
                }),
              ]}>
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center" className="mt-2">
          <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
            <Form.Item>
              <Button block type="primary" htmlType="submit" className="bg white-text">
                Create Account {loading && <LoadingOutlined />}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Registration;
