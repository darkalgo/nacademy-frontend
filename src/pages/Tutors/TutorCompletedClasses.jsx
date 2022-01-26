import React, { useEffect, useState } from "react";
import { Card, Col, Input, Table, Row, Spin, Typography, Select } from "antd";
import { useHistory } from "react-router-dom";
import FuzzySearch from "fuzzy-search";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const TutorCompletedClasses = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [searchedClassList, setSearchedClassList] = useState([]);
  const [status, setStatus] = useState("completed");

  useEffect(() => {
    getClassList(status);
  }, []);

  const getClassList = (status) => {
    (async () => {
      setLoading(true);
      await BaseAPI.post(
        "/tutors/classes",
        { status },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          console.log(res.data.data);
          const info = res.data.data.map((el) => ({
            ...el,
            key: el.id,
          }));
          setClassList(info);
          setSearchedClassList(info);
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
  };

  const onClassStatusChange = (value) => {
    if (value === "completed") {
      setStatus("completed");
    } else {
      setStatus("cancel");
    }
    getClassList(value);
  };

  const searcher = new FuzzySearch(classList, ["agenda", "subject", "tutor_name"], { sort: true });

  const handleOnSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setSearchedClassList([...result]);
    } else {
      setSearchedClassList(classList);
    }
  };

  const handleSearchChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setSearchedClassList([...result]);
    } else {
      setSearchedClassList(classList);
    }
  };

  const columns = [
    {
      title: "Class Name",
      dataIndex: "agenda",
      key: "agenda",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Package Type",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Student Name",
      dataIndex: "student_name",
      key: "student_name",
    },
    {
      title: "Student Institution Name",
      dataIndex: "student_institute_name",
      key: "student_institute_name",
    },
    {
      title: "Rating",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>Completed Classes</Title>
      </div>

      <Row justify="space-between" className="mb-1" gutter={[8, 8]}>
        <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <Select defaultValue="completed" placeholder="Select Class Status" style={{ width: "100%" }} onChange={onClassStatusChange}>
            <Option value="completed">Completed Class</Option>
            <Option value="cancel">Cancelled Class</Option>
          </Select>
        </Col>

        <Col xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
          <Search placeholder="Search class" allowClear enterButton onSearch={handleOnSearch} onChange={handleSearchChange} />
        </Col>
      </Row>

      <Card className="card">
        <Table columns={columns} dataSource={searchedClassList} scroll={{ x: 1200 }} />
      </Card>
    </Spin>
  );
};

export default TutorCompletedClasses;
