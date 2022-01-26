import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";
import FuzzySearch from "fuzzy-search";

import AllAvailableTutorTable from "../../components/Student/AllAvailableTutorTable";
import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;
const { Search } = Input;

const StudentAllTutors = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [searchedTeacherList, setSearchedTeacherList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      BaseAPI.post(
        "/tutors/list",
        { status: "accept" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          const info = res.data.data.map((el) => ({
            ...el,
            key: nanoid(3),
          }));
          setTeacherList(info);
          setSearchedTeacherList(info);
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

    return () => {
      setTeacherList([]);
    };
  }, [history]);

  const searcher = new FuzzySearch(teacherList, ["name", "email", "institute_name"], { sort: true });

  const handleOnSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setSearchedTeacherList([...result]);
    } else {
      setSearchedTeacherList(teacherList);
    }
  };

  const handleSearchChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setSearchedTeacherList([...result]);
    } else {
      setSearchedTeacherList(teacherList);
    }
  };

  return (
    <div>
      <div className="center">
        <Title level={2}>All Teachers Information</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <Search placeholder="Search class" allowClear enterButton onSearch={handleOnSearch} onChange={handleSearchChange} />
        </Col>
      </Row>

      <Spin spinning={loading}>
        <Card className="card">
          <AllAvailableTutorTable info={searchedTeacherList} />
        </Card>
      </Spin>
    </div>
  );
};

export default StudentAllTutors;
