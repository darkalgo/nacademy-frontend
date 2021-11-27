import React from "react";
import { Input, Table, Row, Typography, Col } from "antd";

const { Title } = Typography;
const { Search } = Input;

const TutorCompletedClasses = () => {
  const columns = [
    {
      title: "Class Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Start Time",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "End Time",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Package Type",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Student Name",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Rating",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const onSearch = (value) => console.log(value);
  return (
    <>
      <Row justify="center">
        <Title level={2}>Completed Classes</Title>
      </Row>
      <Row justify="end" className="mb-2">
        <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <Search placeholder="Search text" allowClear enterButton onSearch={onSearch} />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} />;
    </>
  );
};

export default TutorCompletedClasses;
