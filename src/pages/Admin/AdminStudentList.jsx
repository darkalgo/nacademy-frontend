import React from "react";
import { Card, Col, Input, Row, Typography } from "antd";
import StudentListTable from "../../components/Admin/StudentListTable";

const { Title } = Typography;
const { Search } = Input;

const AdminStudentList = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Student List</Title>
      </div>

      <Row justify="end" className="mb-1">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="Search text" enterButton />
        </Col>
      </Row>
      <Card className="card">
        <StudentListTable />
      </Card>
    </div>
  );
};

export default AdminStudentList;
