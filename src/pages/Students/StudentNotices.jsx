import React, { useEffect, useState } from "react";
import { Alert, List, Row, Spin, Typography } from "antd";
import { useHistory } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";
import EmptyState from "../../components/controls/EmptyState";

const { Title } = Typography;

const TutorNotices = () => {
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.post(
        "/students/notices",
        {},
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      )
        .then((res) => {
          console.log(res.data.data);
          setNoticeList(res.data.data);
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
      setNoticeList([]);
    };
  }, []);

  return (
    <Spin spinning={loading}>
      <Row justify="center">
        <Title level={2}>All Notices</Title>
      </Row>

      {noticeList.length > 0 ? (
        <List
          itemLayout="vertical"
          dataSource={noticeList}
          pagination={{
            pageSize: 10,
          }}
          renderItem={(el) => (
            <List.Item>
              <Alert
                key={el.id}
                message={
                  <div>
                    <Row justify="space-between">
                      <Title level={4}>{el.header}</Title>
                      <span>{el.sent_date}</span>
                    </Row>
                  </div>
                }
                description={el.body}
                type={el.type}
                showIcon
              />
            </List.Item>
          )}
        />
      ) : (
        <Row justify="center">
          <EmptyState description="You have no notice to see." />
        </Row>
      )}
    </Spin>
  );
};

export default TutorNotices;
