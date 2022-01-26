import React, { useEffect, useState } from "react";
import { Card, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { nanoid } from "nanoid";

import AllAvailableTutorTable from "../../components/Student/AllAvailableTutorTable";
import { BaseAPI } from "../../utils/Api";
import ErrorHandler from "../../components/controls/ErrorHandler";
import Notification from "../../components/controls/Notification";

const { Title } = Typography;

const StudentAllTutors = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      BaseAPI.post(
        "/tutors/list",
        { status: "accept" },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          const info = res.data.data.map((el) => ({
            ...el,
            key: nanoid(3),
          }));
          setTeacherList(info);
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
      setTeacherList([]);
    };
  }, [history]);

  return (
    <div>
      <div className="center">
        <Title level={2}>All Teachers Information</Title>
      </div>

      <Spin spinning={loading}>
        <Card className="card">
          <AllAvailableTutorTable info={teacherList} />
        </Card>
      </Spin>
    </div>
  );
};

export default StudentAllTutors;
