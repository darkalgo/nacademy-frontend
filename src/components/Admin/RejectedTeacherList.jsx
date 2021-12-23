import { useEffect, useState } from "react";
import { Col, Row, Spin } from "antd";
import { useHistory } from "react-router-dom";

import EmptyState from "../controls/EmptyState";
import ApproveTutorCard from "./ApproveTutorCard";
import ErrorHandler from "../controls/ErrorHandler";
import Notification from "../controls/Notification";
import { BaseAPI } from "../../utils/Api";

const RejectedTeacherList = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [rejectedList, setRejectedList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      BaseAPI.post(
        "/tutors/list",
        { status: "reject" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          setRejectedList(res.data.data);
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
      <Row gutter={[16, 16]}>
        {rejectedList.length > 0 ? (
          rejectedList.map((el) => (
            <Col xs={{ span: 24 }} md={{ span: 12 }} key={el.id}>
              <ApproveTutorCard info={el} />
            </Col>
          ))
        ) : (
          <EmptyState description="You haven't rejected any teacher yet 😊" />
        )}
      </Row>
    </Spin>
  );
};

export default RejectedTeacherList;
