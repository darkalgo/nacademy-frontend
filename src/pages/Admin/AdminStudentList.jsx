import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";

import StudentListTable from "../../components/Admin/StudentListTable";
import ErrorHandler from "../../components/controls/ErrorHandler";
import { BaseAPI } from "../../utils/Api";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;
const { Search } = Input;

const AdminStudentList = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.post(
        "/students/list",
        {},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          let response = res.data.data.map((el) => ({
            ...el,
            key: el.id,
          }));
          console.log(response);
          setStudentList(response);
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

  return (
    <div>
      <div className="center">
        <Title level={2}>Student List</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="Search text" enterButton />
        </Col>
      </Row>
      <Card className="card">
        <StudentListTable info={studentList} />
      </Card>
    </div>
  );
};

export default AdminStudentList;
