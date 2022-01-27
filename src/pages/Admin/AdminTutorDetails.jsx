import { useEffect, useState } from "react";
import { Button, Card, Col, Descriptions, Row, Spin, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;

const AdminTutorDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [tutorInfo, setTutorInfo] = useState({});

  useEffect(() => {
    getTutorInformation(id);
  }, [id]);

  // functions
  const getTutorInformation = (id) => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/tutors/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
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

  const approveAccount = async (status, id) => {
    setLoading(true);
    await BaseAPI.patch(
      `/tutors/account-approved/${id}`,
      { status },
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then(() => {
        Notification("Modified!", "Account modified successfully", "success");
        getTutorInformation(id);
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          ErrorHandler(err?.response?.data?.message, history);
        } else {
          Notification("Something went wrong", "Please check your internet connection and try again or communicate with the admin", "error");
        }
      })
      .finally(() => setLoading(false));
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
              <Descriptions.Item label="Email">{tutorInfo.email}</Descriptions.Item>
              <Descriptions.Item label="Phone Number">{tutorInfo.phone}</Descriptions.Item>
              <Descriptions.Item label="Date of Birth">{tutorInfo.dob}</Descriptions.Item>
              <Descriptions.Item label="Gender">{tutorInfo.gender}</Descriptions.Item>
              <Descriptions.Item label="Address">{tutorInfo.address}</Descriptions.Item>
              <Descriptions.Item label="District">{tutorInfo.district}</Descriptions.Item>
              <Descriptions.Item label="Occupation">{tutorInfo.occupation}</Descriptions.Item>
              <Descriptions.Item label="Institute Name">{tutorInfo.institute_name}</Descriptions.Item>
              <Descriptions.Item label="Department Name">{tutorInfo.department_name}</Descriptions.Item>
              <Descriptions.Item label="Classes Will Teach">{tutorInfo.teaching_class}</Descriptions.Item>
              <Descriptions.Item label="Subjects Good At">{tutorInfo.good_at_subjects}</Descriptions.Item>
              <Descriptions.Item label="Favorite Subject">{tutorInfo.favorite_subject}</Descriptions.Item>
              <Descriptions.Item label="Joining Reason">{tutorInfo.why_want_join}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      {tutorInfo.status !== "accept" && (
        <div className="center mt-2">
          <Button type="primary" style={{ marginRight: "1em" }} onClick={() => approveAccount("accept", tutorInfo.id)}>
            Accept Request
          </Button>
          {tutorInfo.status !== "reject" && (
            <Button danger onClick={() => approveAccount("reject", tutorInfo.id)}>
              Reject Request
            </Button>
          )}
        </div>
      )}
    </Spin>
  );
};

export default AdminTutorDetails;
