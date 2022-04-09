import React, { useEffect, useState } from "react";
import { Input, Table, Row, Typography, Col, Card, Spin, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import FuzzySearch from "fuzzy-search";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";
import EmptyState from "../../components/controls/EmptyState";

const { Title } = Typography;
const { Search } = Input;

const StudentCompletedClasses = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState([]);
  const [searchedClassList, setSearchedClassList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get("/students/get-complete-classes", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          const info = res.data.data.map((el) => ({
            ...el,
            key: el.id,
          }));
          console.log(info);
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
  }, []);

  const searcher = new FuzzySearch(classList, ["agenda", "subject", "tutor"], { sort: true });

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
      title: "Subject Name",
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
      title: "Teacher Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Rating",
      dataIndex: "tutor_ratings",
      key: "tutor_ratings",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Tooltip title="View Details">
          <EyeOutlined className="icon-style" onClick={() => history.push(`/student/classes/${record.id}`)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}> Completed Classes</Title>
      </div>

      {classList.length > 0 ? (
        <>
          <Row justify="end" className="mb-1">
            <Col xs={{ span: 24 }} md={{ span: 8 }} >
              <Search placeholder="Search by class name, subjects and teacher" allowClear enterButton onSearch={handleOnSearch} onChange={handleSearchChange} />
            </Col>
          </Row>

          <Card className="card">
            <Table columns={columns} dataSource={searchedClassList} scroll={{ x: 1000 }} />
          </Card>
        </>
      ) : (
        <Row justify="center">
          <EmptyState description="You have not conducted any class yet" />
        </Row>
      )}
    </Spin>
  );
};

export default StudentCompletedClasses;
