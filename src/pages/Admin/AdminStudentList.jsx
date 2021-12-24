import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import FuzzySearch from "fuzzy-search";

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
  const [searchList, setSearchList] = useState([]);

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
          setStudentList(response);
          setSearchList(response);
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

  // search functionality
  const searcher = new FuzzySearch(searchList, ["name", "email", "phone", "institute_name", "group", "class_name"], { sort: true });

  const handleSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setStudentList([...result]);
    } else {
      setStudentList(searchList);
    }
  };
  const handleChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setStudentList([...result]);
    } else {
      setStudentList(searchList);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>Student List</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="Search text" enterButton onSearch={handleSearch} onChange={handleChange} />
        </Col>
      </Row>
      <Card className="card">
        <StudentListTable info={studentList} />
      </Card>
    </Spin>
  );
};

export default AdminStudentList;
