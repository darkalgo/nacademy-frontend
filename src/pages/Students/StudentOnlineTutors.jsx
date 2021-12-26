import React, { useEffect, useState } from "react";
import { Col, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";

import AppCard from "../../components/common/AppCard";
import OnlineTutorsTable from "../../components/Student/OnlineTutorsTable";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";
import { BaseAPI } from "../../utils/Api";

const { Title } = Typography;

const StudentOnlineTutors = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [onlineTutorList, setOnlineTutorList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get("/tutors/online/list", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          setOnlineTutorList(res.data.data);
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
      <Row justify="center">
        <Title level={2}>Currently Online</Title>
      </Row>
      <Row justify="center" className="mb-2">
        <span style={{ fontSize: "5em", color: "#00c853", fontWeight: "bold" }}>{onlineTutorList.length || 0}</span>
      </Row>
      <Row>
        <Col xs={{ span: 24 }}>
          <AppCard heading="Online Teacher Information">
            <OnlineTutorsTable tutorInfo={onlineTutorList} />
          </AppCard>
        </Col>
      </Row>
    </Spin>
  );
};

export default StudentOnlineTutors;
