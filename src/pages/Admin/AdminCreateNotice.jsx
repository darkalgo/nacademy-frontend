import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";

import { noticeType } from "../../utils/Constants";
import { BaseAPI } from "../../utils/Api";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AdminCreateNotice = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const [tutorList, setTutorList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      await Promise.all([
        // get accepted tutors
        BaseAPI.post(
          "/tutors/list",
          { status: "accept" },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
          }
        ),

        // get all students
        BaseAPI.get(
          "/students/list",
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
          }
        ),
      ])
        .then((res) => {
          setTutorList(res[0].data.data);
          setStudentList(res[1].data.data);
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
  }, [history]);

  // functions

  const onSelectAll = (value, state, event) => {
    if (event.includes("all")) {
      form.setFieldsValue({ [value]: state.map((el) => el.id) });
    }
  };

  const onFinish = async ({ header, body, notice_type, teacher_list, student_list }) => {
    setLoading(true);

    await BaseAPI.post(
      "/admins/notices",
      {
        header,
        body,
        type: notice_type,
        tutors: teacher_list,
        students: student_list,
      },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then(() => {
        Notification("Hooray!!", "Notice has been sent successfully.", "success");
        form.resetFields();
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
      <div className="center">
        <Title level={2}>Create Notice</Title>
      </div>

        <Form form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Form.Item name="notice_type" label="Notice Type" labelCol={{ span: 24 }} rules={[{ required: true, message: "Notice type is required" }]}>
                <Select placeholder="Select notice type">
                  {noticeType.map((el) => (
                    <Option value={el.id} key={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Form.Item name="teacher_list" label="Teacher List" labelCol={{ span: 24 }}>
                <Select
                  placeholder="Select teacher"
                  mode="multiple"
                  maxTagCount={2}
                  showSearch
                  optionFilterProp="children"
                  allowClear
                  showArrow
                  onChange={(e) => onSelectAll("teacher_list", tutorList, e)}>
                  <Option value={"all"}>Select all</Option>
                  {tutorList.map((el) => (
                    <Option value={el.id} key={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <Form.Item name="student_list" label="Student List" labelCol={{ span: 24 }}>
                <Select
                  placeholder="Select student"
                  mode="multiple"
                  maxTagCount={2}
                  showSearch
                  optionFilterProp="children"
                  allowClear
                  showArrow
                  onChange={(e) => onSelectAll("student_list", studentList, e)}>
                  <Option value={"all"}>Select all</Option>
                  {studentList.map((el) => (
                    <Option value={el.id} key={el.id}>
                      {el.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }}>
              <Form.Item name="header" label="Message Header" labelCol={{ span: 24 }} rules={[{ required: true, message: "Message header is required" }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col xs={{ span: 24 }}>
              <Form.Item name="body" label="Message Body" labelCol={{ span: 24 }} rules={[{ required: true, message: "Message body is required" }]}>
                <TextArea />
              </Form.Item>
            </Col>
          </Row>
          <div className="center">
            <Form.Item>
              <Button htmlType="submit" className="bg white-text">
                Send Notice
              </Button>
            </Form.Item>
          </div>
        </Form>
    </Spin>
  );
};

export default AdminCreateNotice;
