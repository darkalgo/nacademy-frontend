import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;

const AdminStudentPackage = () => {
  const history = useHistory();
  const { id } = useParams();

  // states
  const [loading, setLoading] = useState(false);
  const [studentDetails, setStudentDetails] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/students/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          setStudentDetails(res.data.data);
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
  }, [history, id]);

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>Student Details</Title>
      </div>
      <Card className="card">
        <Descriptions bordered>
          <Descriptions.Item label="Name">{studentDetails.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{studentDetails.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{studentDetails.phone}</Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">{studentDetails.dob}</Descriptions.Item>
          <Descriptions.Item label="Institute Name">{studentDetails.institute_name}</Descriptions.Item>
          <Descriptions.Item label="Class Name">{studentDetails.class_name}</Descriptions.Item>
          <Descriptions.Item label="Group Name">{studentDetails.group_name}</Descriptions.Item>
          <Descriptions.Item label="Account Creation Date">{studentDetails.createdAt}</Descriptions.Item>
        </Descriptions>
      </Card>
    </Spin>
  );
};

export default AdminStudentPackage;
