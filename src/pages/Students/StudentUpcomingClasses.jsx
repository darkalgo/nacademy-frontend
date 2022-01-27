import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";

import UpcomingClassCard from "../../components/Student/UpcomingClassCard";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";
import { BaseAPI } from "../../utils/Api";
import EmptyState from "../../components/controls/EmptyState";

const { Title } = Typography;

const StudentUpcomingClasses = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get("/students/get-upcoming-classes", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          setClassList(res.data.data);
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
      setClassList([]);
    };
  }, [history]);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        <Title level={2}>List Of Upcoming Classes</Title>
      </Row>

      {classList.length > 0 ? (
        <Row gutter={[16, 16]}>
          {classList.map((el) => (
            <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} key={el.id}>
              <UpcomingClassCard info={el} />
            </Col>
          ))}
        </Row>
      ) : (
        <Row justify="center">
          <EmptyState description="You have no upcoming classes at this moment. How about booking a teacher? 😃" />
        </Row>
      )}
    </Spin>
  );
};

export default StudentUpcomingClasses;
