import React from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import ViewNoticesTable from "../../components/Admin/ViewNoticesTable";

const { Title } = Typography;
const { Search } = Input;

const AdminViewNotice = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>All Notices</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="input search text" enterButton />
        </Col>
      </Row>

      <Card className="card">
        <ViewNoticesTable />
      </Card>
    </div>
  );
};

export default AdminViewNotice;
