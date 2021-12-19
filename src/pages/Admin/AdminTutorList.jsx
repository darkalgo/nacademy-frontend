import React, { useEffect, useState } from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import { useHistory } from "react-router-dom";

import ErrorHandler from "../../components/controls/ErrorHandler";
import TutorListTable from "../../components/Admin/TutorListTable";
import { BaseAPI } from "../../utils/Api";

const { Title } = Typography;
const { Search } = Input;

const AdminTutorList = () => {
  const history = useHistory();

  const [approvedTutorList, setApprovedTutorList] = useState([]);

  useEffect(() => {
    (async () => {
      await BaseAPI.post(
        "/tutors/list",
        { status: "accept" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          console.log(res.data.data);
          let response = res.data.data.map((el) => ({
            ...el,
            key: el.id,
          }));
          setApprovedTutorList(response);
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            ErrorHandler(err?.response?.data?.message, history);
          } else {
            Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
          }
        });
    })();
  }, []);

  return (
    <div>
      <div className="center">
        <Title level={2}>Tutor List</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="input search text" enterButton />
        </Col>
      </Row>

      <Card className="card">
        <TutorListTable approveList={approvedTutorList} />
      </Card>
    </div>
  );
};

export default AdminTutorList;
