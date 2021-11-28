import React from "react";
import { Col, Input, Row, Typography } from "antd";
import TutorListTable from "../../components/Admin/TutorListTable";

const { Title } = Typography;
const { Search } = Input;

const AdminTutorList = () => {
  return (
    <div>
      <div className="center">
        <Title level={2}>Tutor List</Title>
      </div>

      <Row justify="end" className="mb-2">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="input search text" enterButton />
        </Col>
      </Row>
      <TutorListTable />
    </div>
  );
};

export default AdminTutorList;
