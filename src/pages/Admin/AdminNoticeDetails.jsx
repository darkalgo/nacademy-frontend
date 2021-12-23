import React, { useEffect, useState } from "react";
import { Alert, Card, Descriptions, Spin, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";

import { BaseAPI } from "../../utils/Api";
import AppCard from "../../components/common/AppCard";
import NoticeReceivedListTable from "../../components/Admin/NoticeReceivedListTable";
import Notification from "../../components/controls/Notification";
import ErrorHandler from "../../components/controls/ErrorHandler";

const { Title } = Typography;

const AdminNoticeDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  // states
  const [loading, setLoading] = useState(false);
  const [noticeDetails, setNoticeDetails] = useState({});

  useEffect(() => {
    (async () => {
      setLoading(true);
      await BaseAPI.get(`/admins/notices/${id}`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          console.log(res.data.data);
          setNoticeDetails(res.data.data);
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
      setNoticeDetails({});
    };
  }, [id, history]);
  return (
    <Spin spinning={loading}>
      <div className="center">
        <Title level={2}>Notice Details</Title>
      </div>

      <Card className="card mb-2">
        <Descriptions bordered>
          <Descriptions.Item label="Type">
            <Title level={5} style={{ color: `${noticeDetails.type === "success" ? "green" : noticeDetails.type === "warning" ? "amber" : "indigo"}` }}>
              {noticeDetails.type}
            </Title>
          </Descriptions.Item>
          <Descriptions.Item label="From">
            <Title level={5}>Admin</Title>
          </Descriptions.Item>
          <Descriptions.Item label="Sent Date">
            <Title level={5}>{noticeDetails.sent_date}</Title>
          </Descriptions.Item>
          <Descriptions.Item label="Sent Time">
            <Title level={5}>{noticeDetails.sent_time}</Title>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Alert message={noticeDetails.header} description={noticeDetails.body} type={noticeDetails.type} showIcon className="mb-2" />

      <AppCard heading="Notified User List">
        <NoticeReceivedListTable notifiedUser={noticeDetails.notifiedUsers} />
      </AppCard>
    </Spin>
  );
};

export default AdminNoticeDetails;
