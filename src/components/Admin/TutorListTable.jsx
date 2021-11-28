import React from "react";
import { Table } from "antd";

const TutorListTable = () => {
  const columns = [
    {
      title: "Tutor Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Email",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Institution Name",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Teaching Class",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Group",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Average Rating",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Total Class Conducted",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Number of Times Paid",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Last Paid Date",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Account Creation Date",
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
  return <Table columns={columns} dataSource={data} scroll={{ x: 1500 }} />;
};

export default TutorListTable;
