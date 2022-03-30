import React, { useEffect, useState } from "react";
import { Card, Col, Descriptions, Row, Spin, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;

const StudentTutorDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    getTutorInformation(id);
  }, [id]);

  const [loading, setLoading] = useState(false);
  const [tutorInfo, setTutorInfo] = useState({});

  const getTutorInformation = (id) => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/tutors/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          setTutorInfo(res.data.data);
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

  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>Tutor Information</Title>
      </div>
      <Row>
        <Col xs={{ span: 24 }}>
          <Card className="card">
            <Descriptions bordered>
              <Descriptions.Item label="Full Name">{tutorInfo.name}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{tutorInfo.dob}</Descriptions.Item>
              <Descriptions.Item label="Gender">{tutorInfo.gender}</Descriptions.Item>
              <Descriptions.Item label="Address">{tutorInfo.address}</Descriptions.Item>
              <Descriptions.Item label="District">{tutorInfo.district}</Descriptions.Item>
              <Descriptions.Item label="Occupation">{tutorInfo.occupation}</Descriptions.Item>
              <Descriptions.Item label="Institute Name">{tutorInfo.institute_name}</Descriptions.Item>
              <Descriptions.Item label="Department Name">{tutorInfo.department_name}</Descriptions.Item>
              <Descriptions.Item label="Classes Will Teach">
                {tutorInfo.teachGroups?.map((el, i) => (
                  <span key={i}> {el.name}, &nbsp;</span>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Subjects Good At">
                {tutorInfo.goodSubjects?.map((el, i) => (
                  <span key={i}>{el.name}, &nbsp;</span>
                ))}
              </Descriptions.Item>
              <Descriptions.Item label="Favorite Subject">
                {tutorInfo.favoriteSubjects?.map((el, i) => (
                  <span key={i}> {el.name}, &nbsp; </span>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </Spin>
  );
};

export default StudentTutorDetails;
