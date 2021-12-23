import { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { useHistory } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../controls/ErrorHandler";
import Notification from "../controls/Notification";
import FeedbackCard from "./FeedbackCard";
import EmptyState from "../controls/EmptyState";

const StudentFeedbackList = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [studentFeedbackList, setStudentFeedbackList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      BaseAPI.post(
        "/admins/get-supports",
        { role: "students" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          setStudentFeedbackList(res.data.data);
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
    <Spin spinning={loading}>
      <Row gutter={[16, 16]} justify="center">
        {studentFeedbackList.length > 0 ? (
          studentFeedbackList.map((el) => (
            <Col xs={{ span: 24 }} lg={{ span: 12 }} key={el.id}>
              <FeedbackCard feedback={el} />
            </Col>
          ))
        ) : (
          <EmptyState description="Hmmm 🤔. No feedback from tutors." />
        )}
      </Row>
    </Spin>
  );
};

export default StudentFeedbackList;
