import React from "react";
import { Alert, Card, Descriptions, Typography } from "antd";

import AppCard from "../../components/assets/AppCard";
import NoticeReceivedListTable from "../../components/Admin/NoticeReceivedListTable";

const { Title } = Typography;

const AdminNoticeDetails = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Notice Details</Title>
      </div>

      <Card className="card mb-2">
        <Descriptions bordered>
          <Descriptions.Item label="Type">
            <Title level={5} style={{ color: "green" }}>
              Success
            </Title>
          </Descriptions.Item>
          <Descriptions.Item label="From">
            <Title level={5}>Admin</Title>
          </Descriptions.Item>
          <Descriptions.Item label="Sent Date">
            <Title level={5}>12 November, 2021</Title>
          </Descriptions.Item>
          <Descriptions.Item label="Sent Time">
            <Title level={5}>10:00pm</Title>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Alert message="Informational Notes" description="Detailed description and advice about successful copywriting." type="success" showIcon className="mb-2" />

      <AppCard heading="Notified User List">
        <NoticeReceivedListTable />
      </AppCard>
    </div>
  );
};

export default AdminNoticeDetails;
