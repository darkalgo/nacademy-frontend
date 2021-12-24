import { useEffect, useState } from "react";
import { Col, Input, Row, Spin } from "antd";
import { useHistory } from "react-router-dom";
import FuzzySearch from "fuzzy-search";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../controls/ErrorHandler";
import Notification from "../controls/Notification";
import FeedbackCard from "./FeedbackCard";
import EmptyState from "../controls/EmptyState";

const { Search } = Input;

const StudentFeedbackList = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [studentFeedbackList, setStudentFeedbackList] = useState([]);
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      BaseAPI.post(
        "/admins/get-supports",
        { role: "student" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          setStudentFeedbackList(res.data.data);
          setSearchList(res.data.data);
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
  const searcher = new FuzzySearch(searchList, ["name", "subject", "email", "phone", "createdAt"], { sort: true });

  const handleSearch = (value) => {
    if (value) {
      const result = searcher.search(value);
      setStudentFeedbackList([...result]);
    } else {
      setStudentFeedbackList(searchList);
    }
  };
  const handleChange = (e) => {
    if (e.target.value) {
      const result = searcher.search(e.target.value);
      setStudentFeedbackList([...result]);
    } else {
      setStudentFeedbackList(searchList);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="input search text" enterButton onSearch={handleSearch} onChange={handleChange} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center">
        {studentFeedbackList.length > 0 ? (
          studentFeedbackList.map((el) => (
            <Col xs={{ span: 24 }} lg={{ span: 12 }} key={el.id}>
              <FeedbackCard feedback={el} />
            </Col>
          ))
        ) : (
          <EmptyState description="Hmmm 🤔. No feedback from students." />
        )}
      </Row>
    </Spin>
  );
};

export default StudentFeedbackList;
